<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Selection -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
            <span>Basic Selection</span>
            <v-btn
              color="error"
              :disabled="!selected.length"
              @click="deleteSelected"
            >
              Delete Selected ({{ selected.length }})
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="items"
              show-select
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

              <template v-slot:item.actions="{ item }">
                <v-icon
                  size="small"
                  class="me-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  size="small"
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Single Select -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Single Select with Details</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="8">
                <v-data-table
                  v-model="selectedProject"
                  :headers="projectHeaders"
                  :items="projectItems"
                  show-select
                  single-select
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
              </v-col>
              <v-col cols="12" md="4">
                <v-card variant="outlined" v-if="selectedProject.length">
                  <v-card-title>Selected Project Details</v-card-title>
                  <v-card-text>
                    <v-list density="compact">
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-folder</v-icon>
                        </template>
                        <v-list-item-title>{{ selectedProject[0].name }}</v-list-item-title>
                        <v-list-item-subtitle>Project Name</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-account</v-icon>
                        </template>
                        <v-list-item-title>{{ selectedProject[0].client }}</v-list-item-title>
                        <v-list-item-subtitle>Client</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-currency-usd</v-icon>
                        </template>
                        <v-list-item-title>${{ selectedProject[0].budget.toLocaleString() }}</v-list-item-title>
                        <v-list-item-subtitle>Budget</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-calendar</v-icon>
                        </template>
                        <v-list-item-title>{{ selectedProject[0].startDate }}</v-list-item-title>
                        <v-list-item-subtitle>Start Date</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon color="primary">mdi-calendar-check</v-icon>
                        </template>
                        <v-list-item-title>{{ selectedProject[0].endDate }}</v-list-item-title>
                        <v-list-item-subtitle>End Date</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>

                    <v-divider class="my-4"></v-divider>

                    <div class="text-body-2">Description:</div>
                    <p class="text-body-2 mt-2">{{ selectedProject[0].description }}</p>
                  </v-card-text>
                </v-card>
                <v-alert
                  v-else
                  type="info"
                  variant="tonal"
                >
                  Select a project to view details
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Item</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.role"
                  :items="roles"
                  label="Role"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.status"
                  :items="['Active', 'Pending', 'Inactive']"
                  label="Status"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            variant="text"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="saveItem"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Selectable',

  data() {
    return {
      selected: [],
      selectedProject: [],
      dialog: false,
      roles: ['Admin', 'Editor', 'User'],
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
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      projectHeaders: [
        {
          title: 'Project Name',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Client', key: 'client', sortable: true },
        { title: 'Budget', key: 'budget', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Progress', key: 'progress', sortable: true }
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
          name: 'Website Redesign',
          client: 'Tech Corp',
          budget: 15000,
          status: 'In Progress',
          progress: 65,
          startDate: '2024-01-15',
          endDate: '2024-03-15',
          description: 'Complete redesign of corporate website with modern UI/UX principles and improved functionality.'
        },
        {
          name: 'Mobile App Development',
          client: 'StartUp Inc',
          budget: 25000,
          status: 'Planning',
          progress: 15,
          startDate: '2024-02-01',
          endDate: '2024-05-01',
          description: 'Development of native mobile application for iOS and Android platforms with core features.'
        },
        {
          name: 'E-commerce Platform',
          client: 'Retail Co',
          budget: 35000,
          status: 'Completed',
          progress: 100,
          startDate: '2023-11-01',
          endDate: '2024-01-31',
          description: 'Full-featured e-commerce solution with payment integration and inventory management.'
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        role: '',
        status: ''
      },
      defaultItem: {
        name: '',
        email: '',
        role: 'User',
        status: 'Active'
      }
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

    editItem(item: any) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item: any) {
      const index = this.items.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        this.items.splice(index, 1)
      }
    },

    deleteSelected() {
      if (confirm(`Are you sure you want to delete ${this.selected.length} items?`)) {
        this.items = this.items.filter(item => !this.selected.includes(item))
        this.selected = []
      }
    },

    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    saveItem() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      }
      this.closeDialog()
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