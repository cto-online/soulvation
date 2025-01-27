import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useLoginForm() {
  const router = useRouter()
  const auth = useAuthStore()
  const { loading, error } = auth

  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)

  const emailError = ref<string | null>(null)
  const passwordError = ref<string | null>(null)

  const handleLogin = async () => {
    emailError.value = null // Clear previous email error
    passwordError.value = null // Clear previous password error

    if (!email.value) {
      emailError.value = 'Email is required'
      return
    }
    if (!isValidEmail(email.value)) {
      emailError.value = 'Invalid email format'
      return
    }
    if (!password.value) {
      passwordError.value = 'Password is required'
      return
    } else if (password.value.length < 6) {
      passwordError.value = 'Password must be at least 6 characters'
      return
    }

    await auth.loginWithEmail(email.value, password.value, rememberMe.value)
    if (!error) {
      router.push('/')
    }
  }

  const resetForm = () => {
    email.value = ''
    password.value = ''
    emailError.value = null
    passwordError.value = null
    rememberMe.value = false
  }

  return {
    email,
    password,
    rememberMe,
    loading,
    error,
    emailError,
    passwordError,
    handleLogin,
    resetForm
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}