<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Simple Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Simple Table</v-card-title>
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
                <tr v-for="item in simpleData" :key="item.id">
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

      <!-- Striped Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Striped Table</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Product</th>
                  <th class="text-left">Category</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in stripedData"
                  :key="item.id"
                  :class="{ 'striped': index % 2 }"
                >
                  <td>#{{ item.id }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ item.category }}</td>
                  <td>${{ item.price }}</td>
                  <td>
                    <v-chip
                      :color="item.stock > 10 ? 'success' : 'warning'"
                      size="small"
                    >
                      {{ item.stock }} units
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bordered Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Bordered Table</v-card-title>
          <v-card-text>
            <v-table class="bordered-table">
              <thead>
                <tr>
                  <th class="text-left">Invoice</th>
                  <th class="text-left">Client</th>
                  <th class="text-left">Amount</th>
                  <th class="text-left">Date</th>
                  <th class="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in borderedData" :key="item.id">
                  <td>#{{ item.invoice }}</td>
                  <td>{{ item.client }}</td>
                  <td>${{ item.amount }}</td>
                  <td>{{ item.date }}</td>
                  <td>
                    <v-chip
                      :color="getStatusColor(item.status)"
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
  name: 'TableBasic',

  data() {
    return {
      simpleData: [
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
          product: 'Laptop',
          category: 'Electronics',
          price: 999.99,
          stock: 15
        },
        {
          id: 2,
          product: 'Smartphone',
          category: 'Electronics',
          price: 699.99,
          stock: 8
        },
        {
          id: 3,
          product: 'Headphones',
          category: 'Accessories',
          price: 149.99,
          stock: 25
        },
        {
          id: 4,
          product: 'Monitor',
          category: 'Electronics',
          price: 299.99,
          stock: 12
        }
      ],
      borderedData: [
        {
          id: 1,
          invoice: 'INV001',
          client: 'Tech Corp',
          amount: 1500.00,
          date: '2024-02-01',
          status: 'Paid'
        },
        {
          id: 2,
          invoice: 'INV002',
          client: 'Design Studio',
          amount: 850.00,
          date: '2024-02-05',
          status: 'Pending'
        },
        {
          id: 3,
          invoice: 'INV003',
          client: 'Marketing Inc',
          amount: 2100.00,
          date: '2024-02-08',
          status: 'Overdue'
        }
      ]
    }
  },

  methods: {
    getStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'paid':
          return 'success'
        case 'pending':
          return 'warning'
        case 'overdue':
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

.striped {
  background-color: rgb(var(--v-theme-surface-variant));
}

.bordered-table {
  :deep(td), :deep(th) {
    border: 1px solid rgba(var(--v-border-color), 0.12);
  }
}
</style>