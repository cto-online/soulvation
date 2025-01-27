import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useAuthForm() {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const resetForm = () => {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  }

  return {
    email, password, confirmPassword,
    resetForm
  }
}