<script setup lang="ts">
import { ref } from 'vue';
import WelcomeCard from '@/components/dashboards/dashboard1/WelcomeCard.vue';
import CustomerCard from '@/components/dashboards/dashboard1/CustomerCard.vue';
import ProjectCard from '@/components/dashboards/dashboard1/ProjectCard.vue';
import RevenueForcast from '@/components/dashboards/dashboard1/RevenueForcast.vue';
import Performance from '@/components/dashboards/dashboard1/Performance.vue';
import CustomerChart from '@/components/dashboards/dashboard1/CustomerChart.vue';
import SalesOverview from '@/components/dashboards/dashboard1/SalesOverview.vue';
import RevenueProducts from '@/components/dashboards/dashboard1/RevenueProducts.vue';
import TotalSettelment from '@/components/dashboards/dashboard1/TotalSettelment.vue';

// Loading states
const loading = ref(false);

// Sample data (in a real app, this would come from an API)
const welcomeData = ref({
  userName: 'David',
  budget: 98450,
  expense: 2440
});

const customerData = ref({
  count: 36358,
  change: -12,
  history: [36, 45, 31, 47, 38, 43]
});

const projectData = ref({
  count: 78298,
  change: 31.8,
  history: [3, 5, 5, 7, 6, 5, 3, 5, 3]
});

const revenueData = ref({
  years: [
    {
      year: 2024,
      data: [100, 75, 80, 40, 20, 40, 0, 25],
      color: 'primary'
    },
    {
      year: 2023,
      data: [50, 60, 30, 55, 75, 60, 100, 120],
      color: 'error'
    },
    {
      year: 2022,
      data: [35, 45, 40, 50, 35, 55, 40, 45],
      color: 'secondary'
    }
  ],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
});

const performanceData = ref({
  metrics: [
    {
      title: 'Project Performance',
      subtitle: 'Project completion rate',
      icon: 'chart-line-up-outline',
      color: 'primary',
      value: 20
    },
    {
      title: 'Team Collaboration',
      subtitle: 'Team efficiency score',
      icon: 'users-group-rounded-outline',
      color: 'error',
      value: 20
    },
    {
      title: 'Resource Utilization',
      subtitle: 'Resource usage efficiency',
      icon: 'chart-square-outline',
      color: 'warning',
      value: 20
    },
    {
      title: 'Quality Metrics',
      subtitle: 'Code quality score',
      icon: 'shield-check-outline',
      color: 'secondary',
      value: 20
    },
    {
      title: 'Delivery Time',
      subtitle: 'On-time delivery rate',
      icon: 'timer-outline',
      color: 'info',
      value: 20
    }
  ],
  totalScore: 275
});

const customerChartData = ref({
  currentWeek: {
    name: 'Current Week',
    data: [0, 20, 15, 19, 14, 25, 30],
    total: 6380,
    dateRange: 'April 07 - April 14'
  },
  lastWeek: {
    name: 'Last Week',
    data: [0, 8, 19, 13, 26, 16, 25],
    total: 4298,
    dateRange: 'Last Week'
  },
  growth: 26.5
});

const salesData = ref({
  metrics: [
    {
      label: 'Direct Sales',
      value: 50,
      color: 'primary',
      description: 'Sales through direct channels'
    },
    {
      label: 'Partner Sales',
      value: 80,
      color: 'secondary',
      description: 'Sales through partners'
    },
    {
      label: 'Online Sales',
      value: 30,
      color: 'error',
      description: 'Sales through online platforms'
    }
  ]
});

const revenueProductsData = ref({
  projects: [
    {
      id: '1',
      lead: {
        id: 'l1',
        name: 'John Smith',
        designation: 'Senior Developer',
        avatar: '/avatars/1.jpg'
      },
      name: 'Mobile App Development',
      status: {
        text: 'High',
        color: 'error'
      },
      budget: 24500
    },
    {
      id: '2',
      lead: {
        id: 'l2',
        name: 'Sarah Johnson',
        designation: 'Product Manager',
        avatar: '/avatars/2.jpg'
      },
      name: 'Website Redesign',
      status: {
        text: 'Medium',
        color: 'warning'
      },
      budget: 18750
    }
  ]
});

const settlementData = ref({
  total: 122580,
  balance: 122580,
  withdrawals: 31640,
  history: [40, 40, 80, 80, 30, 30, 10, 10, 30, 30, 100, 100, 20, 20, 140, 140],
  weeks: ['1W', '', '3W', '', '5W', '6W', '7W', '8W', '9W', '', '11W', '', '13W', '', '15W']
});
</script>

<template>
  <v-container fluid class="dashboard-container pa-6">
    <v-row>
      <!-- Welcome Cards Section -->
      <v-col cols="12" lg="5">
        <v-row>
          <v-col cols="12">
            <WelcomeCard
              :loading="loading"
              v-bind="welcomeData"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <CustomerCard
              :loading="loading"
              v-bind="customerData"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <ProjectCard
              :loading="loading"
              v-bind="projectData"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Revenue Forecast -->
      <v-col cols="12" lg="7">
        <RevenueForcast
          :loading="loading"
          v-bind="revenueData"
        />
      </v-col>

      <!-- Performance -->
      <v-col cols="12" lg="5">
        <Performance
          :loading="loading"
          v-bind="performanceData"
        />
      </v-col>

      <!-- Customer & Sales Overview -->
      <v-col cols="12" lg="7">
        <v-row>
          <v-col cols="12" md="6">
            <CustomerChart
              :loading="loading"
              v-bind="customerChartData"
            />
          </v-col>
          <v-col cols="12" md="6">
            <SalesOverview
              :loading="loading"
              v-bind="salesData"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Revenue Products & Total Settlement -->
      <v-col cols="12" lg="8">
        <RevenueProducts
          :loading="loading"
          v-bind="revenueProductsData"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <TotalSettelment
          :loading="loading"
          v-bind="settlementData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.dashboard-container {
  :deep(.v-row) {
    margin-top: -12px;
    margin-bottom: -12px;
  }

  :deep(.v-col) {
    padding-top: 12px;
    padding-bottom: 12px;
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .dashboard-container {
    padding: 12px !important;
  }
}
</style>