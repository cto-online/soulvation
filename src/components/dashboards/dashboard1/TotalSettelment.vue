<script setup lang="ts">
import { Icon } from '@iconify/vue';

const settlements = [
    {
        title: 'Pending',
        amount: '$12,456',
        icon: 'solar:clock-circle-outline',
        color: 'warning'
    },
    {
        title: 'Completed',
        amount: '$38,265',
        icon: 'solar:check-circle-outline',
        color: 'success'
    },
    {
        title: 'Failed',
        amount: '$2,456',
        icon: 'solar:close-circle-outline',
        color: 'error'
    }
];
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between mb-4">
                <div>
                    <div class="text-h5 font-weight-bold">Total Settlement</div>
                    <div class="text-subtitle-1 text-medium-emphasis">Current Month</div>
                </div>
                <v-btn icon variant="text">
                    <Icon icon="solar:menu-dots-outline" width="24" height="24" />
                </v-btn>
            </div>

            <div class="mt-4">
                <div v-for="(item, index) in settlements" :key="index" class="mb-6">
                    <div class="d-flex align-center justify-space-between mb-2">
                        <div class="d-flex align-center">
                            <v-avatar :color="item.color" size="45" class="mr-3">
                                <Icon :icon="item.icon" class="text-white" height="24" />
                            </v-avatar>
                            <div>
                                <div class="text-subtitle-1 font-weight-bold">{{ item.title }}</div>
                                <div class="text-h6">{{ item.amount }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>