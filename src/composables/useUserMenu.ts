import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function useUserMenu() {
  const router = useRouter()
  const auth = useAuthStore()
  const isOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  const handleLogout = async () => {
    await auth.logout()
    close()
    router.push('/')
  }

  return {
    isOpen,
    toggle,
    close,
    handleLogout
  }
}