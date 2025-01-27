<template>
  <div>
    <div v-if="feature.icon" class="mb-4">
      <img :src="feature.icon" alt="" class="w-12 h-12" />
    </div>
    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
      {{ feature.title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-400">
      {{ feature.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { type Feature } from '@/config/features'

defineProps<{
  feature: Feature
}>()</script>