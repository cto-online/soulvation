<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Default Height Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Default Height Table</v-card-title>
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
                <tr v-for="item in defaultData" :key="item.id">
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

      <!-- Custom Height Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Custom Height Table</span>
            <v-select
              v-model="selectedHeight"
              :items="heightOptions"
              label="Table Height"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 150px"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <div class="table-container">
              <v-table :height="selectedHeight">
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
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Auto Height Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Auto Height Table</span>
            <v-btn-group>
              <v-btn
                :color="showMore ? 'primary' : undefined"
                variant="outlined"
                @click="toggleRows"
              >
                {{ showMore ? 'Show Less' : 'Show More' }}
              </v-btn>
              <v-btn
                :color="dense ? 'primary' : undefined"
                variant="outlined"
                @click="dense = !dense"
              >
                {{ dense ? 'Normal' : 'Dense' }}
              </v-btn>
            </v-btn-group>
          </v-card-title>
          <v-card-text>
            <div class="table-container">
              <v-table :density="dense ? 'compact' : 'default'">
                <thead>
                  <tr>
                    <th class="text-left">Order ID</th>
                    <th class="text-left">Customer</th>
                    <th class="text-left">Product</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in displayedOrders" :key="item.id">
                    <td>#{{ item.orderId }}</td>
                    <td>{{ item.customer }}</td>
                    <td>{{ item.product }}</td>
                    <td>${{ item.price }}</td>
                    <td>
                      <v-chip
                        :color="getOrderStatusColor(item.status)"
                        size="small"
                      >
                        {{ item.status }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
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
  name: 'TableHeight',

  data() {
    return {
      selectedHeight: '300',
      heightOptions: [
        { title: 'Small (200px)', value: '200' },
        { title: 'Medium (300px)', value: '300' },
        { title: 'Large (400px)', value: '400' }
      ],
      showMore: false,
      dense: false,
      defaultData: [
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
        }
      ],
      projectData: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        project: `Project ${i + 1}`,
        client: `Client ${i + 1}`,
        budget: Math.floor(Math.random() * 50000) + 5000,
        status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Pending',
        progress: Math.floor(Math.random() * 100)
      })),
      orderData: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        orderId: `ORD${String(i + 1).padStart(3, '0')}`,
        customer: `Customer ${i + 1}`,
        product: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 500) + 50,
        status: i % 4 === 0 ? 'Delivered' : i % 4 === 1 ? 'Processing' : i % 4 === 2 ? 'Shipped' : 'Pending'
      }))
    }
  },

  computed: {
    displayedOrders() {
      return this.showMore ? this.orderData : this.orderData.slice(0, 5)
    }
  },

  methods: {
    toggleRows() {
      this.showMore = !this.showMore
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
    },

    getOrderStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'delivered':
          return 'success'
        case 'processing':
          return 'warning'
        case 'shipped':
          return 'info'
        case 'pending':
          return 'error'
        default:
          return 'default'
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

.table-container {
  border: 1px solid rgba(var(--v-border-color), 0.12);
  border-radius: 4px;
}
</style>