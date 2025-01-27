<template>
  <div class="flex flex-row space-x-3 justify-center">
    <button 
      v-for="provider in providers" 
      :key="provider.name"
      @click="provider.login"
      class="social-login-button"
      :disabled="loading"
    >
      <img :src="provider.icon" :alt="provider.name" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import appleIcon from '@/assets/icons/apple.svg'
import googleIcon from '@/assets/icons/google.svg'
import xIcon from '@/assets/icons/x.svg'
import microsoftIcon from '@/assets/icons/microsoft.svg'

const auth = useAuthStore()
const { loading, loginWithGoogle, loginWithMicrosoft, loginWithX, loginWithApple } = auth

const providers = [
  {
    name: 'Apple',
    icon: appleIcon,
    login: loginWithApple
  },
  {
    name: 'Google',
    icon: googleIcon,
    login: loginWithGoogle
  },
  {
    name: 'X',
    icon: xIcon,
    login: loginWithX
  },
  {
    name: 'Microsoft',
    icon: microsoftIcon,
    login: loginWithMicrosoft
  }
]
</script>

<style scoped>
.social-login-button {
  @apply flex items-center justify-center p-2.5 text-gray-600 transition-colors duration-300 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500;
}
</style>