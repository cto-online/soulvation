<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center">
                <v-avatar size="45" class="bg-primary">
                    <Icon icon="solar:user-rounded-outline" class="text-white" height="25" />
                </v-avatar>
                <div class="ml-3">
                    <h6 class="text-h6">Customers</h6>
                    <span class="text-subtitle-2 d-block">Total Customers</span>
                </div>
            </div>
            <div class="mt-4">
                <h3 class="text-h3">$36,358</h3>
                <div class="d-flex align-center mt-1">
                    <span class="text-success d-flex align-center">
                        <Icon icon="solar:arrow-up-outline" width="18" height="18" />
                        +9%
                    </span>
                    <span class="ml-2">last year</span>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>