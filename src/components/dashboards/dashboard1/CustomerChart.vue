<script setup lang="ts">
import { Icon } from '@iconify/vue';

const customerStats = [
    { label: 'New', value: 385, color: 'primary', percentage: 85 },
    { label: 'Returning', value: 225, color: 'secondary', percentage: 65 },
    { label: 'Inactive', value: 125, color: 'error', percentage: 35 }
];
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between mb-4">
                <div>
                    <div class="text-h6 font-weight-bold">Customer Overview</div>
                    <div class="text-subtitle-2 text-medium-emphasis">Monthly Statistics</div>
                </div>
                <v-btn icon variant="text">
                    <Icon icon="solar:menu-dots-outline" width="24" height="24" />
                </v-btn>
            </div>

            <div class="d-flex justify-space-around mt-4">
                <div v-for="(stat, index) in customerStats" :key="index" class="text-center">
                    <v-progress-circular
                        :model-value="stat.percentage"
                        :color="stat.color"
                        :size="80"
                        :width="8"
                    >
                        {{ stat.percentage }}%
                    </v-progress-circular>
                    <div class="mt-2">
                        <div class="text-h6">{{ stat.value }}</div>
                        <div class="text-subtitle-2 text-medium-emphasis">{{ stat.label }}</div>
                    </div>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>