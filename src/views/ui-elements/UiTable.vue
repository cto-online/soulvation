<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Table</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basicItems" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.role }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Table Variants -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Table Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-table density="compact">
                <caption>Compact Table</caption>
                <thead>
                  <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in basicItems.slice(0, 3)" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.role }}</td>
                  </tr>
                </tbody>
              </v-table>

              <v-table density="comfortable">
                <caption>Comfortable Table</caption>
                <thead>
                  <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in basicItems.slice(0, 3)" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.role }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Interactive Table</span>
            <v-text-field
              v-model="search"
              label="Search"
              append-inner-icon="mdi-magnify"
              density="compact"
              hide-details
              style="max-width: 300px"
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="dataHeaders"
              :items="dataItems"
              :search="search"
              :items-per-page="5"
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
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  size="small"
                  color="primary"
                  @click="editItem(item)"
                ></v-btn>
                <v-btn
                  icon="mdi-delete"
                  variant="text"
                  size="small"
                  color="error"
                  @click="deleteItem(item)"
                ></v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Table</v-card-title>
          <v-card-text>
            <v-table fixed-header height="300px">
              <thead>
                <tr>
                  <th class="text-left">
                    Product
                  </th>
                  <th class="text-left">
                    Sales
                  </th>
                  <th class="text-left">
                    Progress
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-left">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in productItems"
                  :key="item.name"
                >
                  <td>
                    <div class="d-flex align-center">
                      <v-avatar
                        :color="item.color"
                        size="32"
                        class="me-2"
                      >
                        <v-icon color="white">{{ item.icon }}</v-icon>
                      </v-avatar>
                      <div>
                        <div class="font-weight-medium">{{ item.name }}</div>
                        <div class="text-caption">{{ item.category }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="font-weight-medium">${{ item.sales }}</div>
                    <div class="text-caption">{{ item.period }}</div>
                  </td>
                  <td>
                    <v-progress-linear
                      :model-value="item.progress"
                      :color="item.color"
                      height="8"
                      rounded
                    ></v-progress-linear>
                  </td>
                  <td>
                    <v-chip
                      :color="item.statusColor"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>
                    <v-sparkline
                      :value="item.trend"
                      :color="item.trendColor"
                      :line-width="2"
                      :height="30"
                      :padding="4"
                      smooth
                    ></v-sparkline>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>Edit Item</v-card-title>
        <v-card-text>
          <v-form v-model="editFormValid" @submit.prevent="saveEdit">
            <v-text-field
              v-model="editedItem.name"
              label="Name"
              :rules="[v => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.email"
              label="Email"
              :rules="[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
              ]"
            ></v-text-field>
            <v-select
              v-model="editedItem.status"
              :items="['Active', 'Pending', 'Inactive']"
              label="Status"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="editDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!editFormValid"
            @click="saveEdit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Delete Item</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiTable',

  data() {
    return {
      headers: ['ID', 'Name', 'Email', 'Role'],
      basicItems: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' }
      ],
      search: '',
      dataHeaders: [
        { title: 'Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Status', key: 'status' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      dataItems: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive' }
      ],
      productItems: [
        {
          name: 'Analytics Dashboard',
          category: 'Web App',
          sales: '12,450',
          period: 'Last month',
          progress: 75,
          status: 'Active',
          statusColor: 'success',
          color: 'primary',
          icon: 'mdi-chart-bar',
          trend: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
          trendColor: 'success'
        },
        {
          name: 'Mobile App',
          category: 'Application',
          sales: '23,850',
          period: 'Last month',
          progress: 90,
          status: 'In Progress',
          statusColor: 'warning',
          color: 'error',
          icon: 'mdi-cellphone',
          trend: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
          trendColor: 'warning'
        },
        {
          name: 'Landing Page',
          category: 'Website',
          sales: '8,650',
          period: 'Last month',
          progress: 45,
          status: 'Pending',
          statusColor: 'info',
          color: 'success',
          icon: 'mdi-web',
          trend: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
          trendColor: 'info'
        }
      ],
      editDialog: false,
      deleteDialog: false,
      editFormValid: true,
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        email: '',
        status: ''
      }
    }
  },

  methods: {
    getStatusColor(status: string): string {
      switch (status) {
        case 'Active': return 'success'
        case 'Pending': return 'warning'
        case 'Inactive': return 'error'
        default: return 'grey'
      }
    },

    editItem(item: any) {
      this.editedIndex = this.dataItems.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editDialog = true
    },

    deleteItem(item: any) {
      this.editedIndex = this.dataItems.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deleteDialog = true
    },

    saveEdit() {
      if (this.editFormValid) {
        Object.assign(this.dataItems[this.editedIndex], this.editedItem)
        this.editDialog = false
      }
    },

    confirmDelete() {
      this.dataItems.splice(this.editedIndex, 1)
      this.deleteDialog = false
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