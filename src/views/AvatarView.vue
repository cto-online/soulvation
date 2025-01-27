<template>
  <div class="space-y-8 animate-fade">
    <header class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-gray-900">Create Your Avatar</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Design avatars that represent different aspects of your personality. Each avatar embodies unique characteristics and roles within your inner constellation.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Avatar Preview -->
      <div class="lg:col-span-1">
        <div class="card space-y-6">
          <h2 class="text-xl font-semibold text-gray-900">Avatar Preview</h2>
          <div class="aspect-square bg-primary-50 rounded-lg flex items-center justify-center border-2 border-dashed border-primary-200">
            <div v-if="selectedType && !isLoading" class="text-center p-4">
              <div class="h-32 w-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p class="mt-4 font-medium text-gray-900">{{ selectedType }}</p>
            </div>
            <p v-else class="text-gray-500">Select an avatar type to begin</p>
          </div>
        </div>
      </div>

      <!-- Avatar Customization -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Avatar Type Selection -->
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Choose Avatar Type</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              v-for="type in avatarTypes"
              :key="type.name"
              class="p-4 rounded-lg border-2 transition-all"
              :class="[
                selectedType === type.name
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
              ]"
              @click="selectedType = type.name"
            >
              <div class="flex items-center space-x-3">
                <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <component :is="type.icon" class="h-5 w-5 text-primary-600" />
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-gray-900">{{ type.name }}</h3>
                  <p class="text-sm text-gray-500">{{ type.description }}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Characteristics -->
        <div v-if="selectedType" class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Define Characteristics</h2>
          <div class="space-y-4">
            <div v-for="(trait, index) in traits" :key="index" class="space-y-2">
              <label :for="'trait-' + index" class="block text-sm font-medium text-gray-700">
                {{ trait.label }}
              </label>
              <select
                :id="'trait-' + index"
                v-model="trait.value"
                class="input"
              >
                <option value="">Select a trait</option>
                <option v-for="option in trait.options" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button class="btn btn-secondary" @click="resetForm">
            Reset
          </button>
          <button
            class="btn btn-primary"
            :disabled="!isFormValid || isLoading"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
            @click="saveAvatar"
          >
            Create Avatar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { useAvatarStore } from '@/stores/avatar'
import { storeToRefs } from 'pinia'

interface AvatarTrait {
  label: string
  value: string
  options: string[]
}

interface AvatarType {
  name: string
  description: string
  icon: string
}

const avatarStore = useAvatarStore()
const { totalAvatars } = storeToRefs(avatarStore)

const isLoading = ref(false)
const error = ref<string | null>(null)

const selectedType = ref('')

const avatarTypes = [
  {
    name: 'Inner Critic',
    description: 'The analytical and judgmental aspect of your personality',
    icon: 'svg-icon-critic'
  },
  {
    name: 'People Pleaser',
    description: 'The harmonious and accommodating aspect',
    icon: 'svg-icon-pleaser'
  },
  {
    name: 'Achiever',
    description: 'The ambitious and goal-oriented aspect',
    icon: 'svg-icon-achiever'
  },
  {
    name: 'Nurturer',
    description: 'The caring and supportive aspect',
    icon: 'svg-icon-nurturer'
  }
]

const traits: Ref<AvatarTrait[]> = ref([
  {
    label: 'Primary Motivation',
    value: '',
    options: ['Growth', 'Security', 'Connection', 'Achievement']
  },
  {
    label: 'Communication Style',
    value: '',
    options: ['Direct', 'Diplomatic', 'Analytical', 'Empathetic']
  },
  {
    label: 'Core Challenge',
    value: '',
    options: ['Fear of Failure', 'Fear of Rejection', 'Perfectionism', 'Boundaries']
  }
])

const isFormValid = computed(() => {
  return selectedType.value && traits.value.every(trait => trait.value)
})

const resetForm = () => {
  selectedType.value = ''
  traits.value.forEach(trait => trait.value = '')
  error.value = null
}

const saveAvatar = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  error.value = null

  try {
    await avatarStore.createAvatar({
      type: selectedType.value,
      traits: traits.value.reduce((acc, trait) => ({
        ...acc,
        [trait.label]: trait.value
      }), {})
    })
    resetForm()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to create avatar'
  } finally {
    isLoading.value = false
  }
}
</script>