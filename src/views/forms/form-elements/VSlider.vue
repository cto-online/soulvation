<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Slider -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Slider</v-card-title>
          <v-card-text>
            <v-slider
              v-model="basic.value"
              :min="0"
              :max="100"
              :step="1"
              color="primary"
              class="mb-4"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="basic.value"
                  type="number"
                  style="width: 70px"
                  density="compact"
                  variant="outlined"
                  hide-details
                ></v-text-field>
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Range Slider -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Range Slider</v-card-title>
          <v-card-text>
            <v-range-slider
              v-model="range.value"
              :min="0"
              :max="100"
              :step="1"
              color="primary"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-text-field
                  v-model="range.value[0]"
                  type="number"
                  style="width: 70px"
                  density="compact"
                  variant="outlined"
                  hide-details
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  v-model="range.value[1]"
                  type="number"
                  style="width: 70px"
                  density="compact"
                  variant="outlined"
                  hide-details
                ></v-text-field>
              </template>
            </v-range-slider>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Colored Sliders</v-card-title>
          <v-card-text>
            <v-slider
              v-for="(slider, index) in colors.sliders"
              :key="index"
              v-model="slider.value"
              :color="slider.color"
              :label="slider.label"
              class="mb-4"
            ></v-slider>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Thumb Label -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Thumb Label</v-card-title>
          <v-card-text>
            <v-slider
              v-model="thumbLabel.value"
              thumb-label
              class="mb-4"
            ></v-slider>
            <v-slider
              v-model="thumbLabel.customValue"
              thumb-label="always"
              class="mb-4"
            >
              <template v-slot:thumb-label="{ modelValue }">
                ${{ modelValue }}
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Ticks -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Ticks</v-card-title>
          <v-card-text>
            <v-slider
              v-model="ticks.value"
              :ticks="ticks.labels"
              :max="3"
              step="1"
              show-ticks="always"
              tick-size="4"
              class="mb-4"
            >
              <template v-slot:tick="{ value }">
                {{ ticks.labels[value] }}
              </template>
            </v-slider>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Vertical -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Vertical Slider</v-card-title>
          <v-card-text>
            <div class="d-flex align-center justify-space-around" style="height: 300px">
              <v-slider
                v-model="vertical.value1"
                direction="vertical"
                class="mx-2"
              ></v-slider>
              <v-slider
                v-model="vertical.value2"
                direction="vertical"
                thumb-label="always"
                class="mx-2"
              ></v-slider>
              <v-range-slider
                v-model="vertical.range"
                direction="vertical"
                class="mx-2"
              ></v-range-slider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VSlider',

  data() {
    return {
      basic: {
        value: 50
      },
      range: {
        value: [20, 80]
      },
      colors: {
        sliders: [
          { value: 25, color: 'primary', label: 'Primary' },
          { value: 50, color: 'secondary', label: 'Secondary' },
          { value: 75, color: 'success', label: 'Success' },
          { value: 100, color: 'info', label: 'Info' },
          { value: 90, color: 'warning', label: 'Warning' },
          { value: 60, color: 'error', label: 'Error' }
        ]
      },
      thumbLabel: {
        value: 50,
        customValue: 40
      },
      ticks: {
        value: 1,
        labels: {
          0: 'Low',
          1: 'Medium',
          2: 'High',
          3: 'Critical'
        }
      },
      vertical: {
        value1: 30,
        value2: 70,
        range: [20, 80]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card {
  height: 100%;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1rem;
}

.v-card-text {
  padding: 1rem;
}
</style>