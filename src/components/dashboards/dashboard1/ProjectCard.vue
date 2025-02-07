<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';

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
    count: 78298,
    change: 31.8,
    history: [3, 5, 5, 7, 6, 5, 3, 5, 3]
  }),
  loading: false
})

const theme = useTheme();
const chartError = ref<string | null>(null);

/* Chart Configuration */
const barchartOptions = computed(() => ({
  chart: {
    fontFamily: 'inherit',
    height: 55,
    type: 'bar',
    offsetX: -3,
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
  colors: [theme.current.value.colors.surface],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'flat',
      borderRadius: 4
    }
  },
  tooltip: {
    theme: theme.current.value.dark ? 'dark' : 'light',
    followCursor: true,
    y: {
      formatter: (value: number) => `${value} projects`
    }
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 0.15
      }
    }
  }
}));

const chartSeries = computed(() => [{
  name: 'Projects',
  data: props.data.history
}]);

const formattedCount = computed(() => new Intl.NumberFormat('en-US').format(props.data.count));

const changeColor = computed(() => props.data.change >= 0 ? 'success' : 'error');
const changeIcon = computed(() => props.data.change >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down');
</script>

<template>
  <v-card
    elevation="0"
    class="project-card"
    color="error"
    :loading="props.loading"
    :aria-label="`Project statistics card showing ${formattedCount} projects`"
  >
    <v-card-item>
      <!-- Header -->
      <div class="d-flex flex-column">
        <span class="text-subtitle-1 text-medium-emphasis mb-1">
          Projects
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
            +{{ props.data.change }}%
          </v-chip>
        </div>
      </div>

      <!-- Chart -->
      <div class="mt-4 mx-n2">
        <v-fade-transition>
          <div v-if="chartError" class="text-error text-caption">
            {{ chartError }}
          </div>
          <apexchart
            v-else
            type="bar"
            height="55"
            :options="barchartOptions"
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
.project-card {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }

  // Ensure chart text is visible on colored background
  :deep(.apexcharts-text) {
    fill: currentColor !important;
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .project-card {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h4 {
      font-size: 1.5rem !important;
    }
  }
}
</style>
