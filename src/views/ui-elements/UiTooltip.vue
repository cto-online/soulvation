<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Tooltips -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Tooltips</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 justify-center">
              <v-tooltip
                text="Default Tooltip"
                location="top"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    Hover Me
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip
                text="With Icon"
                location="top"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-information"
                    color="info"
                    v-bind="props"
                  ></v-btn>
                </template>
              </v-tooltip>

              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-chip
                    v-bind="props"
                    color="success"
                  >
                    Hover for Status
                  </v-chip>
                </template>
                <span>Active Status</span>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Tooltip Positions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Tooltip Positions</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 justify-center">
              <v-tooltip
                v-for="position in positions"
                :key="position"
                :text="`${position} tooltip`"
                :location="position"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    {{ position }}
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Tooltips -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Tooltips</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(item, index) in interactiveItems"
                :key="index"
                cols="12"
                sm="6"
                md="3"
              >
                <v-tooltip
                  :text="item.tooltip"
                  location="top"
                >
                  <template v-slot:activator="{ props }">
                    <v-card
                      v-bind="props"
                      class="mx-auto"
                      max-width="300"
                    >
                      <v-img
                        :src="item.image"
                        height="200"
                        cover
                      ></v-img>
                      <v-card-title>{{ item.title }}</v-card-title>
                      <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
                    </v-card>
                  </template>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Tooltips -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Tooltips</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 justify-center">
              <!-- Rich Content Tooltip -->
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-avatar
                    v-bind="props"
                    size="48"
                    image="https://cdn.vuetifyjs.com/images/john.jpg"
                  ></v-avatar>
                </template>
                <v-card class="custom-tooltip" max-width="300">
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-avatar
                        size="40"
                        image="https://cdn.vuetifyjs.com/images/john.jpg"
                      ></v-avatar>
                    </template>
                    <v-card-title>John Doe</v-card-title>
                    <v-card-subtitle>Software Engineer</v-card-subtitle>
                  </v-card-item>
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-icon color="success" class="me-2">mdi-check-circle</v-icon>
                      <span>Online</span>
                    </div>
                    <div class="d-flex gap-2">
                      <v-btn
                        variant="text"
                        size="small"
                        prepend-icon="mdi-message"
                      >
                        Message
                      </v-btn>
                      <v-btn
                        variant="text"
                        size="small"
                        prepend-icon="mdi-account-plus"
                      >
                        Connect
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tooltip>

              <!-- Chart Tooltip -->
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="primary"
                    prepend-icon="mdi-chart-line"
                  >
                    View Stats
                  </v-btn>
                </template>
                <v-card class="custom-tooltip" max-width="300">
                  <v-card-title class="text-subtitle-1">Performance Stats</v-card-title>
                  <v-card-text>
                    <v-sparkline
                      :value="sparklineData"
                      :gradient="['#1867C0', '#5CBBF6']"
                      :smooth="10"
                      stroke-linecap="round"
                      gradient-direction="top"
                      line-width="2"
                      padding="4"
                    ></v-sparkline>
                    <div class="d-flex justify-space-between mt-2">
                      <span class="text-caption">Last 7 days</span>
                      <span class="text-caption">+24%</span>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tooltip>

              <!-- Status Tooltip -->
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :color="serverStatus.color"
                    prepend-icon="mdi-server"
                  >
                    Server Status
                  </v-btn>
                </template>
                <v-card class="custom-tooltip" max-width="300">
                  <v-card-text>
                    <div class="d-flex flex-column gap-2">
                      <div
                        v-for="(metric, index) in serverMetrics"
                        :key="index"
                        class="d-flex flex-column"
                      >
                        <div class="d-flex justify-space-between align-center">
                          <span class="text-caption">{{ metric.label }}</span>
                          <span class="text-caption">{{ metric.value }}</span>
                        </div>
                        <v-progress-linear
                          :model-value="metric.percentage"
                          :color="metric.color"
                          height="4"
                          rounded
                        ></v-progress-linear>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Tooltip with Form -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Tooltip with Form</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 justify-center">
              <v-tooltip location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="primary"
                    prepend-icon="mdi-account-plus"
                  >
                    Quick Add User
                  </v-btn>
                </template>
                <v-card class="custom-tooltip" max-width="300">
                  <v-card-title class="text-subtitle-1">Add New User</v-card-title>
                  <v-card-text>
                    <v-form v-model="formValid" @submit.prevent="submitForm">
                      <v-text-field
                        v-model="form.name"
                        label="Name"
                        density="compact"
                        variant="outlined"
                        :rules="[v => !!v || 'Name is required']"
                      ></v-text-field>

                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        density="compact"
                        variant="outlined"
                        :rules="[
                          v => !!v || 'Email is required',
                          v => /.+@.+\..+/.test(v) || 'Email must be valid'
                        ]"
                      ></v-text-field>

                      <v-select
                        v-model="form.role"
                        :items="roles"
                        label="Role"
                        density="compact"
                        variant="outlined"
                      ></v-select>

                      <div class="d-flex justify-end gap-2 mt-4">
                        <v-btn
                          variant="text"
                          size="small"
                          @click="resetForm"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="primary"
                          size="small"
                          :disabled="!formValid"
                          @click="submitForm"
                        >
                          Add
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tooltip>
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
  name: 'UiTooltip',

  data() {
    return {
      positions: ['top', 'bottom', 'start', 'end'],
      interactiveItems: [
        {
          title: 'Product 1',
          subtitle: 'Description',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          tooltip: 'View product details'
        },
        {
          title: 'Product 2',
          subtitle: 'Description',
          image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          tooltip: 'View product details'
        },
        {
          title: 'Product 3',
          subtitle: 'Description',
          image: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          tooltip: 'View product details'
        },
        {
          title: 'Product 4',
          subtitle: 'Description',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          tooltip: 'View product details'
        }
      ],
      sparklineData: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      serverStatus: {
        color: 'success'
      },
      serverMetrics: [
        {
          label: 'CPU Usage',
          value: '45%',
          percentage: 45,
          color: 'primary'
        },
        {
          label: 'Memory',
          value: '2.3GB/8GB',
          percentage: 28,
          color: 'success'
        },
        {
          label: 'Storage',
          value: '156GB/512GB',
          percentage: 30,
          color: 'info'
        }
      ],
      formValid: true,
      form: {
        name: '',
        email: '',
        role: 'User'
      },
      roles: ['Admin', 'Editor', 'User']
    }
  },

  methods: {
    resetForm() {
      this.form = {
        name: '',
        email: '',
        role: 'User'
      }
    },

    submitForm() {
      if (this.formValid) {
        // Handle form submission
        console.log('Form submitted:', this.form)
        this.resetForm()
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

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.custom-tooltip {
  background: rgba(var(--v-theme-surface), 0.95) !important;
  backdrop-filter: blur(10px);
}
</style>