<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

interface SalesMetric {
  label: string;
  value: number;
  color: string;
  description: string;
}

interface Props {
  metrics?: SalesMetric[];
  loading?: boolean;
}

const theme = useTheme();
const chartError = ref<string | null>(null);

const props = withDefaults(defineProps<Props>(), {
  metrics: () => [
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
  ],
  loading: false
})

/* Chart Configuration */
const chartOptions = computed(() => ({
  labels: props.metrics.map(m => `${m.value}%`),
  chart: {
    type: 'radialBar',
    height: 220,
    fontFamily: 'inherit',
    foreColor: theme.current.value.colors.textPrimary,
    events: {
      error: function(e: Error) {
        chartError.value = e.message;
      }
    }
  },
  plotOptions: {
    radialBar: {
      inverseOrder: false,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 1,
        size: '40%'
      },
      track: {
        background: theme.current.value.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        strokeWidth: '100%'
      },
      dataLabels: {
        name: {
          show: true,
          fontSize: '14px',
          fontWeight: 600,
          offsetY: -10
        },
        value: {
          show: true,
          fontSize: '16px',
          fontWeight: 400,
          formatter: (val: number) => `${val}%`
        }
      }
    }
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    labels: {
      colors: theme.current.value.colors.textPrimary
    }
  },
  stroke: {
    lineCap: 'round'
  },
  tooltip: {
    enabled: true,
    theme: theme.current.value.dark ? 'dark' : 'light',
    y: {
      formatter: (val: number) => `${val}%`
    }
  },
  colors: props.metrics.map(m => theme.current.value.colors[m.color])
}));

const chartSeries = computed(() => props.metrics.map(m => m.value));

// Calculate percentage markers
const percentageMarkers = [0, 25, 50, 75].map(value => ({
  value,
  position: calculateMarkerPosition(value)
}));

function calculateMarkerPosition(percentage: number): { top: string; left: string } {
  const angle = (percentage / 100) * 270 - 135; // -135 to align with chart start angle
  const radius = 120; // Adjust based on chart size
  const radian = (angle * Math.PI) / 180;
  
  const x = Math.cos(radian) * radius + 50;
  const y = Math.sin(radian) * radius + 50;
  
  return {
    top: `${y}%`,
    left: `${x}%`
  };
}
</script>

<template>
  <v-card
    elevation="10"
    class="sales-overview"
    :loading="props.loading"
    :aria-label="'Sales overview showing metrics for ' + props.metrics.map(m => m.label).join(', ')"
  >
    <v-card-item>
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-h5 mb-1">Sales Overview</h2>
        <span class="text-subtitle-1 text-medium-emphasis">
          Last 7 days
        </span>
      </div>

      <!-- Chart -->
      <div class="chart-container">
        <v-fade-transition>
          <div v-if="chartError" class="text-error text-caption">
            {{ chartError }}
          </div>
          <div v-else class="position-relative">
            <!-- Percentage Markers -->
            <div
              v-for="marker in percentageMarkers"
              :key="marker.value"
              class="percentage-marker"
              :style="{
                top: marker.position.top,
                left: marker.position.left
              }"
              aria-hidden="true"
            >
              <span class="text-caption text-medium-emphasis">
                {{ marker.value }}%
              </span>
            </div>

            <apexchart
              type="radialBar"
              height="220"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </v-fade-transition>
      </div>

      <!-- Legend -->
      <div class="mt-4">
        <v-row dense>
          <v-col
            v-for="metric in props.metrics"
            :key="metric.label"
            cols="12"
            sm="4"
          >
            <div class="d-flex align-center gap-2 pa-2">
              <v-avatar
                :color="metric.color"
                size="10"
                class="rounded-circle"
                aria-hidden="true"
              ></v-avatar>
              <div>
                <div class="text-body-2 font-weight-medium">
                  {{ metric.label }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  {{ metric.value }}%
                </div>
              </div>
            </div>
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
.sales-overview {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }

  .chart-container {
    position: relative;
    margin: 0 -8px;
    
    :deep(.apexcharts-text) {
      fill: currentColor !important;
    }
  }

  .percentage-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .sales-overview {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h5 {
      font-size: 1.25rem !important;
    }
  }
}
</style>
