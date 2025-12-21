// src/context/NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Notification } from '../types';
import apiClient from '../lib/api';

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    expoPushToken: string | null;
    markAsRead: (id: string) => void;
    clearAll: () => void;
    refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        registerForPushNotificationsAsync();

        // Listen for notifications while app is foregrounded
        const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
            const data = notification.request.content.data;
            addNotification({
                id: notification.request.identifier,
                title: notification.request.content.title || 'Notification',
                message: notification.request.content.body || '',
                type: (data.type as any) || 'system',
                read: false,
                created_at: new Date().toISOString(),
                job_id: data.job_id,
            });
        });

        // Listen for notification responses (when user taps notification)
        const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
            const data = response.notification.request.content.data;
            // Handle navigation based on notification type
            if (data.job_id) {
                // TODO: Navigate to job detail
                console.log('Navigate to job:', data.job_id);
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const registerForPushNotificationsAsync = async () => {
        if (!Device.isDevice) {
            console.log('Push notifications only work on physical devices');
            return null;
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('Failed to get push token for push notification!');
            return null;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);

        // TODO: Send token to backend
        // await apiClient.post('/users/me/push-token', { token });

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FFD700',
            });
        }

        return token;
    };

    const addNotification = (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const refreshNotifications = async () => {
        // TODO: Fetch notifications from backend
        // const response = await apiClient.get('/notifications/');
        // setNotifications(response.data);
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unread Count,
                expoPushToken,
                markAsRead,
                clearAll,
                refreshNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
