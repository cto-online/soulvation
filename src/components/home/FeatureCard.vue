<template>
  <RouterLink
    v-if="feature.link"
    :to="feature.link"
    class="block bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
  >
    <FeatureCardContent :feature="feature" />
  </RouterLink>
  
  <div 
    v-else 
    class="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
  >
    <FeatureCardContent :feature="feature" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { type Feature } from '@/config/features'
import FeatureCardContent from './FeatureCardContent.vue'

defineProps<{
  feature: Feature
}>()
</script>