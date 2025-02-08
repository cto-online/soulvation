<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Fixed Header Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Fixed Header Table</v-card-title>
          <v-card-text>
            <div class="table-container">
              <v-table fixed-header height="400px">
                <thead>
                  <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Role</th>
                    <th class="text-left">Status</th>
                    <th class="text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tableData" :key="item.id">
                    <td>#{{ item.id }}</td>
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
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Fixed Header with Search -->
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <span>Fixed Header with Search</span>
              <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                density="compact"
                style="max-width: 300px"
              ></v-text-field>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="table-container">
              <v-table fixed-header height="400px">
                <thead>
                  <tr>
                    <th
                      v-for="header in headers"
                      :key="header.value"
                      class="text-left"
                      :class="{ 'sortable': header.sortable }"
                      @click="header.sortable && sort(header.value)"
                    >
                      {{ header.text }}
                      <v-icon
                        v-if="header.sortable"
                        :icon="getSortIcon(header.value)"
                        size="small"
                      ></v-icon>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredData" :key="item.id">
                    <td>#{{ item.id }}</td>
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
                    <td>{{ item.lastLogin }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Fixed Header with Pagination -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Fixed Header with Pagination</v-card-title>
          <v-card-text>
            <div class="table-container">
              <v-table fixed-header height="400px">
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
                  <tr v-for="item in paginatedData" :key="item.id">
                    <td>{{ item.project }}</td>
                    <td>{{ item.client }}</td>
                    <td>${{ item.budget }}</td>
                    <td>
                      <v-chip
                        :color="getStatusColor(item.status)"
                        size="small"
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
            </div>
            <div class="d-flex align-center justify-space-between mt-4">
              <v-select
                v-model="itemsPerPage"
                :items="[5, 10, 15]"
                label="Items per page"
                density="compact"
                hide-details
                style="width: 100px"
              ></v-select>
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="7"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableHeaderFixed',

  data() {
    return {
      search: '',
      sortBy: 'name',
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      headers: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Role', value: 'role', sortable: true },
        { text: 'Status', value: 'status', sortable: true },
        { text: 'Last Login', value: 'lastLogin', sortable: true }
      ],
      tableData: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'User',
        status: i % 4 === 0 ? 'Inactive' : 'Active',
        lastLogin: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
      })),
      projectData: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        project: `Project ${i + 1}`,
        client: `Client ${i + 1}`,
        budget: Math.floor(Math.random() * 50000) + 5000,
        status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Pending',
        progress: Math.floor(Math.random() * 100)
      }))
    }
  },

  computed: {
    filteredData() {
      let data = [...this.tableData]
      
      if (this.search) {
        const searchLower = this.search.toLowerCase()
        data = data.filter(item =>
          Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchLower)
          )
        )
      }

      if (this.sortBy) {
        data.sort((a, b) => {
          const aVal = a[this.sortBy]
          const bVal = b[this.sortBy]
          const modifier = this.sortDesc ? -1 : 1

          if (typeof aVal === 'string') {
            return aVal.localeCompare(bVal) * modifier
          }
          return (aVal - bVal) * modifier
        })
      }

      return data
    },

    paginatedData() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.projectData.slice(start, end)
    },

    pageCount() {
      return Math.ceil(this.projectData.length / this.itemsPerPage)
    }
  },

  methods: {
    sort(column: string) {
      if (this.sortBy === column) {
        this.sortDesc = !this.sortDesc
      } else {
        this.sortBy = column
        this.sortDesc = false
      }
    },

    getSortIcon(column: string) {
      if (this.sortBy !== column) return 'mdi-sort'
      return this.sortDesc ? 'mdi-sort-descending' : 'mdi-sort-ascending'
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

.table-container {
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 4px;
}

.sortable {
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: rgba(var(--v-theme-on-surface), 0.04);
  }
}
</style>