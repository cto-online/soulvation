<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Data Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
            <span>Basic Data Table</span>
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

              <template v-slot:item.progress="{ item }">
                <v-progress-linear
                  :model-value="item.progress"
                  :color="getProgressColor(item.progress)"
                  height="6"
                  rounded
                ></v-progress-linear>
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

      <!-- Expandable Data Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Expandable Data Table</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="expandableHeaders"
              :items="expandableItems"
              :items-per-page="5"
              item-value="name"
              show-expand
              class="elevation-1"
            >
              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                  <td :colspan="columns.length">
                    <v-container class="pa-4">
                      <v-row>
                        <v-col cols="12" md="6">
                          <strong>Description:</strong>
                          <p class="mt-2">{{ item.description }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <strong>Additional Details:</strong>
                          <v-list density="compact" class="mt-2">
                            <v-list-item>
                              <v-list-item-title>Created Date: {{ item.createdDate }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>Last Modified: {{ item.lastModified }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>Category: {{ item.category }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
              </template>
            </v-data-table>
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
                  v-model="editedItem.status"
                  :items="['Active', 'Pending', 'Inactive']"
                  label="Status"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.progress"
                  type="number"
                  label="Progress"
                  min="0"
                  max="100"
                ></v-text-field>
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
  name: 'BasicTable',

  data() {
    return {
      search: '',
      dialog: false,
      itemsPerPage: 10,
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Email', key: 'email', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Progress', key: 'progress', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      expandableHeaders: [
        {
          title: 'Project Name',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        { title: 'Client', key: 'client', sortable: true },
        { title: 'Budget', key: 'budget', sortable: true },
        { title: 'Status', key: 'status', sortable: true }
      ],
      items: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          status: 'Active',
          progress: 75
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          status: 'Pending',
          progress: 45
        },
        {
          name: 'Bob Wilson',
          email: 'bob@example.com',
          status: 'Inactive',
          progress: 15
        },
        {
          name: 'Alice Brown',
          email: 'alice@example.com',
          status: 'Active',
          progress: 90
        },
        {
          name: 'Charlie Davis',
          email: 'charlie@example.com',
          status: 'Active',
          progress: 60
        }
      ],
      expandableItems: [
        {
          name: 'Website Redesign',
          client: 'Tech Corp',
          budget: '$15,000',
          status: 'In Progress',
          description: 'Complete redesign of corporate website with modern UI/UX principles',
          createdDate: '2024-01-15',
          lastModified: '2024-02-01',
          category: 'Web Development'
        },
        {
          name: 'Mobile App Development',
          client: 'StartUp Inc',
          budget: '$25,000',
          status: 'Planning',
          description: 'Native mobile application for iOS and Android platforms',
          createdDate: '2024-01-20',
          lastModified: '2024-02-05',
          category: 'Mobile Development'
        },
        {
          name: 'E-commerce Platform',
          client: 'Retail Co',
          budget: '$35,000',
          status: 'Completed',
          description: 'Full-featured e-commerce solution with payment integration',
          createdDate: '2023-12-01',
          lastModified: '2024-01-15',
          category: 'E-commerce'
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        status: '',
        progress: 0
      },
      defaultItem: {
        name: '',
        email: '',
        status: 'Active',
        progress: 0
      }
    }
  },

  methods: {
    getStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'active':
          return 'success'
        case 'pending':
          return 'warning'
        case 'inactive':
          return 'error'
        default:
          return 'default'
      }
    },

    getProgressColor(progress: number): string {
      if (progress >= 70) return 'success'
      if (progress >= 40) return 'warning'
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