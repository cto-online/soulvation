import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/config/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  browserLocalPersistence,
  setPersistence,
  type User
} from 'firebase/auth'

type AuthError = {
  code: string
  message: string
}

type SocialProvider = 'google.com' | 'microsoft.com' | 'twitter.com' | 'apple.com'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const withErrorHandling = async <T>(operation: () => Promise<T>) => {
    loading.value = true
    error.value = null
    try {
      return await operation()
    } catch (e) {
      error.value = (e as AuthError).message
      throw e
    } finally {
      loading.value = false
    }
  }

  const isAuthenticated = computed(() => !!user.value)

  // Initialize auth state
  auth.onAuthStateChanged((newUser: User | null) => {
    user.value = newUser
    loading.value = false
  })

  // Email/Password Authentication
  const loginWithEmail = async (email: string, password: string, rememberMe: boolean = false) => {
    return withErrorHandling(async () => {
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence)
      }
      return signInWithEmailAndPassword(auth, email, password)
    })
  }

  const registerWithEmail = async (email: string, password: string) => {
    return withErrorHandling(() => createUserWithEmailAndPassword(auth, email, password))
  }

  // Social Authentication - consolidated into a single method
  const loginWithProvider = async (providerName: SocialProvider) => {
    return withErrorHandling(async () => {
      const provider = providerName === 'google.com' 
        ? new GoogleAuthProvider()
        : new OAuthProvider(providerName)
      return signInWithPopup(auth, provider)
    })
  }
  const loginWithGoogle = () => loginWithProvider('google.com')
  const loginWithMicrosoft = () => loginWithProvider('microsoft.com')
  const loginWithX = () => loginWithProvider('twitter.com')
  const loginWithApple = () => loginWithProvider('apple.com')

  const logout = async () => {
    return withErrorHandling(() => signOut(auth))
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithMicrosoft,
    loginWithX,
    loginWithApple,
    logout
  }
})