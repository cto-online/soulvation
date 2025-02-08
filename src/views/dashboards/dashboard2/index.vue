<template>
  <v-container fluid>
    <v-row>
      <!-- Summary Cards -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="mb-4">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">Total Users</div>
                <div class="text-h4">2,845</div>
              </div>
              <v-spacer></v-spacer>
              <v-icon size="48" color="primary">mdi-account-group</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="mb-4">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">Revenue</div>
                <div class="text-h4">$48.2K</div>
              </div>
              <v-spacer></v-spacer>
              <v-icon size="48" color="success">mdi-currency-usd</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="mb-4">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">Orders</div>
                <div class="text-h4">482</div>
              </div>
              <v-spacer></v-spacer>
              <v-icon size="48" color="info">mdi-shopping</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="mb-4">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">Growth</div>
                <div class="text-h4">+12.5%</div>
              </div>
              <v-spacer></v-spacer>
              <v-icon size="48" color="warning">mdi-trending-up</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Main Content -->
      <v-col cols="12" md="8">
        <v-card class="mb-4">
          <v-card-title>Monthly Performance</v-card-title>
          <v-card-text>
            <div class="chart-placeholder" style="height: 300px; background: #f5f5f5; border-radius: 4px;">
              <!-- Chart component would go here -->
              <div class="text-center pt-8">Chart Component Placeholder</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="mb-4">
          <v-card-title>Recent Activity</v-card-title>
          <v-card-text>
            <v-timeline density="compact">
              <v-timeline-item
                v-for="(activity, i) in recentActivities"
                :key="i"
                :dot-color="activity.color"
                size="small"
              >
                <div class="mb-2">
                  <div class="font-weight-medium">{{ activity.title }}</div>
                  <div class="text-caption">{{ activity.time }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard2',
  
  data() {
    return {
      recentActivities: [
        {
          title: 'New order received',
          time: '5 minutes ago',
          color: 'primary'
        },
        {
          title: 'Server rebooted',
          time: '12 minutes ago',
          color: 'warning'
        },
        {
          title: 'New user registered',
          time: '27 minutes ago',
          color: 'success'
        },
        {
          title: 'Database backup completed',
          time: '1 hour ago',
          color: 'info'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card {
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--v-background);
  border: 1px dashed var(--v-border-color);
}
</style>