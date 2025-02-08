<template>
  <v-container fluid>
    <v-row>
      <!-- Analytics Overview -->
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            Analytics Overview
            <v-spacer></v-spacer>
            <v-btn variant="text" color="primary">
              <v-icon start>mdi-download</v-icon>
              Export
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <div class="stat-card pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="primary" size="32">mdi-eye</v-icon>
                    <div class="ml-4">
                      <div class="text-h4">128K</div>
                      <div class="text-caption">Total Views</div>
                    </div>
                  </div>
                  <v-progress-linear
                    model-value="75"
                    color="primary"
                    height="4"
                  ></v-progress-linear>
                </div>
              </v-col>
              
              <v-col cols="12" md="3">
                <div class="stat-card pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="success" size="32">mdi-account-multiple</v-icon>
                    <div class="ml-4">
                      <div class="text-h4">45.2K</div>
                      <div class="text-caption">New Users</div>
                    </div>
                  </div>
                  <v-progress-linear
                    model-value="65"
                    color="success"
                    height="4"
                  ></v-progress-linear>
                </div>
              </v-col>
              
              <v-col cols="12" md="3">
                <div class="stat-card pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="info" size="32">mdi-cart</v-icon>
                    <div class="ml-4">
                      <div class="text-h4">834</div>
                      <div class="text-caption">Sales</div>
                    </div>
                  </div>
                  <v-progress-linear
                    model-value="85"
                    color="info"
                    height="4"
                  ></v-progress-linear>
                </div>
              </v-col>
              
              <v-col cols="12" md="3">
                <div class="stat-card pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon color="warning" size="32">mdi-currency-usd</v-icon>
                    <div class="ml-4">
                      <div class="text-h4">$95K</div>
                      <div class="text-caption">Revenue</div>
                    </div>
                  </div>
                  <v-progress-linear
                    model-value="45"
                    color="warning"
                    height="4"
                  ></v-progress-linear>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Performance Chart -->
      <v-col cols="12" md="8">
        <v-card height="400">
          <v-card-title>Performance Analytics</v-card-title>
          <v-card-text>
            <div class="chart-container">
              <!-- Chart component would go here -->
              <div class="chart-placeholder d-flex align-center justify-center">
                Performance Chart Placeholder
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Top Products -->
      <v-col cols="12" md="4">
        <v-card height="400">
          <v-card-title>Top Products</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(product, index) in topProducts"
                :key="index"
                :title="product.name"
                :subtitle="'$' + product.revenue"
              >
                <template v-slot:prepend>
                  <v-avatar
                    :color="product.color"
                    size="40"
                  >
                    <v-icon color="white">{{ product.icon }}</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard3',
  
  data() {
    return {
      topProducts: [
        {
          name: 'Premium Package',
          revenue: '2,454',
          color: 'primary',
          icon: 'mdi-package-variant'
        },
        {
          name: 'Standard License',
          revenue: '1,428',
          color: 'success',
          icon: 'mdi-license'
        },
        {
          name: 'Basic Support',
          revenue: '984',
          color: 'info',
          icon: 'mdi-headset'
        },
        {
          name: 'Custom Development',
          revenue: '858',
          color: 'warning',
          icon: 'mdi-code-braces'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.stat-card {
  background: var(--v-surface-variant);
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.chart-container {
  height: 300px;
  position: relative;
}

.chart-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--v-background);
  border: 1px dashed var(--v-border-color);
  border-radius: 8px;
}
</style>