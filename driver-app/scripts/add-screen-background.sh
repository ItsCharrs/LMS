#!/bin/bash
# Script to add ScreenBackground wrapper to all driver app screens

SCREENS_DIR="/home/itscharrs/Desktop/LogiPro/driver-app/src/screens"

# Array of screen files to update (excluding LoginScreen which already has it)
SCREEN_FILES=(
  "ProfileScreen.tsx"
  "JobsScreen.tsx"
  "JobsListScreen.tsx"
  "JobDetailScreen.tsx"
  "HistoryScreen.tsx"
)

echo "Adding ScreenBackground to driver app screens..."

for screen in "${SCREEN_FILES[@]}"; do
  FILE="$SCREENS_DIR/$screen"
  
  if [ ! -f "$FILE" ]; then
    echo "⚠️  Skipping $screen - file not found"
    continue
  fi
  
  echo "Processing $screen..."
  
  # Check if already has ScreenBackground import
  if grep -q "import.*ScreenBackground" "$FILE"; then
    echo "✓ $screen already has ScreenBackground import"
    continue
  fi
  
  # Add import after other component imports
  # Find the last import line and add after it
  sed -i "/^import.*from.*'\.\.\/.*';$/a import { ScreenBackground } from '../components/ScreenBackground';" "$FILE"
  
  # Find the main return statement and wrap with ScreenBackground
  # This uses a more conservative approach - just wrapping the top-level element
  
  # Find line with "return (" and the next non-empty line (the opening tag)
  # Then add <ScreenBackground> before it
  
  # Add opening tag after "return ("
  sed -i '/^[[:space:]]*return[[:space:]]*($/ {
    n
    s/^/SCREEN_BG_OPEN\n/
  }' "$FILE"
  
  # Replace marker with actual tag
  sed -i 's/SCREEN_BG_OPEN/        <ScreenBackground>/' "$FILE"
  
  # Find the closing of the return statement and add closing tag before );
  # This is trickier - we need to find the last closing tag before );
  # For now, let's add a marker
  sed -i '/^[[:space:]]*);[[:space:]]*$/i SCREEN_BG_CLOSE' "$FILE"
  sed -i 's/SCREEN_BG_CLOSE/        <\/ScreenBackground>/' "$FILE"
  
  echo "✓ Updated $screen"
done

echo ""
echo "✅ Done! Please review the changes and test the app."
echo ""
echo "To review changes:"
echo "  cd /home/itscharrs/Desktop/LogiPro/driver-app"
echo "  git diff src/screens/"
