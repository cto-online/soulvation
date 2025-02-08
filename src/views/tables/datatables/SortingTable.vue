<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Sorting -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Sorting</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              :sort-by="[{ key: 'name', order: 'asc' }]"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.lastActive="{ item }">
                {{ formatDate(item.lastActive) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multi-Sort -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Multi-Sort Table</v-card-title>
          <v-card-text>
            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
            >
              Hold shift while clicking headers to sort by multiple columns
            </v-alert>

            <v-data-table
              :headers="projectHeaders"
              :items="projectItems"
              multi-sort
              class="elevation-1"
            >
              <template v-slot:item.budget="{ item }">
                ${{ item.budget.toLocaleString() }}
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getProjectStatusColor(item.status)"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.progress="{ item }">
                <v-progress-linear
                  :model-value="item.progress"
                  :color="getProgressColor(item.progress)"
                  height="6"
                  rounded
                ></v-progress-linear>
              </template>

              <template v-slot:item.startDate="{ item }">
                {{ formatDate(item.startDate) }}
              </template>

              <template v-slot:item.endDate="{ item }">
                {{ formatDate(item.endDate) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Sort -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Sort Table</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="customHeaders"
              :items="employeeItems"
              :custom-sort="customSort"
              class="elevation-1"
            >
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

              <template v-slot:item.skills="{ item }">
                <v-chip-group>
                  <v-chip
                    v-for="skill in item.skills"
                    :key="skill"
                    size="small"
                    color="primary"
                    variant="outlined"
                  >
                    {{ skill }}
                  </v-chip>
                </v-chip-group>
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
  name: 'SortingTable',

  data() {
    return {
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Email', key: 'email', sortable: true },
        { title: 'Role', key: 'role', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Last Active', key: 'lastActive', sortable: true }
      ],
      projectHeaders: [
        {
          title: 'Project',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Client', key: 'client', sortable: true },
        { title: 'Budget', key: 'budget', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Progress', key: 'progress', sortable: true },
        { title: 'Start Date', key: 'startDate', sortable: true },
        { title: 'End Date', key: 'endDate', sortable: true }
      ],
      customHeaders: [
        {
          title: 'Employee',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Department', key: 'department', sortable: true },
        { title: 'Salary', key: 'salary', sortable: true },
        { title: 'Performance', key: 'performance', sortable: true },
        { title: 'Skills', key: 'skills', sortable: true }
      ],
      items: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active',
          lastActive: '2024-02-08T10:30:00'
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Editor',
          status: 'Active',
          lastActive: '2024-02-08T09:15:00'
        },
        {
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive',
          lastActive: '2024-02-07T16:45:00'
        }
      ],
      projectItems: [
        {
          name: 'Website Redesign',
          client: 'Tech Corp',
          budget: 15000,
          status: 'In Progress',
          progress: 65,
          startDate: '2024-01-15',
          endDate: '2024-03-15'
        },
        {
          name: 'Mobile App',
          client: 'StartUp Inc',
          budget: 25000,
          status: 'Planning',
          progress: 15,
          startDate: '2024-02-01',
          endDate: '2024-05-01'
        },
        {
          name: 'E-commerce Platform',
          client: 'Retail Co',
          budget: 35000,
          status: 'Completed',
          progress: 100,
          startDate: '2023-11-01',
          endDate: '2024-01-31'
        }
      ],
      employeeItems: [
        {
          name: 'John Doe',
          department: 'Engineering',
          salary: 85000,
          performance: 4.5,
          skills: ['JavaScript', 'Vue.js', 'Node.js']
        },
        {
          name: 'Jane Smith',
          department: 'Design',
          salary: 75000,
          performance: 5,
          skills: ['UI/UX', 'Figma', 'Adobe XD']
        },
        {
          name: 'Bob Wilson',
          department: 'Marketing',
          salary: 65000,
          performance: 3.5,
          skills: ['SEO', 'Content', 'Analytics']
        }
      ]
    }
  },

  methods: {
    getStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'active':
          return 'success'
        case 'inactive':
          return 'error'
        default:
          return 'warning'
      }
    },

    getProjectStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'success'
        case 'in progress':
          return 'info'
        case 'planning':
          return 'warning'
        default:
          return 'default'
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

    customSort(items: any[], sortBy: any[]): any[] {
      items.sort((a, b) => {
        for (const sort of sortBy) {
          if (sort.key === 'skills') {
            // Sort by number of skills first
            const diff = b.skills.length - a.skills.length
            if (diff !== 0) return sort.order === 'desc' ? diff : -diff
          } else {
            // Default sorting for other columns
            if (a[sort.key] < b[sort.key]) return sort.order === 'desc' ? 1 : -1
            if (a[sort.key] > b[sort.key]) return sort.order === 'desc' ? -1 : 1
          }
        }
        return 0
      })
      return items
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