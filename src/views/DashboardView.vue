<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
      Dashboard
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in navigationItems" :key="item.path" class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ item.name }}
        </h2>
        <router-link
          :to="item.path"
          class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Go to {{ item.name }}
          <svg class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigationItems = [
  { name: 'Avatar', path: '/avatar' },
  { name: 'Scenarios', path: '/scenarios' },
  { name: 'Progress', path: '/progress' },
]
</script>