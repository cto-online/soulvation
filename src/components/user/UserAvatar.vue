<template>
  <div class="flex items-center space-x-2">
    <span class="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
      <span class="text-sm font-medium text-primary-700 dark:text-primary-300">
        {{ initials }}
      </span>
    </span>
    <span v-if="showEmail" class="hidden md:block">{{ email }}</span>
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  showEmail?: boolean
}>()

const auth = useAuthStore()

const email = computed(() => auth.user?.email || '')
const initials = computed(() => {
  const emailValue = auth.user?.email || ''
  return emailValue.substring(0, 2).toUpperCase()
})
</script>