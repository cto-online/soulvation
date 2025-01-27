<template>
  <div class="space-y-8 animate-fade">
    <header class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-gray-900">Your Growth Journey</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Track your progress, achievements, and consciousness evolution.
      </p>
    </header>

    <!-- Progress Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card bg-gradient-to-br from-primary-50 to-primary-100">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Consciousness Level</h2>
            <span class="text-2xl font-bold text-primary-600">{{ userStats.level }}</span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Progress to next level</span>
              <span>{{ userStats.xp }}/{{ userStats.nextLevelXp }} XP</span>
            </div>
            <div class="w-full bg-white rounded-full h-2">
              <div
                class="bg-primary-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Scenarios Completed</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-2xl font-bold text-primary-600">{{ userStats.scenariosCompleted }}</div>
              <div class="text-sm text-gray-600">Total</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-green-600">{{ userStats.successRate }}%</div>
              <div class="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Active Avatars</h2>
          <div class="flex -space-x-2">
            <div
              v-for="avatar in userStats.activeAvatars"
              :key="avatar.id"
              class="h-10 w-10 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center"
              :title="avatar.type"
            >
              <span class="text-sm font-medium text-primary-600">
                {{ avatar.type.charAt(0) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Achievements -->
    <div class="card">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
      <div class="space-y-6">
        <div
          v-for="achievement in recentAchievements"
          :key="achievement.id"
          class="flex items-center space-x-4"
        >
          <div
            class="h-12 w-12 rounded-lg flex items-center justify-center"
            :class="achievement.completed ? 'bg-primary-100' : 'bg-gray-100'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :class="achievement.completed ? 'text-primary-600' : 'text-gray-400'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="font-medium text-gray-900">{{ achievement.title }}</h3>
            <p class="text-sm text-gray-500">{{ achievement.description }}</p>
          </div>
          <div class="text-right">
            <div
              class="text-sm font-medium"
              :class="achievement.completed ? 'text-primary-600' : 'text-gray-500'"
            >
              {{ achievement.completed ? 'Completed' : 'In Progress' }}
            </div>
            <div class="text-sm text-gray-500">
              {{ achievement.progress }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Growth Map -->
    <div class="card">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Map of Consciousness</h2>
      <div class="aspect-video bg-gray-50 rounded-lg p-4">
        <!-- Placeholder for consciousness map visualization -->
        <div class="h-full flex items-center justify-center text-gray-500">
          Map visualization will be implemented here
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Avatar {
  id: number
  type: string
}

interface UserStats {
  level: number
  xp: number
  nextLevelXp: number
  scenariosCompleted: number
  successRate: number
  activeAvatars: Avatar[]
}

interface Achievement {
  id: number
  title: string
  description: string
  completed: boolean
  progress: number
}

const userStats = ref<UserStats>({
  level: 3,
  xp: 750,
  nextLevelXp: 1000,
  scenariosCompleted: 12,
  successRate: 85,
  activeAvatars: [
    { id: 1, type: 'Inner Critic' },
    { id: 2, type: 'Nurturer' },
    { id: 3, type: 'Achiever' }
  ]
})

const recentAchievements = ref<Achievement[]>([
  {
    id: 1,
    title: 'Harmony Seeker',
    description: 'Successfully resolve 5 interpersonal conflicts',
    completed: true,
    progress: 100
  },
  {
    id: 2,
    title: 'Self-Awareness Master',
    description: 'Create and develop 3 different avatar types',
    completed: true,
    progress: 100
  },
  {
    id: 3,
    title: 'Growth Champion',
    description: 'Complete 15 challenging scenarios',
    completed: false,
    progress: 80
  },
  {
    id: 4,
    title: 'Mindfulness Explorer',
    description: 'Practice daily reflection for 7 consecutive days',
    completed: false,
    progress: 40
  }
])
</script>