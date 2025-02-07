<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center">
                <v-avatar size="45" class="bg-secondary">
                    <Icon icon="solar:chart-2-outline" class="text-white" height="25" />
                </v-avatar>
                <div class="ml-3">
                    <h6 class="text-h6">Projects</h6>
                    <span class="text-subtitle-2 d-block">Total Projects</span>
                </div>
            </div>
            <div class="mt-4">
                <h3 class="text-h3">182</h3>
                <div class="d-flex align-center mt-1">
                    <span class="text-error d-flex align-center">
                        <Icon icon="solar:arrow-down-outline" width="18" height="18" />
                        -3%
                    </span>
                    <span class="ml-2">last year</span>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>