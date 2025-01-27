<template>
  <div v-if="error" class="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {{ error.message || 'Something went wrong' }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        {{ error.details || 'Please try again or contact support if the problem persists.' }}
      </p>
      <div class="flex justify-center gap-4">
        <button
          @click="handleReset"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Try Again
        </button>
        <button
          @click="handleGoHome"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Go Home
        </button>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

interface ErrorState {
  message: string
  details?: string
}

const props = defineProps<{
  onError?: (error: Error) => void
}>()

const error = ref<ErrorState | null>(null)
const router = useRouter()

onErrorCaptured((err: unknown) => {
  const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
  error.value = { message: errorMessage }
  props.onError?.(err as Error)
  return false // Prevent error from propagating
})

const handleReset = () => {
  error.value = null
}

const handleGoHome = () => {
  error.value = null
  router.push('/')
}
</script>