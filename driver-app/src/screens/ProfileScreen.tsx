
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Profile</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {user?.first_name?.charAt(0) || 'D'}
                            {user?.last_name?.charAt(0) || ''}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{user?.first_name} {user?.last_name}</Text>
                    <Text style={styles.userRole}>Official Driver</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>4.9</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>124</Text>
                        <Text style={styles.statLabel}>Trips</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>98%</Text>
                        <Text style={styles.statLabel}>On Time</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="car-sport-outline" size={24} color="#64748B" />
                        <Text style={styles.menuText}>Vehicle Information</Text>
                        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="settings-outline" size={24} color="#64748B" />
                        <Text style={styles.menuText}>Settings</Text>
                        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="help-circle-outline" size={24} color="#64748B" />
                        <Text style={styles.menuText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    content: {
        padding: 20,
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 4,
    },
    userRole: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 4,
        fontWeight: '500',
    },
    userEmail: {
        fontSize: 14,
        color: '#94A3B8',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E2E8F0',
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 8,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#334155',
        marginLeft: 12,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#FEF2F2',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EF4444',
        marginLeft: 8,
    },
});
