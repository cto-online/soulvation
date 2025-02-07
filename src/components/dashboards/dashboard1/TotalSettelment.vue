<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useTheme } from 'vuetify';

interface SettlementData {
  total: number;
  balance: number;
  withdrawals: number;
  history: number[];
  weeks: string[];
}

interface Props {
  data?: SettlementData;
  loading?: boolean;
}

const theme = useTheme();
const chartError = ref<string | null>(null);

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    total: 122580,
    balance: 122580,
    withdrawals: 31640,
    history: [40, 40, 80, 80, 30, 30, 10, 10, 30, 30, 100, 100, 20, 20, 140, 140],
    weeks: ['1W', '', '3W', '', '5W', '6W', '7W', '8W', '9W', '', '11W', '', '13W', '', '15W']
  }),
  loading: false
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

/* Chart Configuration */
const chartOptions = computed(() => ({
  chart: {
    fontFamily: 'inherit',
    type: 'line',
    height: 315,
    toolbar: { 
      show: false 
    },
    events: {
      error: function(e: Error) {
        chartError.value = e.message;
      }
    }
  },
  legend: { 
    show: false 
  },
  dataLabels: { 
    enabled: false 
  },
  stroke: {
    curve: 'smooth',
    show: true,
    width: 2,
    colors: [theme.current.value.colors.primary]
  },
  xaxis: {
    categories: props.data.weeks,
    axisBorder: { 
      show: false 
    },
    axisTicks: { 
      show: false 
    },
    tickAmount: 6,
    labels: {
      rotate: 0,
      rotateAlways: true,
      style: {
        fontSize: '12px',
        colors: theme.current.value.colors.textPrimary,
        fontWeight: '500'
      }
    }
  },
  yaxis: {
    show: false,
    tickAmount: 3
  },
  tooltip: {
    theme: theme.current.value.dark ? 'dark' : 'light',
    y: {
      formatter: (value: number) => currencyFormatter.format(value * 1000)
    }
  },
  colors: [theme.current.value.colors.primary],
  grid: {
    borderColor: `rgba(var(--v-theme-primary), 0.1)`,
    strokeDashArray: 4,
    yaxis: { 
      show: false 
    }
  },
  markers: {
    strokeColors: [theme.current.value.colors.primary],
    strokeWidth: 3,
    hover: {
      size: 6
    }
  }
}));

const chartSeries = computed(() => [{
  name: 'Settlements',
  data: props.data.history
}]);
</script>

<template>
  <v-card
    elevation="10"
    class="settlement-card"
    color="primary-lighten-5"
    :loading="props.loading"
    :aria-label="'Total settlements overview showing ' + currencyFormatter.format(props.data.total)"
  >
    <v-card-item>
      <!-- Header -->
      <div class="d-flex gap-3 align-center">
        <v-avatar
          size="48"
          class="rounded-md bg-surface"
          aria-hidden="true"
        >
          <Icon
            icon="solar:box-linear"
            class="text-primary"
            :height="25"
          />
        </v-avatar>
        <div>
          <span class="text-subtitle-1 text-primary">
            Total Settlements
          </span>
          <h2 class="text-h3 font-weight-bold mt-1">
            {{ currencyFormatter.format(props.data.total) }}
          </h2>
        </div>
      </div>

      <!-- Chart -->
      <div class="chart-container mt-6">
        <v-fade-transition>
          <div v-if="chartError" class="text-error text-caption">
            {{ chartError }}
          </div>
          <apexchart
            v-else
            type="line"
            height="315"
            :options="chartOptions"
            :series="chartSeries"
          />
        </v-fade-transition>
      </div>

      <!-- Stats -->
      <div class="mt-4">
        <v-row no-gutters class="stats-container">
          <!-- Balance -->
          <v-col cols="6" class="pa-4 text-center">
            <p class="text-subtitle-1 text-primary mb-2">
              Total Balance
            </p>
            <span class="text-h3 font-weight-bold">
              {{ currencyFormatter.format(props.data.balance) }}
            </span>
          </v-col>

          <!-- Withdrawals -->
          <v-col cols="6" class="pa-4 text-center border-start">
            <p class="text-subtitle-1 text-primary mb-2">
              Withdrawals
            </p>
            <span class="text-h3 font-weight-bold">
              {{ currencyFormatter.format(props.data.withdrawals) }}
            </span>
          </v-col>
        </v-row>
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
.settlement-card {
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

  .stats-container {
    background: rgba(var(--v-theme-surface), 0.8);
    border-radius: 12px;
    backdrop-filter: blur(10px);

    .border-start {
      border-left: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }
}

// Responsive adjustments
@media (max-width: 960px) {
  .settlement-card {
    .text-h3 {
      font-size: 1.75rem !important;
    }
  }
}

@media (max-width: 600px) {
  .settlement-card {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h3 {
      font-size: 1.5rem !important;
    }

    .stats-container {
      .pa-4 {
        padding: 12px !important;
      }
    }
  }
}
</style>
