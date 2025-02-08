<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useTheme } from 'vuetify';

// Types
interface YearlyData {
  year: number;
  data: number[];
  color: string;
}

interface ChartData {
  years: YearlyData[];
  months: string[];
}

interface Props {
  data?: ChartData;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  loading: false
});

const theme = useTheme();
const chartError = ref<string | null>(null);

// Default data with theme colors
const defaultData = computed<ChartData>(() => ({
  years: [
    {
      year: 2024,
      data: [100, 75, 80, 40, 20, 40, 0, 25],
      color: theme.current.value.colors.primary
    },
    {
      year: 2023,
      data: [50, 60, 30, 55, 75, 60, 100, 120],
      color: theme.current.value.colors.error
    },
    {
      year: 2022,
      data: [35, 45, 40, 50, 35, 55, 40, 45],
      color: theme.current.value.colors.secondary
    }
  ],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
}));

// Use provided data or fallback to default
const chartData = computed(() => props.data || defaultData.value);

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

/* Chart Configuration */
const areachartOptions = computed(() => ({
  chart: {
    toolbar: {
      show: false
    },
    type: 'area',
    fontFamily: 'inherit',
    foreColor: theme.current.value.colors.textPrimary,
    height: 290,
    width: '100%',
    stacked: false,
    events: {
      error: function(e: Error) {
        chartError.value = e.message;
      }
    }
  },
  colors: chartData.value.years.map(year => year.color),
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  stroke: {
    width: 2,
    curve: 'monotoneCubic'
  },
  grid: {
    show: true,
    borderColor: theme.current.value.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    padding: {
      top: 0,
      bottom: 0
    },
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 0.2,
      opacityTo: 0.9,
      stops: [100]
    }
  },
  xaxis: {
    categories: chartData.value.months,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        colors: theme.current.value.colors.textPrimary
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (value: number) => currencyFormatter.format(value * 1000),
      style: {
        colors: theme.current.value.colors.textPrimary
      }
    }
  },
  markers: {
    strokeColors: chartData.value.years.map(year => year.color),
    strokeWidth: 2
  },
  tooltip: {
    theme: theme.current.value.dark ? 'dark' : 'light',
    y: {
      formatter: (value: number) => currencyFormatter.format(value * 1000)
    }
  }
}));

const chartSeries = computed(() => chartData.value.years.map(year => ({
  name: year.year.toString(),
  data: year.data
})));
</script>

<template>
  <v-card
    elevation="10"
    class="revenue-forecast"
    :loading="loading"
    :aria-label="'Revenue forecast comparison between years ' + chartData.years.map(y => y.year).join(', ')"
  >
    <v-card-item>
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-space-between align-md-center gap-4 mb-6">
        <!-- Title Section -->
        <div class="d-flex gap-3 align-center">
          <v-avatar
            size="48"
            class="rounded-md bg-primary-lighten-4"
            aria-hidden="true"
          >
            <Icon
              icon="solar:layers-linear"
              class="text-primary"
              :height="25"
            />
          </v-avatar>
          <div>
            <h2 class="text-h5 mb-1">Revenue Forecast</h2>
            <span class="text-subtitle-1 text-medium-emphasis">
              Overview of Profit
            </span>
          </div>
        </div>

        <!-- Legend -->
        <div class="d-flex flex-wrap gap-4">
          <div
            v-for="year in chartData.years"
            :key="year.year"
            class="d-flex align-center gap-2"
          >
            <v-avatar
              :color="year.color"
              size="8"
              class="rounded-circle"
              aria-hidden="true"
            />
            <span class="text-medium-emphasis">{{ year.year }}</span>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="chart-container">
        <v-fade-transition>
          <div v-if="chartError" class="text-error text-caption">
            {{ chartError }}
          </div>
          <apexchart
            v-else
            type="area"
            height="290"
            :options="areachartOptions"
            :series="chartSeries"
          />
        </v-fade-transition>
      </div>
    </v-card-item>

    <!-- Loading Overlay -->
    <template #loader>
      <v-progress-linear
        color="primary"
        height="3"
        indeterminate
      />
    </template>
  </v-card>
</template>

<style lang="scss" scoped>
.revenue-forecast {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }

  .chart-container {
    margin: 0 -16px;
    
    :deep(.apexcharts-text) {
      fill: currentColor !important;
    }
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .revenue-forecast {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h5 {
      font-size: 1.25rem !important;
    }
  }
}
</style>
