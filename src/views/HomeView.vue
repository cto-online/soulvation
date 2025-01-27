<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center">
    <div class="max-w-4xl mx-auto space-y-12">
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
        Discover Your Life Constellation
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Embark on a journey of self-discovery and personal growth through.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FeatureCard
        v-for="feature in features"
        :key="feature.title"
        :feature="feature"
      />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeatureCard from '@/components/home/FeatureCard.vue'
import { homeFeatures } from '@/config/features'

const features = homeFeatures
</script>
