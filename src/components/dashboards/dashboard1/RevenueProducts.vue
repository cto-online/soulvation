<script setup lang="ts">
import { Icon } from '@iconify/vue';

const products = [
    {
        name: 'MaterialPro',
        revenue: '$23,568',
        growth: '+18%',
        color: 'primary',
        progress: 78
    },
    {
        name: 'Flexy Admin',
        revenue: '$18,927',
        growth: '+12%',
        color: 'secondary',
        progress: 65
    },
    {
        name: 'Ample Admin',
        revenue: '$15,342',
        growth: '+15%',
        color: 'success',
        progress: 85
    },
    {
        name: 'Monster Admin',
        revenue: '$12,789',
        growth: '+8%',
        color: 'warning',
        progress: 58
    }
];
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex align-center justify-space-between mb-4">
                <div>
                    <div class="text-h5 font-weight-bold">Revenue by Products</div>
                    <div class="text-subtitle-1 text-medium-emphasis">Monthly Revenue Overview</div>
                </div>
                <v-btn icon variant="text">
                    <Icon icon="solar:menu-dots-outline" width="24" height="24" />
                </v-btn>
            </div>

            <v-table>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index" class="border-bottom">
                        <td class="pa-4">
                            <div class="d-flex flex-column">
                                <div class="text-subtitle-1 font-weight-bold">{{ product.name }}</div>
                                <div class="text-subtitle-2 text-medium-emphasis">{{ product.revenue }}</div>
                            </div>
                        </td>
                        <td class="text-right pa-4">
                            <div class="text-success">{{ product.growth }}</div>
                        </td>
                        <td class="pa-4" style="width: 40%">
                            <v-progress-linear
                                :model-value="product.progress"
                                height="8"
                                rounded
                                :color="product.color"
                            ></v-progress-linear>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-item>
    </v-card>
</template>