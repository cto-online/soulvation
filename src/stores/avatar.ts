import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export type AvatarType = 'human' | 'robot' | 'animal'

export interface AvatarTraits {
  [key: string]: string
}

export interface Avatar {
  id: string
  type: AvatarType
  traits: AvatarTraits
  createdAt: string
  updatedAt: string
}

export interface CreateAvatarPayload {
  type: AvatarType
  traits: AvatarTraits
}

interface AvatarState {
  avatars: Avatar[]
  selectedAvatarId: string | null
}

const STORAGE_KEY = 'avatars'

const saveToStorage = (state: AvatarState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save avatars to storage:', error)
  }
}

const loadFromStorage = (): AvatarState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load avatars from storage:', error)
  }
  return null
}

export const useAvatarStore = defineStore('avatar', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const avatars = ref<Avatar[]>([])
  const selectedAvatarId = ref<string | null>(null)

  // Load initial state from storage
  const storedState = loadFromStorage()
  if (storedState) {
    avatars.value = storedState.avatars
    selectedAvatarId.value = storedState.selectedAvatarId
  }

  // Persist state changes
  watch(
    () => ({
      avatars: avatars.value,
      selectedAvatarId: selectedAvatarId.value
    }),
    (state) => saveToStorage(state),
    { deep: true }
  )

  const selectedAvatar = computed(() => 
    avatars.value.find(avatar => avatar.id === selectedAvatarId.value)
  )

  const totalAvatars = computed(() => avatars.value.length)

  const validateTraits = (traits: AvatarTraits): string | null => {
    if (!traits || Object.keys(traits).length === 0) {
      return 'Avatar must have at least one trait'
    }
    return null
  }

  const createAvatar = async (payload: CreateAvatarPayload): Promise<Avatar | null> => {
    loading.value = true
    error.value = null

    try {
      const validationError = validateTraits(payload.traits)
      if (validationError) {
        throw new Error(validationError)
      }

      const newAvatar: Avatar = {
        id: crypto.randomUUID(),
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      avatars.value.push(newAvatar)
      return newAvatar
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create avatar'
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteAvatar = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const index = avatars.value.findIndex(avatar => avatar.id === id)
      if (index === -1) {
        throw new Error('Avatar not found')
      }

      avatars.value.splice(index, 1)
      if (selectedAvatarId.value === id) {
        selectedAvatarId.value = null
      }
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete avatar'
      return false
    } finally {
      loading.value = false
    }
  }

  const selectAvatar = (id: string | null) => {
    if (id === null || avatars.value.some(avatar => avatar.id === id)) {
      selectedAvatarId.value = id
    }
  }

  const updateAvatar = async (id: string, traits: AvatarTraits): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const validationError = validateTraits(traits)
      if (validationError) {
        throw new Error(validationError)
      }

      const avatar = avatars.value.find(a => a.id === id)
      if (!avatar) {
        throw new Error('Avatar not found')
      }

      avatar.traits = { ...avatar.traits, ...traits }
      avatar.updatedAt = new Date().toISOString()
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update avatar'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    avatars,
    selectedAvatar,
    totalAvatars,
    loading,
    error,
    createAvatar,
    deleteAvatar,
    selectAvatar,
    updateAvatar
  }
})