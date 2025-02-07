<script setup lang="ts">
import { Icon } from '@iconify/vue';

const salesData = [
    { category: 'Online', value: '$8,428', growth: '+12%', color: 'primary', progress: 78 },
    { category: 'Offline', value: '$3,859', growth: '+8%', color: 'secondary', progress: 65 },
    { category: 'Marketing', value: '$6,215', growth: '+15%', color: 'success', progress: 85 }
];
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between mb-4">
                <div>
                    <div class="text-h6 font-weight-bold">Sales Overview</div>
                    <div class="text-subtitle-2 text-medium-emphasis">Monthly Revenue</div>
                </div>
                <v-btn icon variant="text">
                    <Icon icon="solar:menu-dots-outline" width="24" height="24" />
                </v-btn>
            </div>

            <div class="mt-4">
                <div v-for="(item, index) in salesData" :key="index" class="mb-4">
                    <div class="d-flex align-center justify-space-between mb-1">
                        <div>
                            <div class="text-subtitle-1 font-weight-medium">{{ item.category }}</div>
                            <div class="d-flex align-center">
                                <div class="text-h6 mr-2">{{ item.value }}</div>
                                <div class="text-success">{{ item.growth }}</div>
                            </div>
                        </div>
                    </div>
                    <v-progress-linear
                        :model-value="item.progress"
                        height="8"
                        rounded
                        :color="item.color"
                    ></v-progress-linear>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>