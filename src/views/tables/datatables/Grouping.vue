<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Grouping -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Grouping</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              group-by="department"
              class="elevation-1"
            >
              <template v-slot:group-header="{ item, columns, toggleGroup }">
                <tr>
                  <td :colspan="columns.length">
                    <v-btn
                      variant="text"
                      size="small"
                      class="mr-4"
                      @click="toggleGroup(item)"
                    >
                      <v-icon>{{ item.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
                      {{ item.value }} Department ({{ item.items.length }} employees)
                    </v-btn>
                  </td>
                </tr>
              </template>

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
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multi-Level Grouping -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Multi-Level Grouping</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="projectHeaders"
              :items="projectItems"
              group-by="status,client"
              class="elevation-1"
            >
              <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                <tr>
                  <td :colspan="columns.length">
                    <div class="d-flex align-center" :style="{ paddingLeft: `${item.depth * 32}px` }">
                      <v-btn
                        variant="text"
                        size="small"
                        class="mr-4"
                        @click="toggleGroup(item)"
                      >
                        <v-icon>{{ isGroupOpen ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
                        {{ item.depth === 0 ? getGroupTitle(item) : item.value }}
                        ({{ item.items.length }} {{ item.depth === 0 ? 'projects' : 'items' }})
                      </v-btn>
                      <v-chip
                        v-if="item.depth === 0"
                        :color="getProjectStatusColor(item.value)"
                        size="small"
                        class="ml-2"
                      >
                        {{ item.value }}
                      </v-chip>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-slot:item.budget="{ item }">
                ${{ item.budget.toLocaleString() }}
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

      <!-- Summary Rows -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Summary Rows</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="salesHeaders"
              :items="salesItems"
              group-by="quarter"
              class="elevation-1"
            >
              <template v-slot:group-header="{ item, columns, toggleGroup }">
                <tr>
                  <td :colspan="columns.length">
                    <div class="d-flex align-center justify-space-between">
                      <v-btn
                        variant="text"
                        size="small"
                        @click="toggleGroup(item)"
                      >
                        <v-icon>{{ item.isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
                        Quarter {{ item.value }}
                      </v-btn>
                      <div class="d-flex align-center">
                        <span class="mr-4">
                          Total Sales: ${{ calculateGroupTotal(item.items, 'sales').toLocaleString() }}
                        </span>
                        <span>
                          Average Growth: {{ calculateGroupAverage(item.items, 'growth').toFixed(1) }}%
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>

              <template v-slot:item.sales="{ item }">
                ${{ item.sales.toLocaleString() }}
              </template>

              <template v-slot:item.growth="{ item }">
                <span :class="item.growth >= 0 ? 'text-success' : 'text-error'">
                  {{ item.growth >= 0 ? '+' : '' }}{{ item.growth }}%
                </span>
              </template>

              <template v-slot:bottom>
                <div class="d-flex justify-space-between pa-4 bg-grey-lighten-4">
                  <div>
                    <strong>Year Total:</strong>
                    ${{ calculateTotal('sales').toLocaleString() }}
                  </div>
                  <div>
                    <strong>Average Growth:</strong>
                    {{ calculateAverage('growth').toFixed(1) }}%
                  </div>
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
  name: 'Grouping',

  data() {
    return {
      headers: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Department', key: 'department', sortable: true },
        { title: 'Salary', key: 'salary', sortable: true },
        { title: 'Performance', key: 'performance', sortable: true }
      ],
      projectHeaders: [
        { title: 'Project', key: 'name', sortable: true },
        { title: 'Client', key: 'client', sortable: true },
        { title: 'Budget', key: 'budget', sortable: true },
        { title: 'Progress', key: 'progress', sortable: true }
      ],
      salesHeaders: [
        { title: 'Month', key: 'month', sortable: true },
        { title: 'Sales', key: 'sales', sortable: true },
        { title: 'Growth', key: 'growth', sortable: true }
      ],
      items: [
        {
          name: 'John Doe',
          department: 'Engineering',
          salary: 85000,
          performance: 4.5
        },
        {
          name: 'Jane Smith',
          department: 'Design',
          salary: 75000,
          performance: 5
        },
        {
          name: 'Bob Wilson',
          department: 'Marketing',
          salary: 65000,
          performance: 3.5
        },
        {
          name: 'Alice Brown',
          department: 'Engineering',
          salary: 90000,
          performance: 4
        },
        {
          name: 'Charlie Davis',
          department: 'Design',
          salary: 70000,
          performance: 4.5
        }
      ],
      projectItems: [
        {
          name: 'Website Redesign',
          client: 'Tech Corp',
          status: 'In Progress',
          budget: 15000,
          progress: 65
        },
        {
          name: 'Mobile App',
          client: 'Tech Corp',
          status: 'Planning',
          budget: 25000,
          progress: 15
        },
        {
          name: 'E-commerce Platform',
          client: 'Retail Co',
          status: 'Completed',
          budget: 35000,
          progress: 100
        },
        {
          name: 'CRM Integration',
          client: 'Retail Co',
          status: 'In Progress',
          budget: 20000,
          progress: 45
        }
      ],
      salesItems: [
        { quarter: 'Q1', month: 'January', sales: 45000, growth: 5.2 },
        { quarter: 'Q1', month: 'February', sales: 52000, growth: 15.6 },
        { quarter: 'Q1', month: 'March', sales: 48000, growth: -7.7 },
        { quarter: 'Q2', month: 'April', sales: 55000, growth: 14.6 },
        { quarter: 'Q2', month: 'May', sales: 59000, growth: 7.3 },
        { quarter: 'Q2', month: 'June', sales: 62000, growth: 5.1 }
      ]
    }
  },

  methods: {
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

    getGroupTitle(item: any): string {
      switch (item.value) {
        case 'Completed':
          return 'Completed Projects'
        case 'In Progress':
          return 'Ongoing Projects'
        case 'Planning':
          return 'Planned Projects'
        default:
          return item.value
      }
    },

    calculateGroupTotal(items: any[], key: string): number {
      return items.reduce((sum, item) => sum + item[key], 0)
    },

    calculateGroupAverage(items: any[], key: string): number {
      return this.calculateGroupTotal(items, key) / items.length
    },

    calculateTotal(key: string): number {
      return this.salesItems.reduce((sum, item) => sum + item[key], 0)
    },

    calculateAverage(key: string): number {
      return this.calculateTotal(key) / this.salesItems.length
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

.text-success {
  color: rgb(var(--v-theme-success));
}

.text-error {
  color: rgb(var(--v-theme-error));
}
</style>