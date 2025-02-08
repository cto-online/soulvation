<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Chips -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Chips</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-chip>Default</v-chip>
              <v-chip color="primary">Primary</v-chip>
              <v-chip color="secondary">Secondary</v-chip>
              <v-chip color="success">Success</v-chip>
              <v-chip color="info">Info</v-chip>
              <v-chip color="warning">Warning</v-chip>
              <v-chip color="error">Error</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Chip Variants -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Chip Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 mb-4">
              <v-chip
                v-for="variant in variants"
                :key="variant"
                color="primary"
                :variant="variant"
              >
                {{ variant }}
              </v-chip>
            </div>

            <div class="d-flex flex-wrap gap-4">
              <v-chip
                v-for="variant in variants"
                :key="variant"
                color="secondary"
                :variant="variant"
              >
                {{ variant }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Chip Sizes -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Chip Sizes</v-card-title>
          <v-card-text>
            <div class="d-flex align-center flex-wrap gap-4">
              <v-chip
                v-for="size in ['x-small', 'small', 'default', 'large', 'x-large']"
                :key="size"
                color="primary"
                :size="size"
              >
                {{ size }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Closable Chips -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Closable Chips</span>
            <v-btn
              color="primary"
              @click="restoreChips"
              :disabled="closableChips.every(chip => chip.visible)"
            >
              Restore All
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-chip
                v-for="chip in closableChips"
                :key="chip.id"
                v-show="chip.visible"
                :color="chip.color"
                closable
                @click:close="chip.visible = false"
              >
                {{ chip.label }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Filter Chips -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Filter Chips</v-card-title>
          <v-card-text>
            <div class="mb-4">Selected Filters: {{ selectedFilters.length }}</div>
            <v-chip-group
              v-model="selectedFilters"
              column
              multiple
            >
              <v-chip
                v-for="filter in filters"
                :key="filter.value"
                :value="filter.value"
                filter
                :text="filter.label"
              ></v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Chips -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Chips</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-chip
                :color="liked ? 'error' : undefined"
                @click="liked = !liked"
                prepend-icon="mdi-heart"
              >
                {{ liked ? 'Liked' : 'Like' }}
              </v-chip>

              <v-chip
                :color="following ? 'primary' : undefined"
                @click="following = !following"
              >
                <v-icon
                  start
                  :icon="following ? 'mdi-check' : 'mdi-plus'"
                ></v-icon>
                {{ following ? 'Following' : 'Follow' }}
              </v-chip>

              <v-chip
                :loading="loading"
                @click="simulateLoading"
              >
                {{ loading ? 'Processing...' : 'Click me' }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Content -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Content</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-chip
                v-for="user in users"
                :key="user.id"
                :color="user.color"
                class="custom-chip"
              >
                <template v-slot:prepend>
                  <v-avatar :color="user.color">
                    {{ user.initials }}
                  </v-avatar>
                </template>
                {{ user.name }}
                <v-icon
                  v-if="user.verified"
                  icon="mdi-check-decagram"
                  class="ms-2"
                  size="small"
                ></v-icon>
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Status Chips -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Status Chips</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task.id">
                  <td>{{ task.name }}</td>
                  <td>
                    <v-chip
                      size="small"
                      :color="task.assignee.color"
                      variant="outlined"
                    >
                      {{ task.assignee.name }}
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      size="small"
                      :color="getPriorityColor(task.priority)"
                      variant="elevated"
                    >
                      {{ task.priority }}
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      size="small"
                      :color="getStatusColor(task.status)"
                    >
                      <v-icon
                        start
                        size="small"
                        :icon="getStatusIcon(task.status)"
                      ></v-icon>
                      {{ task.status }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiChip',

  data() {
    return {
      liked: false,
      following: false,
      loading: false,
      selectedFilters: [],
      variants: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain'],
      closableChips: [
        { id: 1, label: 'JavaScript', color: 'warning', visible: true },
        { id: 2, label: 'Vue.js', color: 'success', visible: true },
        { id: 3, label: 'TypeScript', color: 'info', visible: true },
        { id: 4, label: 'Node.js', color: 'primary', visible: true }
      ],
      filters: [
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'react', label: 'React' },
        { value: 'node', label: 'Node.js' }
      ],
      users: [
        { id: 1, name: 'John Doe', initials: 'JD', color: 'primary', verified: true },
        { id: 2, name: 'Jane Smith', initials: 'JS', color: 'success', verified: true },
        { id: 3, name: 'Bob Wilson', initials: 'BW', color: 'warning', verified: false }
      ],
      tasks: [
        {
          id: 1,
          name: 'Implement Login',
          assignee: { name: 'John', color: 'primary' },
          priority: 'High',
          status: 'In Progress'
        },
        {
          id: 2,
          name: 'Design Homepage',
          assignee: { name: 'Jane', color: 'success' },
          priority: 'Medium',
          status: 'Completed'
        },
        {
          id: 3,
          name: 'Fix Bugs',
          assignee: { name: 'Bob', color: 'warning' },
          priority: 'Low',
          status: 'Pending'
        }
      ]
    }
  },

  methods: {
    restoreChips() {
      this.closableChips.forEach(chip => {
        chip.visible = true
      })
    },

    simulateLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },

    getPriorityColor(priority: string): string {
      switch (priority.toLowerCase()) {
        case 'high':
          return 'error'
        case 'medium':
          return 'warning'
        case 'low':
          return 'success'
        default:
          return 'default'
      }
    },

    getStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'success'
        case 'in progress':
          return 'info'
        case 'pending':
          return 'warning'
        default:
          return 'default'
      }
    },

    getStatusIcon(status: string): string {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'mdi-check-circle'
        case 'in progress':
          return 'mdi-progress-clock'
        case 'pending':
          return 'mdi-clock-outline'
        default:
          return 'mdi-help-circle'
      }
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

.gap-4 {
  gap: 1rem;
}

.custom-chip {
  font-weight: 500;
}
</style>