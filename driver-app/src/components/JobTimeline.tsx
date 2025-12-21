// src/components/JobTimeline.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { JobTimelineEntry } from '../types';
import { StainedGlassTheme, Typography, Spacing } from '../styles/globalStyles';

interface JobTimelineProps {
    timeline: JobTimelineEntry[];
}

export const JobTimeline: React.FC<JobTimelineProps> = ({ timeline }) => {
    if (!timeline || timeline.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No timeline data available</Text>
            </View>
        );
    }

    // Sort timeline by timestamp (newest first)
    const sortedTimeline = [...timeline].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const getStatusIcon = (status: string): string => {
        switch (status) {
            case 'ORDER_PLACED':
            case 'PENDING':
                return 'time-outline';
            case 'ASSIGNED':
                return 'person-outline';
            case 'PICKED_UP':
                return 'cube-outline';
            case 'IN_TRANSIT':
                return 'car-outline';
            case 'OUT_FOR_DELIVERY':
                return 'bicycle-outline';
            case 'DELIVERED':
            case 'COMPLETED':
                return 'checkmark-circle';
            case 'FAILED':
            case 'CANCELLED':
                return 'close-circle';
            default:
                return 'ellipse-outline';
        }
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'ORDER_PLACED':
            case 'PENDING':
                return '#FBBF24';
            case 'ASSIGNED':
                return '#60A5FA';
            case 'PICKED_UP':
                return '#60A5FA';
            case 'IN_TRANSIT':
                return '#A78BFA';
            case 'OUT_FOR_DELIVERY':
                return '#818CF8';
            case 'DELIVERED':
            case 'COMPLETED':
                return '#34D399';
            case 'FAILED':
            case 'CANCELLED':
                return '#F87171';
            default:
                return '#9CA3AF';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>JOB TIMELINE</Text>
            {sortedTimeline.map((entry, index) => {
                const isFirst = index === 0;
                const isLast = index === sortedTimeline.length - 1;
                const statusColor = getStatusColor(entry.status);

                return (
                    <View key={entry.id} style={styles.timelineItem}>
                        {/* Timeline Line */}
                        {!isFirst && <View style={styles.lineAbove} />}

                        {/* Status Icon */}
                        <View style={[styles.iconContainer, { borderColor: statusColor }]}>
                            <Ionicons
                                name={getStatusIcon(entry.status) as any}
                                size={20}
                                color={statusColor}
                            />
                        </View>

                        {/* Timeline Line Below */}
                        {!isLast && <View style={styles.lineBelow} />}

                        {/* Content */}
                        <View style={styles.contentContainer}>
                            <View style={styles.header}>
                                <Text style={[styles.statusLabel, { color: statusColor }]}>
                                    {entry.status_display}
                                </Text>
                                <Text style={styles.timestamp}>
                                    {new Date(entry.timestamp).toLocaleString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            </View>

                            {entry.location && (
                                <View style={styles.locationRow}>
                                    <Ionicons
                                        name="location-outline"
                                        size={14}
                                        color={StainedGlassTheme.colors.parchmentLight}
                                    />
                                    <Text style={styles.location}>{entry.location}</Text>
                                </View>
                            )}

                            {entry.description && (
                                <Text style={styles.description}>{entry.description}</Text>
                            )}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.md,
    },
    title: {
        color: StainedGlassTheme.colors.gold,
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 0.5,
        marginBottom: Spacing.lg,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: Spacing.md,
        minHeight: 60,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
        zIndex: 2,
    },
    lineAbove: {
        position: 'absolute',
        left: 19,
        top: -Spacing.md,
        width: 2,
        height: Spacing.md + 20,
        backgroundColor: 'rgba(255, 223, 186, 0.2)',
    },
    lineBelow: {
        position: 'absolute',
        left: 19,
        top: 40,
        width: 2,
        height: 60, // Fixed height for timeline connections
        backgroundColor: 'rgba(255, 223, 186, 0.2)',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    statusLabel: {
        ...Typography.bodySemibold,
        textTransform: 'capitalize',
    },
    timestamp: {
        ...Typography.caption,
        color: StainedGlassTheme.colors.parchmentLight,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    location: {
        fontSize: 12,
        color: StainedGlassTheme.colors.parchmentLight,
    },
    description: {
        ...Typography.body,
        color: StainedGlassTheme.colors.parchment,
        opacity: 0.8,
    },
    emptyContainer: {
        padding: Spacing.lg,
        alignItems: 'center',
    },
    emptyText: {
        color: StainedGlassTheme.colors.parchmentLight,
        fontSize: 14,
    },
});
