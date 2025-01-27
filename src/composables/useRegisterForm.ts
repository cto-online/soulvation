import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useRegisterForm() {
  const router = useRouter()
  const auth = useAuthStore()
  const { loading, error } = auth

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const emailError = ref<string | null>(null)
  const passwordError = ref<string | null>(null)
  const confirmPasswordError = ref<string | null>(null)

  const isPasswordMatch = computed(() => {
    if (!confirmPassword.value) return true // Don't show mismatch when confirm is empty
    return password.value === confirmPassword.value
  })
  const passwordMismatchError = computed(() => !isPasswordMatch.value ? 'Passwords do not match' : null)

  const handleRegister = async () => {
    emailError.value = null // Clear previous email error
    passwordError.value = null // Clear previous password error
    confirmPasswordError.value = null // Clear previous confirm password error

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
    if (!confirmPassword.value) {
      confirmPasswordError.value = 'Confirm password is required'
      return
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = 'Passwords do not match'
      return
    }


    await auth.registerWithEmail(email.value, password.value)
    if (!error) {
      router.push('/')
    }
  }

  const resetForm = () => {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    emailError.value = null
    passwordError.value = null
    confirmPasswordError.value = null
  }

  return {
    email,
    password,
    confirmPassword,
    loading,
    error,
    isPasswordMatch,
    passwordMismatchError,
    emailError,
    passwordError,
    confirmPasswordError,
    handleRegister,
    resetForm
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}