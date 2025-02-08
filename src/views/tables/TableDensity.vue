<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Default Density -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Default Density</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.role }}</td>
                  <td>
                    <v-chip
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      color="primary"
                      class="mr-2"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Comfortable Density -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Comfortable Density</v-card-title>
          <v-card-text>
            <v-table density="comfortable">
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.role }}</td>
                  <td>
                    <v-chip
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      color="primary"
                      class="mr-2"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Compact Density -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Compact Density</v-card-title>
          <v-card-text>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.role }}</td>
                  <td>
                    <v-chip
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="x-small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="x-small"
                      color="primary"
                      class="mr-2"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="x-small"
                      color="error"
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Density with Details -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Density with Details</span>
            <v-select
              v-model="selectedDensity"
              :items="densityOptions"
              label="Density"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 150px"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <v-table :density="selectedDensity">
              <thead>
                <tr>
                  <th class="text-left">Project</th>
                  <th class="text-left">Client</th>
                  <th class="text-left">Budget</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in projectData" :key="item.id">
                  <td>{{ item.project }}</td>
                  <td>{{ item.client }}</td>
                  <td>${{ item.budget }}</td>
                  <td>
                    <v-chip
                      :color="getStatusColor(item.status)"
                      :size="selectedDensity === 'compact' ? 'x-small' : 'small'"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td style="width: 200px">
                    <v-progress-linear
                      :model-value="item.progress"
                      :color="getProgressColor(item.progress)"
                      height="4"
                      rounded
                    ></v-progress-linear>
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
  name: 'TableDensity',

  data() {
    return {
      selectedDensity: 'default',
      densityOptions: [
        { title: 'Default', value: 'default' },
        { title: 'Comfortable', value: 'comfortable' },
        { title: 'Compact', value: 'compact' }
      ],
      tableData: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Editor',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive'
        },
        {
          id: 4,
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'Editor',
          status: 'Active'
        }
      ],
      projectData: [
        {
          id: 1,
          project: 'Website Redesign',
          client: 'Tech Corp',
          budget: 15000,
          status: 'In Progress',
          progress: 65
        },
        {
          id: 2,
          project: 'Mobile App',
          client: 'Design Studio',
          budget: 25000,
          status: 'Completed',
          progress: 100
        },
        {
          id: 3,
          project: 'Database Migration',
          client: 'Data Inc',
          budget: 8000,
          status: 'Pending',
          progress: 35
        },
        {
          id: 4,
          project: 'Marketing Campaign',
          client: 'Ad Agency',
          budget: 12000,
          status: 'In Progress',
          progress: 75
        }
      ]
    }
  },

  methods: {
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
</style>