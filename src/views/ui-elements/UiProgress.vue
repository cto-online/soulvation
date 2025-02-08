<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Progress Linear -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Progress Linear</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-progress-linear
                v-model="progress"
                color="primary"
              ></v-progress-linear>

              <v-progress-linear
                v-model="progress"
                color="primary"
                height="8"
                rounded
              ></v-progress-linear>

              <v-progress-linear
                v-model="progress"
                color="primary"
                height="20"
              >
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Progress Linear Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Progress Linear Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-progress-linear
                v-for="(color, index) in colors"
                :key="index"
                :model-value="(index + 1) * 20"
                :color="color"
                height="8"
                rounded
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Progress Linear Indeterminate -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Progress Linear Indeterminate</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-progress-linear
                indeterminate
                color="primary"
              ></v-progress-linear>

              <v-progress-linear
                indeterminate
                color="primary"
                height="8"
                rounded
              ></v-progress-linear>

              <v-progress-linear
                indeterminate
                color="primary"
                reverse
              ></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Progress Circular -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Progress Circular</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-progress-circular
                v-model="progress"
                color="primary"
              ></v-progress-circular>

              <v-progress-circular
                v-model="progress"
                color="primary"
                :size="50"
                :width="7"
              ></v-progress-circular>

              <v-progress-circular
                v-model="progress"
                color="primary"
                :size="70"
                :width="7"
              >
                {{ Math.ceil(progress) }}%
              </v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Progress Circular Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Progress Circular Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-progress-circular
                v-for="(color, index) in colors"
                :key="index"
                :model-value="(index + 1) * 20"
                :color="color"
                :size="50"
                :width="7"
              ></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Progress -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Interactive Progress</span>
            <div class="d-flex gap-2">
              <v-btn
                color="primary"
                @click="startProgress"
                :disabled="loading"
              >
                Start
              </v-btn>
              <v-btn
                color="error"
                @click="resetProgress"
                :disabled="!loading"
              >
                Reset
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-progress-linear
                :model-value="interactiveProgress"
                color="primary"
                height="20"
                rounded
                striped
                :active="loading"
              >
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>

              <div class="d-flex justify-space-between">
                <v-progress-circular
                  :model-value="interactiveProgress"
                  color="primary"
                  :size="100"
                  :width="10"
                >
                  {{ Math.ceil(interactiveProgress) }}%
                </v-progress-circular>

                <div class="text-center">
                  <div class="text-h6 mb-2">Uploading Files</div>
                  <div class="text-body-2">{{ Math.ceil(interactiveProgress) }}% Complete</div>
                  <div class="text-caption">{{ Math.ceil(interactiveProgress / 20) }} of 5 files</div>
                </div>

                <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="100"
                  :width="10"
                  v-if="loading"
                ></v-progress-circular>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Progress -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Progress</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(stat, index) in stats"
                :key="index"
                cols="12"
                md="6"
              >
                <v-card variant="outlined">
                  <v-card-item>
                    <div class="d-flex justify-space-between align-center mb-2">
                      <div>
                        <div class="text-h6">{{ stat.title }}</div>
                        <div class="text-caption">{{ stat.subtitle }}</div>
                      </div>
                      <v-progress-circular
                        :model-value="stat.value"
                        :color="stat.color"
                        :size="60"
                        :width="7"
                      >
                        {{ stat.value }}%
                      </v-progress-circular>
                    </div>
                    <v-progress-linear
                      :model-value="stat.value"
                      :color="stat.color"
                      height="8"
                      rounded
                    ></v-progress-linear>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiProgress',

  data() {
    return {
      progress: 60,
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      loading: false,
      interactiveProgress: 0,
      progressInterval: null as number | null,
      stats: [
        {
          title: 'Storage Usage',
          subtitle: '80GB of 100GB used',
          value: 80,
          color: 'error'
        },
        {
          title: 'Task Completion',
          subtitle: '45 of 50 tasks completed',
          value: 90,
          color: 'success'
        },
        {
          title: 'Project Progress',
          subtitle: 'Development phase',
          value: 65,
          color: 'primary'
        },
        {
          title: 'Team Performance',
          subtitle: 'Above average',
          value: 85,
          color: 'info'
        }
      ]
    }
  },

  methods: {
    startProgress() {
      this.loading = true
      this.interactiveProgress = 0
      this.progressInterval = window.setInterval(() => {
        if (this.interactiveProgress >= 100) {
          this.resetProgress()
        } else {
          this.interactiveProgress += 1
        }
      }, 100)
    },

    resetProgress() {
      this.loading = false
      this.interactiveProgress = 0
      if (this.progressInterval) {
        clearInterval(this.progressInterval)
        this.progressInterval = null
      }
    }
  },

  beforeUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card {
  height: 100%;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1rem;
}

.v-card-text {
  padding: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}
</style>