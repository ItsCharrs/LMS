// src/screens/StatsScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApi } from '../hooks/useApi';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { StainedGlassCard } from '../components/StainedGlassCard';
import { SSLogisticsLogo } from '../components/SSLogisticsLogo';
import { DriverStats } from '../types';
import {
    StainedGlassTheme,
    Typography,
    Spacing,
    BorderRadius,
} from '../styles/globalStyles';

const { width } = Dimensions.get('window');

export default function StatsScreen() {
    // TODO: Replace with real API endpoint when available
    const { data: stats } = useApi<DriverStats>('/driver/stats/');

    // Mock data for development
    const mockStats: DriverStats = {
        total_deliveries: 156,
        on_time_percentage: 94.5,
        average_rating: 4.8,
        total_earnings: 12850.50,
        this_week: {
            deliveries: 12,
            earnings: 1050.00,
        },
        this_month: {
            deliveries: 42,
            earnings: 3200.00,
        },
    };

    const displayStats = stats || mockStats;

    return (
        <ScreenWrapper style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <SSLogisticsLogo size="small" variant="badge" />
                        <View style={styles.headerText}>
                            <Text style={styles.title}>Performance</Text>
                            <Text style={styles.subtitle}>Your statistics</Text>
                        </View>
                    </View>
                </View>

                {/* Key Metrics */}
                <View style={styles.metricsGrid}>
                    {/* Total Deliveries */}
                    <StainedGlassCard style={styles.metricCard}>
                        <View style={styles.metricIcon}>
                            <Ionicons name="cube" size={28} color={StainedGlassTheme.colors.gold} />
                        </View>
                        <Text style={styles.metricValue}>{displayStats.total_deliveries}</Text>
                        <Text style={styles.metricLabel}>Total Deliveries</Text>
                    </StainedGlassCard>

                    {/* On-Time Percentage */}
                    <StainedGlassCard style={styles.metricCard}>
                        <View style={[styles.metricIcon, { backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
                            <Ionicons name="checkmark-circle" size={28} color="#34D399" />
                        </View>
                        <Text style={[styles.metricValue, { color: '#34D399' }]}>
                            {displayStats.on_time_percentage}%
                        </Text>
                        <Text style={styles.metricLabel}>On-Time Rate</Text>
                    </StainedGlassCard>
                </View>

                {/* Rating Card */}
                <StainedGlassCard style={styles.ratingCard}>
                    <View style={styles.ratingHeader}>
                        <Text style={styles.ratingLabel}>Your Rating</Text>
                        <View style={styles.ratingStars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Ionicons
                                    key={star}
                                    name={star <= Math.round(displayStats.average_rating) ? 'star' : 'star-outline'}
                                    size={24}
                                    color={StainedGlassTheme.colors.gold}
                                />
                            ))}
                        </View>
                    </View>
                    <Text style={styles.ratingValue}>{displayStats.average_rating.toFixed(1)}</Text>
                    <Text style={styles.ratingSubtext}>Based on customer feedback</Text>
                </StainedGlassCard>

                {/* Period Stats */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ACTIVITY BREAKDOWN</Text>

                    <StainedGlassCard style={styles.periodCard}>
                        <View style={styles.periodHeader}>
                            <Ionicons name="calendar-outline" size={20} color={StainedGlassTheme.colors.goldLight} />
                            <Text style={styles.periodTitle}>This Week</Text>
                        </View>
                        <View style={styles.periodStats}>
                            <View style={styles.periodStat}>
                                <Text style={styles.periodStatValue}>{displayStats.this_week.deliveries}</Text>
                                <Text style={styles.periodStatLabel}>Deliveries</Text>
                            </View>
                            <View style={styles.periodDivider} />
                            <View style={styles.periodStat}>
                                <Text style={[styles.periodStatValue, { color: StainedGlassTheme.colors.gold }]}>
                                    ${displayStats.this_week.earnings.toFixed(0)}
                                </Text>
                                <Text style={styles.periodStatLabel}>Earnings</Text>
                            </View>
                        </View>
                    </StainedGlassCard>

                    <StainedGlassCard style={styles.periodCard}>
                        <View style={styles.periodHeader}>
                            <Ionicons name="calendar" size={20} color={StainedGlassTheme.colors.goldLight} />
                            <Text style={styles.periodTitle}>This Month</Text>
                        </View>
                        <View style={styles.periodStats}>
                            <View style={styles.periodStat}>
                                <Text style={styles.periodStatValue}>{displayStats.this_month.deliveries}</Text>
                                <Text style={styles.periodStatLabel}>Deliveries</Text>
                            </View>
                            <View style={styles.periodDivider} />
                            <View style={styles.periodStat}>
                                <Text style={[styles.periodStatValue, { color: StainedGlassTheme.colors.gold }]}>
                                    ${displayStats.this_month.earnings.toFixed(0)}
                                </Text>
                                <Text style={styles.periodStatLabel}>Earnings</Text>
                            </View>
                        </View>
                    </StainedGlassCard>
                </View>

                {/* Note */}
                {!stats && (
                    <View style={styles.noteContainer}>
                        <Ionicons name="information-circle-outline" size={16} color={StainedGlassTheme.colors.goldLight} />
                        <Text style={styles.noteText}>
                            Statistics will be available once the reports API is integrated
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
    metricsGrid: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.lg,
        gap: Spacing.md,
    },
    metricCard: {
        flex: 1,
        padding: Spacing.lg,
        alignItems: 'center',
    },
    metricIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 223, 186, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    metricValue: {
        ...Typography.h1,
        color: StainedGlassTheme.colors.gold,
        marginBottom: Spacing.xs,
    },
    metricLabel: {
        fontSize: 12,
        color: StainedGlassTheme.colors.parchmentLight,
        fontWeight: '600',
        textAlign: 'center',
    },
    ratingCard: {
        marginHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
        padding: Spacing.lg,
        alignItems: 'center',
    },
    ratingHeader: {
        width: '100%',
        marginBottom: Spacing.md,
    },
    ratingLabel: {
        fontSize: 12,
        color: StainedGlassTheme.colors.parchmentLight,
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    ratingStars: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    },
    ratingValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: StainedGlassTheme.colors.gold,
        marginBottom: Spacing.xs,
    },
    ratingSubtext: {
        fontSize: 12,
        color: StainedGlassTheme.colors.parchmentLight,
    },
    section: {
        paddingHorizontal: Spacing.lg,
        marginTop: Spacing.lg,
    },
    sectionTitle: {
        color: StainedGlassTheme.colors.gold,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 0.5,
        marginBottom: Spacing.md,
    },
    periodCard: {
        padding: Spacing.lg,
        marginBottom: Spacing.md,
    },
    periodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        gap: Spacing.sm,
    },
    periodTitle: {
        ...Typography.h4,
        color: StainedGlassTheme.colors.parchment,
    },
    periodStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    periodStat: {
        flex: 1,
        alignItems: 'center',
    },
    periodStatValue: {
        ...Typography.h2,
        color: StainedGlassTheme.colors.parchment,
        marginBottom: 4,
    },
    periodStatLabel: {
        fontSize: 12,
        color: StainedGlassTheme.colors.parchmentLight,
        fontWeight: '600',
    },
    periodDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 223, 186, 0.2)',
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
