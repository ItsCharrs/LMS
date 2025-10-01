import logging
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

# Firebase Admin SDK
from firebase_admin import auth

# Simple JWT
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer, FirebaseTokenSerializer
# NOTE: The custom permission 'IsAdminOrManagerUser' must be imported here 
# (e.g., from .permissions import IsAdminOrManagerUser). 
# It is required for CreateUserView's security.

# Get an instance of a logger
logger = logging.getLogger(__name__)


# Placeholder for custom permission for context visibility.
# You must define this properly in your application permissions.py
class IsAdminOrManagerUser(IsAuthenticated): 
    """Custom permission to only allow Admins or Managers access."""
    def has_permission(self, request, view):
        return super().has_permission(request, view) and (
            request.user.role == User.Role.ADMIN or 
            request.user.role == User.Role.MANAGER
        )


class UserListView(generics.ListAPIView):
    """
    API view to retrieve a list of users.
    NOTE: In a real app, you'd likely want this to be protected
    by a stricter permission like IsAdminOrManagerUser.
    """
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class FirebaseLoginView(generics.GenericAPIView):
    """
    Handles user login/registration via a Firebase ID token.
    Receives a Firebase token, verifies it, gets or creates a local user,
    and returns a local JWT (access and refresh tokens).
    """
    permission_classes = [AllowAny]
    serializer_class = FirebaseTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        id_token = serializer.validated_data["token"]

        try:
            logger.info("Attempting to verify Firebase ID token.")
            decoded_token = auth.verify_id_token(id_token)
            firebase_uid = decoded_token["uid"]
            email = decoded_token.get("email")
            
            # --- NEW: Get the name from the token ---
            name = decoded_token.get("name", "")
            # Safely split the name into first and last parts. Handles cases with no last name.
            first_name, last_name = (name.split(" ", 1) + [""])[:2]
            
            logger.info(f"Token verified successfully for UID: {firebase_uid}, Email: {email}, Name: {name}")

            logger.info(f"Attempting to get or create user with username={firebase_uid}.")
            # First, get or create the user based only on the unique username (Firebase UID)
            user, created = User.objects.get_or_create(username=firebase_uid)
            
            if created:
                # --- NEW: If created, populate their profile details ---
                user.email = email
                user.first_name = first_name
                user.last_name = last_name
                # Set an unusable password since they authenticate via Firebase
                user.set_unusable_password()
                user.save()
                logger.info(f"New user CREATED with username: {firebase_uid}, Name: {name}")
            else:
                # OPTIMIZATION: Update name/email fields if they've changed in Firebase profile
                needs_save = False
                if user.email != email:
                    user.email = email
                    needs_save = True
                if user.first_name != first_name:
                    user.first_name = first_name
                    needs_save = True
                if user.last_name != last_name:
                    user.last_name = last_name
                    needs_save = True
                
                if needs_save:
                    user.save()
                    logger.info(f"Existing user UPDATED with new profile details.")
                else:
                    logger.info(f"Existing user FOUND with username: {firebase_uid}")


            logger.info(f"Generating local JWT for user {user.id}.")
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": UserSerializer(user).data,
                },
                status=status.HTTP_200_OK,
            )

        except auth.InvalidIdTokenError as e:
            logger.warning(f"Invalid Firebase token received during login attempt: {e}")
            return Response(
                {"error": "Invalid Firebase token"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            logger.error(f"An unexpected error occurred in FirebaseLoginView: {e}", exc_info=True)
            return Response(
                {"error": "An internal server error occurred. Please check server logs."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CreateUserView(generics.CreateAPIView):
    """
    Allows Admins or Managers to create new users (employees) using email/password.
    The new user is created in both Firebase and the local Django database, 
    linked by the Firebase UID which serves as the local username.
    """
    permission_classes = [IsAdminOrManagerUser]
    serializer_class = UserSerializer # Used for the successful response data

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        # role defaults to CUSTOMER if not provided
        role = request.data.get('role', User.Role.CUSTOMER) 

        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate that the requested role is a valid choice
        if role not in [r[0] for r in User.Role.choices]:
            valid_roles = ", ".join([r[0] for r in User.Role.choices])
            return Response(
                {"error": f"Invalid role specified. Must be one of: {valid_roles}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Step 1: Create the user in Firebase Authentication
            firebase_user = auth.create_user(
                email=email,
                password=password,
                display_name=f"{first_name} {last_name}".strip()
            )
            logger.info(f"Successfully created user in Firebase with UID: {firebase_user.uid}")

            # Step 2: Create the corresponding user in the local Django database
            local_user = User.objects.create_user(
                username=firebase_user.uid, # Use Firebase UID as the unique local identifier
                email=email,
                password=password, # create_user hashes the password
                first_name=first_name,
                last_name=last_name,
                role=role
            )
            
            logger.info(f"Successfully created local user with username: {local_user.username}")

            serializer = self.get_serializer(local_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except auth.EmailAlreadyExistsError:
            logger.warning(f"Attempted to create a user with an existing email: {email}")
            return Response(
                {"error": "A user with this email already exists in Firebase."},
                status=status.HTTP_409_CONFLICT
            )
        except Exception as e:
            logger.error(f"An unexpected error occurred in CreateUserView: {e}", exc_info=True)
            return Response(
                {"error": "An internal server error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CurrentUserView(generics.RetrieveAPIView):
    """
    API view to retrieve the currently authenticated user's data
    using our local JWT.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        # The JWTAuthentication class automatically attaches the user to the request
        return self.request.user
