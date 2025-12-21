// src/screens/EarningsScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApi } from '../hooks/useApi';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { StainedGlassCard } from '../components/StainedGlassCard';
import { SSLogisticsLogo } from '../components/SSLogisticsLogo';
import {
    StainedGlassTheme,
    Typography,
    Spacing,
    BorderRadius,
} from '../styles/globalStyles';

// Mock earnings data structure - will be replaced with real API
interface EarningItem {
    job_number: number;
    date: string;
    amount: number;
    status: 'paid' | 'pending';
    description: string;
}

interface EarningsData {
    total_earnings: number;
    completed_jobs: number;
    pending_payment: number;
    this_week_earnings: number;
    this_month_earnings: number;
    recent_jobs: EarningItem[];
}

export default function EarningsScreen() {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

    // TODO: Replace with real API endpoint when available
    const { data: earnings, isLoading, error, mutate } = useApi<EarningsData>('/driver/earnings/');

    // Mock data for development
    const mockEarnings: EarningsData = {
        total_earnings: 4850.50,
        completed_jobs: 42,
        pending_payment: 320.00,
        this_week_earnings: 850.50,
        this_month_earnings: 2100.00,
        recent_jobs: [
            {
                job_number: 1234,
                date: '2024-12-21',
                amount: 125.00,
                status: 'paid',
                description: 'Residential Moving'
            },
            {
                job_number: 1235,
                date: '2024-12-20',
                amount: 95.50,
                status: 'pending',
                description: 'Pallet Delivery'
            },
            {
                job_number: 1236,
                date: '2024-12-19',
                amount: 180.00,
                status: 'paid',
                description: 'Office Relocation'
            },
        ],
    };

    const displayData = earnings || mockEarnings;

    const formatCurrency = (amount: number) => {
        return `$${amount.toFixed(2)}`;
    };

    return (
        <ScreenWrapper style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={mutate}
                        colors={[StainedGlassTheme.colors.gold]}
                        tintColor={StainedGlassTheme.colors.gold}
                    />
                }
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <SSLogisticsLogo size="small" variant="badge" />
                        <View style={styles.headerText}>
                            <Text style={styles.title}>Earnings</Text>
                            <Text style={styles.subtitle}>Track your income</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsGrid}>
                    {/* Total Earnings */}
                    <StainedGlassCard style={styles.statCard}>
                        <View style={styles.statIconContainer}>
                            <Ionicons name="cash-outline" size={24} color={StainedGlassTheme.colors.gold} />
                        </View>
                        <Text style={styles.statLabel}>Total Earnings</Text>
                        <Text style={styles.statValue}>{formatCurrency(displayData.total_earnings)}</Text>
                    </StainedGlassCard>

                    {/* Pending Payment */}
                    <StainedGlassCard style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: 'rgba(96, 165, 250, 0.15)' }]}>
                            <Ionicons name="time-outline" size={24} color="#60A5FA" />
                        </View>
                        <Text style={styles.statLabel}>Pending</Text>
                        <Text style={[styles.statValue, { color: '#60A5FA' }]}>
                            {formatCurrency(displayData.pending_payment)}
                        </Text>
                    </StainedGlassCard>

                    {/* Completed Jobs */}
                    <StainedGlassCard style={styles.statCard}>
                        <View style={[styles.statIconContainer, { backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
                            <Ionicons name="checkmark-circle-outline" size={24} color="#34D399" />
                        </View>
                        <Text style={styles.statLabel}>Completed</Text>
                        <Text style={[styles.statValue, { color: '#34D399' }]}>{displayData.completed_jobs}</Text>
                    </StainedGlassCard>
                </View>

                {/* Period Selector */}
                <View style={styles.periodSelector}>
                    <TouchableOpacity
                        style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
                        onPress={() => setSelectedPeriod('week')}
                    >
                        <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>
                            This Week
                        </Text>
                        <Text style={[styles.periodAmount, selectedPeriod === 'week' && styles.periodAmountActive]}>
                            {formatCurrency(displayData.this_week_earnings)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
                        onPress={() => setSelectedPeriod('month')}
                    >
                        <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>
                            This Month
                        </Text>
                        <Text style={[styles.periodAmount, selectedPeriod === 'month' && styles.periodAmountActive]}>
                            {formatCurrency(displayData.this_month_earnings)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.periodButton, selectedPeriod === 'all' && styles.periodButtonActive]}
                        onPress={() => setSelectedPeriod('all')}
                    >
                        <Text style={[styles.periodText, selectedPeriod === 'all' && styles.periodTextActive]}>
                            All Time
                        </Text>
                        <Text style={[styles.periodAmount, selectedPeriod === 'all' && styles.periodAmountActive]}>
                            {formatCurrency(displayData.total_earnings)}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Jobs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>RECENT PAYMENTS</Text>
                    {displayData.recent_jobs.map((job, index) => (
                        <StainedGlassCard key={index} style={styles.jobCard}>
                            <View style={styles.jobHeader}>
                                <View style={styles.jobInfo}>
                                    <Text style={styles.jobNumber}>Job #{job.job_number}</Text>
                                    <Text style={styles.jobDescription}>{job.description}</Text>
                                </View>
                                <View style={styles.amountContainer}>
                                    <Text style={styles.amount}>{formatCurrency(job.amount)}</Text>
                                    <View style={[
                                        styles.statusBadge,
                                        job.status === 'paid' ? styles.statusPaid : styles.statusPending
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            job.status === 'paid' ? styles.statusPaidText : styles.statusPendingText
                                        ]}>
                                            {job.status.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.jobDate}>
                                {new Date(job.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </Text>
                        </StainedGlassCard>
                    ))}
                </View>

                {/* Note about API */}
                {!earnings && (
                    <View style={styles.noteContainer}>
                        <Ionicons name="information-circle-outline" size={16} color={StainedGlassTheme.colors.goldLight} />
                        <Text style={styles.noteText}>
                            Earnings data will be available once the billing API is integrated
                        </Text>
                    </View>
                )}
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.md,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: Spacing.md,
    },
    title: {
        ...Typography.h2,
        color: StainedGlassTheme.colors.parchment,
    },
    subtitle: {
        ...Typography.body,
        color: StainedGlassTheme.colors.parchmentLight,
    },
    statsGrid: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
    },
    statCard: {
        flex: 1,
        padding: Spacing.md,
        alignItems: 'center',
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 223, 186, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    statLabel: {
        fontSize: 11,
        color: StainedGlassTheme.colors.parchmentLight,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    statValue: {
        ...Typography.h3,
        color: StainedGlassTheme.colors.gold,
    },
    periodSelector: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        gap: Spacing.sm,
    },
    periodButton: {
        flex: 1,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.sm,
        borderRadius: BorderRadius.md,
        backgroundColor: 'rgba(255, 223, 186, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 223, 186, 0.1)',
        alignItems: 'center',
    },
    periodButtonActive: {
        backgroundColor: 'rgba(255, 223, 186, 0.15)',
        borderColor: StainedGlassTheme.colors.gold,
    },
    periodText: {
        fontSize: 11,
        fontWeight: '600',
        color: StainedGlassTheme.colors.parchmentLight,
        marginBottom: 4,
    },
    periodTextActive: {
        color: StainedGlassTheme.colors.gold,
    },
    periodAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: StainedGlassTheme.colors.parchment,
    },
    periodAmountActive: {
        color: StainedGlassTheme.colors.gold,
    },
    section: {
        paddingHorizontal: Spacing.lg,
    },
    sectionTitle: {
        color: StainedGlassTheme.colors.gold,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 0.5,
        marginBottom: Spacing.md,
    },
    jobCard: {
        padding: Spacing.md,
        marginBottom: Spacing.sm,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xs,
    },
    jobInfo: {
        flex: 1,
    },
    jobNumber: {
        ...Typography.bodySemibold,
        color: StainedGlassTheme.colors.parchment,
        marginBottom: 2,
    },
    jobDescription: {
        ...Typography.caption,
        color: StainedGlassTheme.colors.parchmentLight,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        ...Typography.h4,
        color: StainedGlassTheme.colors.gold,
        marginBottom: 4,
    },
    statusBadge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 2,
        borderRadius: BorderRadius.sm,
    },
    statusPaid: {
        backgroundColor: 'rgba(52, 211, 153, 0.15)',
    },
    statusPending: {
        backgroundColor: 'rgba(251, 191, 36, 0.15)',
    },
    statusText: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    statusPaidText: {
        color: '#34D399',
    },
    statusPendingText: {
        color: '#FBBF24',
    },
    jobDate: {
        ...Typography.caption,
        color: StainedGlassTheme.colors.parchmentLight,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        marginTop: Spacing.md,
        gap: Spacing.xs,
    },
    noteText: {
        ...Typography.caption,
        color: StainedGlassTheme.colors.parchmentLight,
        flex: 1,
    },
});
