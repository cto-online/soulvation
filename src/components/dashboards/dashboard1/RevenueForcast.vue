<script setup lang="ts">
import { Icon } from '@iconify/vue';

const monthlyData = [
    { month: 'Jan', value: 78, color: 'primary' },
    { month: 'Feb', value: 65, color: 'secondary' },
    { month: 'Mar', value: 85, color: 'success' },
    { month: 'Apr', value: 45, color: 'warning' },
    { month: 'May', value: 92, color: 'error' },
    { month: 'Jun', value: 58, color: 'info' }
];
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between mb-3">
                <div>
                    <div class="text-h5 font-weight-bold">Revenue Forecast</div>
                    <div class="text-subtitle-1 text-medium-emphasis">Monthly Revenue Overview</div>
                </div>
                <div class="text-h6 text-success">
                    <Icon icon="solar:arrow-up-outline" class="mr-1" />
                    +12%
                </div>
            </div>

            <div class="mt-4">
                <div v-for="(item, index) in monthlyData" :key="index" class="mb-4">
                    <div class="d-flex align-center justify-space-between mb-1">
                        <div class="text-subtitle-1">{{ item.month }}</div>
                        <div class="text-subtitle-1">{{ item.value }}%</div>
                    </div>
                    <v-progress-linear
                        :model-value="item.value"
                        height="8"
                        rounded
                        :color="item.color"
                    ></v-progress-linear>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>