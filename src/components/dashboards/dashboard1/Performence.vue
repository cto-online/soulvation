<script setup lang="ts">
import { Icon } from '@iconify/vue';

const metrics = [
    {
        title: 'Sales',
        value: '86%',
        icon: 'solar:chart-line-outline',
        color: 'primary',
        progress: 86
    },
    {
        title: 'Products',
        value: '72%',
        icon: 'solar:box-outline',
        color: 'secondary',
        progress: 72
    },
    {
        title: 'Customers',
        value: '93%',
        icon: 'solar:user-rounded-outline',
        color: 'success',
        progress: 93
    }
];
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between mb-4">
                <div>
                    <div class="text-h5 font-weight-bold">Your Performance</div>
                    <div class="text-subtitle-1 text-medium-emphasis">Monthly Report</div>
                </div>
                <v-btn icon variant="text">
                    <Icon icon="solar:menu-dots-outline" width="24" height="24" />
                </v-btn>
            </div>

            <div class="mt-4">
                <div v-for="(metric, index) in metrics" :key="index" class="mb-6">
                    <div class="d-flex align-center justify-space-between mb-2">
                        <div class="d-flex align-center">
                            <v-avatar :color="metric.color" size="45" class="mr-3">
                                <Icon :icon="metric.icon" class="text-white" height="24" />
                            </v-avatar>
                            <div>
                                <div class="text-subtitle-1 font-weight-bold">{{ metric.title }}</div>
                                <div class="text-medium-emphasis">{{ metric.value }}</div>
                            </div>
                        </div>
                    </div>
                    <v-progress-linear
                        :model-value="metric.progress"
                        height="8"
                        rounded
                        :color="metric.color"
                    ></v-progress-linear>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>