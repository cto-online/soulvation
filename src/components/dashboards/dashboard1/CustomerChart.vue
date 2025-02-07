<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

interface WeekData {
  name: string;
  data: number[];
  total: number;
  dateRange: string;
}

interface Props {
  currentWeek?: WeekData;
  lastWeek?: WeekData;
  growth?: number;
  loading?: boolean;
}

const theme = useTheme();
const chartError = ref<string | null>(null);

const props = withDefaults(defineProps<Props>(), {
  currentWeek: () => ({
    name: 'Current Week',
    data: [0, 20, 15, 19, 14, 25, 30],
    total: 6380,
    dateRange: 'April 07 - April 14'
  }),
  lastWeek: () => ({
    name: 'Last Week',
    data: [0, 8, 19, 13, 26, 16, 25],
    total: 4298,
    dateRange: 'Last Week'
  }),
  growth: 26.5,
  loading: false
})

const numberFormatter = new Intl.NumberFormat('en-US');

/* Chart Configuration */
const chartOptions = computed(() => ({
  chart: {
    fontFamily: 'inherit',
    height: 100,
    type: 'line',
    toolbar: {
      show: false
    },
    sparkline: {
      enabled: true
    },
    events: {
      error: function(e: Error) {
        chartError.value = e.message;
      }
    }
  },
  colors: [
    theme.current.value.colors.primary,
    theme.current.value.colors['primary-lighten-2']
  ],
  grid: {
    show: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  markers: {
    size: 4,
    strokeWidth: 2,
    hover: {
      size: 6
    }
  },
  tooltip: {
    theme: theme.current.value.dark ? 'dark' : 'light',
    x: {
      show: true,
      formatter: (value: number) => `Day ${value + 1}`
    },
    y: {
      formatter: (value: number) => numberFormatter.format(value)
    }
  },
  legend: {
    show: false
  }
}));

const chartSeries = computed(() => [
  {
    name: props.currentWeek.name,
    data: props.currentWeek.data
  },
  {
    name: props.lastWeek.name,
    data: props.lastWeek.data
  }
]);

const growthColor = computed(() => props.growth >= 0 ? 'success' : 'error');
const growthIcon = computed(() => props.growth >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down');
</script>

<template>
  <v-card
    elevation="10"
    class="customer-chart"
    :loading="props.loading"
    :aria-label="`Customer trends chart comparing ${props.currentWeek.dateRange} with ${props.lastWeek.dateRange}`"
  >
    <v-card-item>
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-space-between align-md-center mb-6">
        <div>
          <h2 class="text-h5 mb-1">Customers</h2>
          <span class="text-subtitle-1 text-medium-emphasis">
            Last 7 days
          </span>
        </div>
        <v-chip
          :color="growthColor"
          size="small"
          class="font-weight-medium"
          variant="tonal"
        >
          <v-icon
            :icon="growthIcon"
            size="small"
            start
          ></v-icon>
          {{ Math.abs(props.growth) }}%
        </v-chip>
      </div>

      <!-- Chart -->
      <div class="chart-container">
        <v-fade-transition>
          <div v-if="chartError" class="text-error text-caption">
            {{ chartError }}
          </div>
          <apexchart
            v-else
            type="line"
            height="100"
            :options="chartOptions"
            :series="chartSeries"
          />
        </v-fade-transition>
      </div>

      <!-- Comparison Stats -->
      <div class="mt-6">
        <div
          v-for="(week, index) in [props.currentWeek, props.lastWeek]"
          :key="week.name"
          class="d-flex justify-space-between align-center mb-3"
        >
          <div class="d-flex align-center gap-2">
            <v-avatar
              :color="index === 0 ? 'primary' : 'grey-lighten-2'"
              size="10"
              class="rounded-circle"
              aria-hidden="true"
            ></v-avatar>
            <span class="text-medium-emphasis">{{ week.dateRange }}</span>
          </div>
          <span class="text-medium-emphasis font-weight-medium">
            {{ numberFormatter.format(week.total) }}
          </span>
        </div>
      </div>
    </v-card-item>

    <!-- Loading Overlay -->
    <template v-slot:loader>
      <v-progress-linear
        color="primary"
        height="3"
        indeterminate
      ></v-progress-linear>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>
.customer-chart {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }

  .chart-container {
    margin: 0 -8px;
    
    :deep(.apexcharts-text) {
      fill: currentColor !important;
    }
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .customer-chart {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h5 {
      font-size: 1.25rem !important;
    }
  }
}
</style>
