<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Custom Header Slots -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Header Slots</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              class="elevation-1"
            >
              <template v-slot:header.name>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                  Employee Name
                </div>
              </template>

              <template v-slot:header.department>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-office-building</v-icon>
                  Department
                </div>
              </template>

              <template v-slot:header.salary>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-currency-usd</v-icon>
                  Annual Salary
                </div>
              </template>

              <template v-slot:header.performance>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-star</v-icon>
                  Performance
                </div>
              </template>

              <template v-slot:item.salary="{ item }">
                ${{ item.salary.toLocaleString() }}
              </template>

              <template v-slot:item.performance="{ item }">
                <v-rating
                  v-model="item.performance"
                  density="compact"
                  readonly
                  half-increments
                ></v-rating>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Item Slots -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Item Slots</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="projectHeaders"
              :items="projectItems"
              class="elevation-1"
            >
              <template v-slot:item.name="{ item }">
                <div class="d-flex align-center">
                  <v-avatar
                    :color="getProjectColor(item.type)"
                    size="32"
                    class="mr-2"
                  >
                    <v-icon color="white">{{ getProjectIcon(item.type) }}</v-icon>
                  </v-avatar>
                  <div>
                    <div class="font-weight-medium">{{ item.name }}</div>
                    <div class="text-caption text-medium-emphasis">{{ item.type }}</div>
                  </div>
                </div>
              </template>

              <template v-slot:item.team="{ item }">
                <v-avatar-group max="3">
                  <v-avatar
                    v-for="member in item.team"
                    :key="member.id"
                    :color="member.color"
                    size="32"
                  >
                    {{ member.initials }}
                  </v-avatar>
                </v-avatar-group>
              </template>

              <template v-slot:item.deadline="{ item }">
                <div class="d-flex align-center">
                  <v-icon
                    :color="isDeadlineNear(item.deadline) ? 'warning' : 'success'"
                    class="mr-2"
                  >
                    {{ isDeadlineNear(item.deadline) ? 'mdi-clock-alert' : 'mdi-clock' }}
                  </v-icon>
                  {{ formatDate(item.deadline) }}
                </div>
              </template>

              <template v-slot:item.progress="{ item }">
                <div>
                  <div class="d-flex justify-space-between mb-1">
                    <span class="text-caption">Progress</span>
                    <span class="text-caption">{{ item.progress }}%</span>
                  </div>
                  <v-progress-linear
                    :model-value="item.progress"
                    :color="getProgressColor(item.progress)"
                    height="6"
                    rounded
                  ></v-progress-linear>
                </div>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      variant="text"
                      size="small"
                      v-bind="props"
                    ></v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="action in actions"
                      :key="action.text"
                      :value="action"
                      @click="handleAction(action.value, item)"
                    >
                      <template v-slot:prepend>
                        <v-icon :color="action.color">{{ action.icon }}</v-icon>
                      </template>
                      <v-list-item-title>{{ action.text }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Loading and Empty States -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Custom States</span>
            <v-btn
              color="primary"
              @click="toggleLoading"
            >
              Toggle Loading
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="loading ? [] : items"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:loading>
                <v-skeleton-loader
                  type="table-row-divider@6"
                ></v-skeleton-loader>
              </template>

              <template v-slot:no-data>
                <div class="d-flex flex-column align-center pa-4">
                  <v-icon
                    size="64"
                    color="primary"
                    class="mb-4"
                  >
                    mdi-database-off
                  </v-icon>
                  <div class="text-h6 mb-2">No Data Available</div>
                  <div class="text-body-2 text-medium-emphasis mb-4">
                    There are no records to display at the moment.
                  </div>
                  <v-btn
                    color="primary"
                    @click="loading = false"
                  >
                    Refresh Data
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Slots',

  data() {
    return {
      loading: false,
      headers: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Department', key: 'department', sortable: true },
        { title: 'Salary', key: 'salary', sortable: true },
        { title: 'Performance', key: 'performance', sortable: true }
      ],
      projectHeaders: [
        { title: 'Project', key: 'name', sortable: true },
        { title: 'Team', key: 'team', sortable: false },
        { title: 'Deadline', key: 'deadline', sortable: true },
        { title: 'Progress', key: 'progress', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      items: [
        {
          name: 'John Doe',
          department: 'Engineering',
          salary: 85000,
          performance: 4.5
        },
        {
          name: 'Jane Smith',
          department: 'Design',
          salary: 75000,
          performance: 5
        },
        {
          name: 'Bob Wilson',
          department: 'Marketing',
          salary: 65000,
          performance: 3.5
        }
      ],
      projectItems: [
        {
          name: 'Website Redesign',
          type: 'Web Development',
          team: [
            { id: 1, initials: 'JD', color: 'primary' },
            { id: 2, initials: 'JS', color: 'success' },
            { id: 3, initials: 'BW', color: 'warning' }
          ],
          deadline: '2024-03-15',
          progress: 65
        },
        {
          name: 'Mobile App',
          type: 'Mobile Development',
          team: [
            { id: 2, initials: 'JS', color: 'success' },
            { id: 4, initials: 'AB', color: 'error' }
          ],
          deadline: '2024-05-01',
          progress: 15
        },
        {
          name: 'E-commerce Platform',
          type: 'Web Development',
          team: [
            { id: 1, initials: 'JD', color: 'primary' },
            { id: 3, initials: 'BW', color: 'warning' },
            { id: 4, initials: 'AB', color: 'error' }
          ],
          deadline: '2024-04-30',
          progress: 90
        }
      ],
      actions: [
        { text: 'Edit', value: 'edit', icon: 'mdi-pencil', color: 'primary' },
        { text: 'Delete', value: 'delete', icon: 'mdi-delete', color: 'error' },
        { text: 'Share', value: 'share', icon: 'mdi-share-variant', color: 'info' }
      ]
    }
  },

  methods: {
    getProjectColor(type: string): string {
      switch (type) {
        case 'Web Development':
          return 'primary'
        case 'Mobile Development':
          return 'secondary'
        default:
          return 'default'
      }
    },

    getProjectIcon(type: string): string {
      switch (type) {
        case 'Web Development':
          return 'mdi-web'
        case 'Mobile Development':
          return 'mdi-cellphone'
        default:
          return 'mdi-code-tags'
      }
    },

    getProgressColor(progress: number): string {
      if (progress === 100) return 'success'
      if (progress >= 70) return 'info'
      if (progress >= 30) return 'warning'
      return 'error'
    },

    formatDate(date: string): string {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    isDeadlineNear(deadline: string): boolean {
      const daysUntilDeadline = Math.ceil(
        (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
      return daysUntilDeadline <= 14
    },

    handleAction(action: string, item: any) {
      console.log(`Action ${action} triggered for item:`, item)
    },

    toggleLoading() {
      this.loading = !this.loading
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
</style>