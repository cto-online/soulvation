<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Pagination -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
            <span>Basic Pagination</span>
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
              :items-per-page="itemsPerPage"
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

              <template v-slot:bottom>
                <div class="d-flex align-center justify-space-between pa-4">
                  <v-select
                    v-model="itemsPerPage"
                    :items="[5, 10, 15, 20]"
                    label="Items per page"
                    density="compact"
                    hide-details
                    style="max-width: 150px"
                  ></v-select>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Pagination -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Pagination</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="projectHeaders"
              :items="projectItems"
              :items-per-page="customItemsPerPage"
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

              <template v-slot:bottom>
                <div class="d-flex align-center justify-space-between pa-4">
                  <div class="d-flex align-center">
                    <span class="me-4">Items per page:</span>
                    <v-btn-group>
                      <v-btn
                        v-for="size in [5, 10, 15]"
                        :key="size"
                        :color="customItemsPerPage === size ? 'primary' : undefined"
                        variant="outlined"
                        @click="customItemsPerPage = size"
                      >
                        {{ size }}
                      </v-btn>
                    </v-btn-group>
                  </div>
                  <div class="d-flex align-center">
                    <span class="me-4">Page {{ currentPage }} of {{ pageCount }}</span>
                    <v-pagination
                      v-model="currentPage"
                      :length="pageCount"
                      :total-visible="7"
                    ></v-pagination>
                  </div>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Server Pagination -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Server Pagination</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="serverHeaders"
              :items="serverItems"
              :items-per-page="serverItemsPerPage"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:item.lastActive="{ item }">
                {{ formatDate(item.lastActive) }}
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:bottom>
                <div class="d-flex align-center justify-space-between pa-4">
                  <div class="d-flex align-center">
                    <span class="me-4">Total Items: {{ totalItems }}</span>
                    <v-select
                      v-model="serverItemsPerPage"
                      :items="[5, 10, 20]"
                      label="Items per page"
                      density="compact"
                      hide-details
                      style="max-width: 150px"
                      @update:model-value="loadServerItems"
                    ></v-select>
                  </div>
                  <v-pagination
                    v-model="serverPage"
                    :length="Math.ceil(totalItems / serverItemsPerPage)"
                    :total-visible="7"
                    @update:model-value="loadServerItems"
                  ></v-pagination>
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
  name: 'Pagination',

  data() {
    return {
      search: '',
      itemsPerPage: 10,
      customItemsPerPage: 5,
      currentPage: 1,
      serverItemsPerPage: 5,
      serverPage: 1,
      loading: false,
      totalItems: 0,
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
      serverHeaders: [
        {
          title: 'Name',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Email', key: 'email', sortable: false },
        { title: 'Role', key: 'role', sortable: false },
        { title: 'Status', key: 'status', sortable: false },
        { title: 'Last Active', key: 'lastActive', sortable: false }
      ],
      items: Array.from({ length: 25 }, (_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'User',
        status: i % 4 === 0 ? 'Inactive' : 'Active'
      })),
      projectItems: Array.from({ length: 20 }, (_, i) => ({
        name: `Project ${i + 1}`,
        client: `Client ${i + 1}`,
        budget: Math.floor(Math.random() * 50000) + 5000,
        status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Planning',
        progress: Math.floor(Math.random() * 100)
      })),
      serverItems: []
    }
  },

  computed: {
    pageCount(): number {
      return Math.ceil(this.projectItems.length / this.customItemsPerPage)
    }
  },

  mounted() {
    this.loadServerItems()
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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    async loadServerItems() {
      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Generate mock data
        const start = (this.serverPage - 1) * this.serverItemsPerPage
        const totalItems = 100
        this.totalItems = totalItems

        this.serverItems = Array.from({ length: this.serverItemsPerPage }, (_, i) => {
          const index = start + i
          if (index >= totalItems) return null
          return {
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'User',
            status: index % 4 === 0 ? 'Inactive' : 'Active',
            lastActive: new Date(Date.now() - Math.random() * 10000000000).toISOString()
          }
        }).filter(Boolean)
      } finally {
        this.loading = false
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
</style>