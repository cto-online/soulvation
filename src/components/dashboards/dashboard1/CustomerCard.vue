<script setup lang="ts">
import { computed, ref } from 'vue';
import { getSecondary } from '@/utils/UpdateColors';

interface ChartData {
  count: number;
  change: number;
  history: number[];
}

interface Props {
  data?: ChartData;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({
    count: 36358,
    change: -12,
    history: [36, 45, 31, 47, 38, 43]
  }),
  loading: false
})

const chartError = ref<string | null>(null);

/* Chart Configuration */
const areachartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 70,
    sparkline: {
      enabled: true
    },
    group: 'sparklines',
    fontFamily: 'inherit',
    foreColor: '#adb0bb',
    events: {
      error: function(e: Error) {
        chartError.value = e.message;
      }
    }
  },
  colors: [getSecondary.value],
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0,
      inverseColors: false,
      opacityFrom: 0.4,
      opacityTo: 0.9,
      stops: [100]
    }
  },
  markers: {
    size: 0
  },
  tooltip: {
    theme: 'dark',
    fixed: {
      enabled: true,
      position: 'right'
    },
    x: {
      show: false
    },
    y: {
      formatter: (value: number) => `${value} customers`
    }
  }
}));

const chartSeries = computed(() => [{
  name: 'customers',
  data: props.data.history
}]);

const formattedCount = computed(() => new Intl.NumberFormat('en-US').format(props.data.count));

const changeColor = computed(() => props.data.change >= 0 ? 'success' : 'error');
const changeIcon = computed(() => props.data.change >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down');
</script>

<template>
  <v-card
    elevation="0"
    class="customer-card"
    color="secondary"
    :loading="props.loading"
    :aria-label="`Customer statistics card showing ${formattedCount} customers`"
  >
    <v-card-item>
      <!-- Header -->
      <div class="d-flex flex-column">
        <span class="text-subtitle-1 text-medium-emphasis mb-1">
          Customers
        </span>
        <div class="d-flex align-center gap-2">
          <span class="text-h4 font-weight-bold">
            {{ formattedCount }}
          </span>
          <v-chip
            :color="changeColor"
            size="small"
            class="font-weight-medium"
            variant="tonal"
          >
            <v-icon
              :icon="changeIcon"
              size="small"
              start
            ></v-icon>
            {{ props.data.change }}%
          </v-chip>
        </div>
      </div>

      <!-- Chart -->
      <div class="mt-4">
        <v-fade-transition>
          <div v-if="chartError" class="text-error text-caption">
            {{ chartError }}
          </div>
          <apexchart
            v-else
            type="area"
            height="70"
            :options="areachartOptions"
            :series="chartSeries"
          />
        </v-fade-transition>
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
.customer-card {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .customer-card {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h4 {
      font-size: 1.5rem !important;
    }
  }
}
</style>
