<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Custom Headers Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
            <span>Custom Headers Table</span>
            <v-text-field
              v-model="search"
              append-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              density="compact"
              style="max-width: 300px"
            ></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="customHeaders"
              :items="items"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:header.name="{ column }">
                <v-icon color="primary" class="mr-2">mdi-account</v-icon>
                {{ column.title }}
              </template>

              <template v-slot:header.email="{ column }">
                <v-icon color="primary" class="mr-2">mdi-email</v-icon>
                {{ column.title }}
              </template>

              <template v-slot:header.role="{ column }">
                <v-icon color="primary" class="mr-2">mdi-shield-account</v-icon>
                {{ column.title }}
              </template>

              <template v-slot:header.status="{ column }">
                <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
                {{ column.title }}
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Grouped Headers Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Grouped Headers Table</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="groupedHeaders"
              :items="projectItems"
              class="elevation-1"
            >
              <template v-slot:item.budget="{ item }">
                ${{ item.budget }}
              </template>

              <template v-slot:item.revenue="{ item }">
                ${{ item.revenue }}
              </template>

              <template v-slot:item.profit="{ item }">
                <span :class="item.profit >= 0 ? 'text-success' : 'text-error'">
                  ${{ Math.abs(item.profit) }}
                </span>
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getProjectStatusColor(item.status)"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.completion="{ item }">
                <v-progress-linear
                  :model-value="item.completion"
                  :color="getProgressColor(item.completion)"
                  height="6"
                  rounded
                ></v-progress-linear>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multi-Sort Headers -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Multi-Sort Headers</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="multiSortHeaders"
              :items="employeeItems"
              multi-sort
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

              <template v-slot:item.experience="{ item }">
                {{ item.experience }} years
              </template>

              <template v-slot:bottom>
                <div class="pa-4">
                  <v-alert
                    type="info"
                    variant="tonal"
                    class="mb-0"
                  >
                    Hold shift while clicking headers to sort by multiple columns
                  </v-alert>
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
  name: 'HeaderTables',

  data() {
    return {
      search: '',
      customHeaders: [
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Email', key: 'email', sortable: true },
        { title: 'Role', key: 'role', sortable: true },
        { title: 'Status', key: 'status', sortable: true }
      ],
      groupedHeaders: [
        {
          title: 'Project Details',
          key: 'details',
          children: [
            { title: 'Project', key: 'project', sortable: true },
            { title: 'Client', key: 'client', sortable: true }
          ],
        },
        {
          title: 'Financial',
          key: 'financial',
          children: [
            { title: 'Budget', key: 'budget', sortable: true },
            { title: 'Revenue', key: 'revenue', sortable: true },
            { title: 'Profit', key: 'profit', sortable: true }
          ],
        },
        {
          title: 'Progress',
          key: 'progress',
          children: [
            { title: 'Status', key: 'status', sortable: true },
            { title: 'Completion', key: 'completion', sortable: true }
          ],
        }
      ],
      multiSortHeaders: [
        { title: 'Employee', key: 'name', sortable: true },
        { title: 'Department', key: 'department', sortable: true },
        { title: 'Salary', key: 'salary', sortable: true },
        { title: 'Performance', key: 'performance', sortable: true },
        { title: 'Experience', key: 'experience', sortable: true }
      ],
      items: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Editor',
          status: 'Active'
        },
        {
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive'
        }
      ],
      projectItems: [
        {
          project: 'Website Redesign',
          client: 'Tech Corp',
          budget: 15000,
          revenue: 18000,
          profit: 3000,
          status: 'In Progress',
          completion: 65
        },
        {
          project: 'Mobile App',
          client: 'StartUp Inc',
          budget: 25000,
          revenue: 22000,
          profit: -3000,
          status: 'Completed',
          completion: 100
        },
        {
          project: 'E-commerce Platform',
          client: 'Retail Co',
          budget: 35000,
          revenue: 40000,
          profit: 5000,
          status: 'Planning',
          completion: 25
        }
      ],
      employeeItems: [
        {
          name: 'John Doe',
          department: 'Engineering',
          salary: 85000,
          performance: 4.5,
          experience: 5
        },
        {
          name: 'Jane Smith',
          department: 'Design',
          salary: 75000,
          performance: 5,
          experience: 3
        },
        {
          name: 'Bob Wilson',
          department: 'Marketing',
          salary: 65000,
          performance: 3.5,
          experience: 2
        },
        {
          name: 'Alice Brown',
          department: 'Engineering',
          salary: 90000,
          performance: 4,
          experience: 6
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
          return 'default'
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

.text-success {
  color: rgb(var(--v-theme-success));
}

.text-error {
  color: rgb(var(--v-theme-error));
}
</style>