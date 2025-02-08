<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardStore } from '@/stores/dashboard';
import WelcomeCard from '@/components/dashboards/dashboard1/WelcomeCard.vue';
import CustomerCard from '@/components/dashboards/dashboard1/CustomerCard.vue';
import ProjectCard from '@/components/dashboards/dashboard1/ProjectCard.vue';
import RevenueForcast from '@/components/dashboards/dashboard1/RevenueForcast.vue';
import Performance from '@/components/dashboards/dashboard1/Performance.vue';
import CustomerChart from '@/components/dashboards/dashboard1/CustomerChart.vue';
import SalesOverview from '@/components/dashboards/dashboard1/SalesOverview.vue';
import RevenueProducts from '@/components/dashboards/dashboard1/RevenueProducts.vue';
import TotalSettelment from '@/components/dashboards/dashboard1/TotalSettelment.vue';

const dashboard = useDashboardStore();

onMounted(async () => {
  await dashboard.fetchDashboardData();
});
</script>

<template>
  <v-container fluid class="dashboard-container fill-height pa-6">
    <v-row>
      <!-- Welcome Cards Section -->
      <v-col cols="12" lg="5">
        <v-row>
          <v-col cols="12">
            <WelcomeCard
              :loading="dashboard.loading"
              v-bind="dashboard.welcomeData"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <CustomerCard
              :loading="dashboard.loading"
              v-bind="dashboard.customerData"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <ProjectCard
              :loading="dashboard.loading"
              v-bind="dashboard.projectData"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Revenue Forecast -->
      <v-col cols="12" lg="7">
        <RevenueForcast
          :loading="dashboard.loading"
          v-bind="dashboard.revenueData"
        />
      </v-col>

      <!-- Performance -->
      <v-col cols="12" lg="5">
        <Performance
          :loading="dashboard.loading"
          v-bind="dashboard.performanceData"
        />
      </v-col>

      <!-- Customer & Sales Overview -->
      <v-col cols="12" lg="7">
        <v-row>
          <v-col cols="12" md="6">
            <CustomerChart
              :loading="dashboard.loading"
              v-bind="dashboard.customerChartData"
            />
          </v-col>
          <v-col cols="12" md="6">
            <SalesOverview
              :loading="dashboard.loading"
              v-bind="dashboard.salesData"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- Revenue Products & Total Settlement -->
      <v-col cols="12" lg="8">
        <RevenueProducts
          :loading="dashboard.loading"
          v-bind="dashboard.revenueProductsData"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <TotalSettelment
          :loading="dashboard.loading"
          v-bind="dashboard.settlementData"
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