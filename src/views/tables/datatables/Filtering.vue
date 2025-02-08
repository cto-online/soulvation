<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Filtering -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
            <span>Basic Filtering</span>
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
              :headers="headers"
              :items="items"
              :search="search"
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
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Advanced Filtering -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Advanced Filtering</v-card-title>
          <v-card-text>
            <v-row class="mb-4">
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="filters.name"
                  label="Project Name"
                  density="compact"
                  hide-details
                  class="mb-2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="filters.status"
                  :items="['All', 'Completed', 'In Progress', 'Planning']"
                  label="Status"
                  density="compact"
                  hide-details
                  class="mb-2"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-range-slider
                  v-model="filters.budget"
                  :min="0"
                  :max="50000"
                  :step="5000"
                  label="Budget Range"
                  hide-details
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    ${{ filters.budget[0] }}
                  </template>
                  <template v-slot:append>
                    ${{ filters.budget[1] }}
                  </template>
                </v-range-slider>
              </v-col>
            </v-row>

            <v-data-table
              :headers="projectHeaders"
              :items="filteredProjects"
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
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Filtering -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Filtering</v-card-title>
          <v-card-text>
            <v-row class="mb-4">
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model="employeeFilters.name"
                  label="Employee Name"
                  density="compact"
                  hide-details
                  class="mb-2"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  v-model="employeeFilters.department"
                  :items="['All', 'Engineering', 'Design', 'Marketing']"
                  label="Department"
                  density="compact"
                  hide-details
                  class="mb-2"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  v-model="employeeFilters.skills"
                  :items="allSkills"
                  label="Skills"
                  multiple
                  chips
                  density="compact"
                  hide-details
                  class="mb-2"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-range-slider
                  v-model="employeeFilters.performance"
                  :min="0"
                  :max="5"
                  :step="0.5"
                  label="Performance Rating"
                  hide-details
                  class="mb-2"
                >
                  <template v-slot:prepend>
                    {{ employeeFilters.performance[0] }}
                  </template>
                  <template v-slot:append>
                    {{ employeeFilters.performance[1] }}
                  </template>
                </v-range-slider>
              </v-col>
            </v-row>

            <v-data-table
              :headers="employeeHeaders"
              :items="filteredEmployees"
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
  name: 'Filtering',

  data() {
    return {
      search: '',
      filters: {
        name: '',
        status: 'All',
        budget: [0, 50000]
      },
      employeeFilters: {
        name: '',
        department: 'All',
        skills: [],
        performance: [0, 5]
      },
      headers: [
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
        { title: 'Progress', key: 'progress', sortable: true }
      ],
      employeeHeaders: [
        {
          title: 'Employee',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Department', key: 'department', sortable: true },
        { title: 'Salary', key: 'salary', sortable: true },
        { title: 'Performance', key: 'performance', sortable: true },
        { title: 'Skills', key: 'skills', sortable: false }
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
      projectItems: Array.from({ length: 20 }, (_, i) => ({
        name: `Project ${i + 1}`,
        client: `Client ${i + 1}`,
        budget: Math.floor(Math.random() * 50000) + 5000,
        status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Planning',
        progress: Math.floor(Math.random() * 100)
      })),
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
        },
        {
          name: 'Alice Brown',
          department: 'Engineering',
          salary: 90000,
          performance: 4,
          skills: ['Python', 'Django', 'PostgreSQL']
        }
      ]
    }
  },

  computed: {
    filteredProjects() {
      return this.projectItems.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(this.filters.name.toLowerCase())
        const statusMatch = this.filters.status === 'All' || item.status === this.filters.status
        const budgetMatch = item.budget >= this.filters.budget[0] && item.budget <= this.filters.budget[1]
        return nameMatch && statusMatch && budgetMatch
      })
    },

    filteredEmployees() {
      return this.employeeItems.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(this.employeeFilters.name.toLowerCase())
        const departmentMatch = this.employeeFilters.department === 'All' || 
          item.department === this.employeeFilters.department
        const performanceMatch = item.performance >= this.employeeFilters.performance[0] && 
          item.performance <= this.employeeFilters.performance[1]
        const skillsMatch = this.employeeFilters.skills.length === 0 || 
          this.employeeFilters.skills.some(skill => item.skills.includes(skill))
        return nameMatch && departmentMatch && performanceMatch && skillsMatch
      })
    },

    allSkills() {
      const skillSet = new Set<string>()
      this.employeeItems.forEach(item => {
        item.skills.forEach(skill => skillSet.add(skill))
      })
      return Array.from(skillSet)
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
</style>