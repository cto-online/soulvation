<template>
  <div class="space-y-8 animate-fade">
    <header class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-gray-900">Life Scenarios</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Navigate through real-life situations and make choices that align with your personal growth journey.
      </p>
    </header>

    <!-- Scenario Selection -->
    <div v-if="!activeScenario" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="scenario in scenarios"
        :key="scenario.id"
        class="card hover:shadow-md transition-shadow cursor-pointer"
        @click="startScenario(scenario)"
      >
        <div class="space-y-4">
          <div class="h-12 w-12 rounded-lg flex items-center justify-center"
               :class="difficultyColors[scenario.difficulty]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="difficultyIconColors[scenario.difficulty]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ scenario.title }}</h3>
            <p class="text-sm text-gray-500">{{ scenario.description }}</p>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium" :class="difficultyTextColors[scenario.difficulty]">
              {{ scenario.difficulty }}
            </span>
            <span class="text-sm text-gray-500">
              {{ scenario.estimatedTime }} mins
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Scenario -->
    <div v-else class="max-w-2xl mx-auto">
      <div class="card space-y-6">
        <!-- Scenario Progress -->
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${(currentStep / activeScenario.steps.length) * 100}%` }"
          ></div>
        </div>

        <!-- Scenario Content -->
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ activeScenario.steps[currentStep - 1].situation }}
          </h2>
          
          <div class="prose prose-primary max-w-none">
            <p>{{ activeScenario.steps[currentStep - 1].description }}</p>
          </div>

          <!-- Choices -->
          <div class="space-y-4">
            <button
              v-for="choice in activeScenario.steps[currentStep - 1].choices"
              :key="choice.id"
              class="w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary-500 hover:bg-primary-50"
              @click="makeChoice(choice)"
            >
              <p class="font-medium text-gray-900">{{ choice.text }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ choice.subtext }}</p>
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between pt-4 border-t">
          <button
            class="btn btn-secondary"
            @click="exitScenario"
          >
            Exit Scenario
          </button>
          <div class="text-sm text-gray-500">
            Step {{ currentStep }} of {{ activeScenario.steps.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Choice {
  id: number
  text: string
  subtext: string
  impact: string
}

interface Step {
  situation: string
  description: string
  choices: Choice[]
}

interface Scenario {
  id: number
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: number
  steps: Step[]
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Workplace Dynamics',
    description: 'Navigate a challenging situation with a colleague while maintaining professional relationships.',
    difficulty: 'Beginner',
    estimatedTime: 15,
    steps: [
      {
        situation: 'The Project Deadline',
        description: "Your colleague is consistently late with their deliverables, affecting the team's progress. How do you handle this situation?",
        choices: [
          {
            id: 1,
            text: 'Have a private conversation',
            subtext: 'Discuss the impact on the team and offer support',
            impact: 'Builds trust and understanding'
          },
          {
            id: 2,
            text: 'Report to supervisor',
            subtext: 'Escalate the issue through proper channels',
            impact: 'May create tension but ensures accountability'
          },
          {
            id: 3,
            text: 'Adapt and compensate',
            subtext: 'Adjust your work to accommodate delays',
            impact: 'Maintains harmony but may enable behavior'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Personal Boundaries',
    description: 'Practice setting healthy boundaries in personal relationships.',
    difficulty: 'Intermediate',
    estimatedTime: 20,
    steps: [
      {
        situation: 'The Persistent Friend',
        description: 'A friend constantly asks for favors that stretch your resources and time. How do you address this?',
        choices: [
          {
            id: 1,
            text: 'Set clear boundaries',
            subtext: 'Explain your limitations while showing care',
            impact: 'Promotes healthy relationship dynamics'
          },
          {
            id: 2,
            text: 'Gradually distance yourself',
            subtext: 'Reduce availability without confrontation',
            impact: 'Avoids conflict but may not resolve issue'
          },
          {
            id: 3,
            text: 'Continue helping',
            subtext: 'Maintain the status quo to preserve friendship',
            impact: 'May lead to burnout and resentment'
          }
        ]
      }
    ]
  }
]

const difficultyColors = {
  Beginner: 'bg-green-100',
  Intermediate: 'bg-yellow-100',
  Advanced: 'bg-red-100'
}

const difficultyIconColors = {
  Beginner: 'text-green-600',
  Intermediate: 'text-yellow-600',
  Advanced: 'text-red-600'
}

const difficultyTextColors = {
  Beginner: 'text-green-600',
  Intermediate: 'text-yellow-600',
  Advanced: 'text-red-600'
}

const activeScenario = ref<Scenario | null>(null)
const currentStep = ref(1)

const startScenario = (scenario: Scenario) => {
  activeScenario.value = scenario
  currentStep.value = 1
}

const makeChoice = (choice: Choice) => {
  // TODO: Implement choice impact logic
  if (activeScenario.value && currentStep.value < activeScenario.value.steps.length) {
    currentStep.value++
  } else {
    // Scenario complete
    exitScenario()
  }
}

const exitScenario = () => {
  activeScenario.value = null
  currentStep.value = 1
}
</script>