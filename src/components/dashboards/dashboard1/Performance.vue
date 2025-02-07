<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useTheme } from 'vuetify';

interface PerformanceMetric {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  value: number;
}

interface Props {
  metrics?: PerformanceMetric[];
  lastChecked?: string;
  totalScore?: number;
  loading?: boolean;
}

const theme = useTheme();
const chartError = ref<string | null>(null);

const props = withDefaults(defineProps<Props>(), {
  metrics: () => [
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
  lastChecked: '25 February',
  totalScore: 275,
  loading: false
})

/* Chart Configuration */
const chartOptions = computed(() => ({
  labels: props.metrics.map(m => m.title),
  chart: {
    height: 230,
    fontFamily: 'inherit',
    type: 'donut',
    events: {
      error: function(e: Error) {
        chartError.value = e.message;
      }
    }
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
      donut: {
        size: '90%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            color: theme.current.value.colors.textPrimary
          },
          value: {
            show: true,
            fontSize: '16px',
            color: theme.current.value.colors.textPrimary,
            formatter: (value: number) => `${value}%`
          }
        }
      }
    }
  },
  grid: {
    padding: {
      bottom: -80
    }
  },
  legend: {
    show: false
  },
  stroke: {
    width: 2,
    colors: [theme.current.value.colors.surface]
  },
  tooltip: {
    theme: theme.current.value.dark ? 'dark' : 'light',
    fillSeriesColor: false,
    y: {
      formatter: (value: number) => `${value}%`
    }
  },
  colors: props.metrics.map(m => theme.current.value.colors[m.color]),
  responsive: [
    {
      breakpoint: 1370,
      options: {
        chart: {
          height: 180
        }
      }
    },
    {
      breakpoint: 600,
      options: {
        chart: {
          height: 200
        }
      }
    }
  ]
}));

const chartSeries = computed(() => props.metrics.map(m => m.value));
</script>

<template>
  <v-card
    elevation="10"
    class="performance-card"
    :loading="props.loading"
    :aria-label="`Performance metrics overview, last checked ${props.lastChecked}`"
  >
    <v-card-item>
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-h5 mb-1">Your Performance</h2>
        <span class="text-subtitle-1 text-medium-emphasis">
          Last check on {{ props.lastChecked }}
        </span>
      </div>

      <v-row>
        <!-- Metrics List -->
        <v-col cols="12" md="6">
          <div class="d-flex flex-column gap-4">
            <div
              v-for="metric in props.metrics"
              :key="metric.title"
              class="d-flex gap-3 align-center"
            >
              <v-avatar
                :color="`${metric.color}-lighten-4`"
                size="45"
                rounded="md"
                aria-hidden="true"
              >
                <Icon
                  :icon="`solar:${metric.icon}`"
                  :height="25"
                  :class="`text-${metric.color}`"
                />
              </v-avatar>
              <div>
                <h3 class="text-subtitle-1 font-weight-medium mb-1">
                  {{ metric.title }}
                </h3>
                <span class="text-medium-emphasis">{{ metric.subtitle }}</span>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Chart -->
        <v-col cols="12" md="6">
          <div class="text-center chart-container">
            <v-fade-transition>
              <div v-if="chartError" class="text-error text-caption">
                {{ chartError }}
              </div>
              <apexchart
                v-else
                type="donut"
                height="230"
                :options="chartOptions"
                :series="chartSeries"
              />
            </v-fade-transition>

            <div class="mt-n4">
              <h2 class="text-h2 font-weight-bold">
                {{ props.totalScore }}
              </h2>
              <p class="text-medium-emphasis mt-3 mb-0">
                Learn insights how to manage all aspects of your startup.
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
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
.performance-card {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }

  .chart-container {
    :deep(.apexcharts-text) {
      fill: currentColor !important;
    }
  }
}

// Responsive adjustments
@media (max-width: 960px) {
  .performance-card {
    .chart-container {
      margin-top: 24px;
    }
  }
}

@media (max-width: 600px) {
  .performance-card {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h5 {
      font-size: 1.25rem !important;
    }
    
    .text-h2 {
      font-size: 2.5rem !important;
    }
  }
}
</style>