<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Dark Table -->
      <v-col cols="12">
        <v-card theme="dark">
          <v-card-title>Basic Dark Table</v-card-title>
          <v-card-text>
            <v-table theme="dark">
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
                <tr v-for="item in basicData" :key="item.id">
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

      <!-- Striped Dark Table -->
      <v-col cols="12">
        <v-card theme="dark">
          <v-card-title>Striped Dark Table</v-card-title>
          <v-card-text>
            <v-table theme="dark">
              <thead>
                <tr>
                  <th class="text-left">Project</th>
                  <th class="text-left">Budget</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Users</th>
                  <th class="text-left">Completion</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in stripedData"
                  :key="item.id"
                  :class="{ 'striped': index % 2 }"
                >
                  <td>{{ item.project }}</td>
                  <td>${{ item.budget }}</td>
                  <td>
                    <v-chip
                      :color="getStatusColor(item.status)"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>
                    <v-avatar-group max="3">
                      <v-avatar
                        v-for="(user, i) in item.users"
                        :key="i"
                        size="30"
                        :color="user.color"
                      >
                        {{ user.initials }}
                      </v-avatar>
                    </v-avatar-group>
                  </td>
                  <td>
                    <v-progress-linear
                      :model-value="item.completion"
                      :color="getCompletionColor(item.completion)"
                      height="6"
                      rounded
                    ></v-progress-linear>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bordered Dark Table -->
      <v-col cols="12">
        <v-card theme="dark">
          <v-card-title>Bordered Dark Table</v-card-title>
          <v-card-text>
            <v-table theme="dark" class="bordered-table">
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
                <tr v-for="item in borderedData" :key="item.id">
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TableDark',

  data() {
    return {
      basicData: [
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
      stripedData: [
        {
          id: 1,
          project: 'Website Redesign',
          budget: 15000,
          status: 'In Progress',
          users: [
            { initials: 'JD', color: 'primary' },
            { initials: 'JS', color: 'success' },
            { initials: 'BW', color: 'warning' }
          ],
          completion: 65
        },
        {
          id: 2,
          project: 'Mobile App',
          budget: 25000,
          status: 'Completed',
          users: [
            { initials: 'JD', color: 'primary' },
            { initials: 'JS', color: 'success' }
          ],
          completion: 100
        },
        {
          id: 3,
          project: 'Database Migration',
          budget: 8000,
          status: 'Pending',
          users: [
            { initials: 'BW', color: 'warning' },
            { initials: 'JS', color: 'success' },
            { initials: 'JD', color: 'primary' }
          ],
          completion: 35
        }
      ],
      borderedData: [
        {
          id: 1,
          orderId: 'ORD001',
          customer: 'John Doe',
          product: 'Premium Package',
          price: 199.99,
          status: 'Delivered'
        },
        {
          id: 2,
          orderId: 'ORD002',
          customer: 'Jane Smith',
          product: 'Basic Package',
          price: 99.99,
          status: 'Processing'
        },
        {
          id: 3,
          orderId: 'ORD003',
          customer: 'Bob Wilson',
          product: 'Standard Package',
          price: 149.99,
          status: 'Shipped'
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

    getCompletionColor(completion: number): string {
      if (completion === 100) return 'success'
      if (completion >= 70) return 'info'
      if (completion >= 30) return 'warning'
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

.striped {
  background-color: rgba(255, 255, 255, 0.05);
}

.bordered-table {
  :deep(td), :deep(th) {
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>