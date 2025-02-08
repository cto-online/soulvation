<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Slider -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Slider</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-slider
                v-model="value"
                :min="0"
                :max="100"
              ></v-slider>

              <v-slider
                v-model="value"
                :min="0"
                :max="100"
                color="primary"
                thumb-label
              ></v-slider>

              <v-slider
                v-model="value"
                :min="0"
                :max="100"
                color="primary"
                thumb-label="always"
              ></v-slider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Slider Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Slider Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-slider
                v-for="(color, index) in colors"
                :key="index"
                v-model="colorValues[color]"
                :color="color"
                :thumb-label="true"
              ></v-slider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Range Slider -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Range Slider</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-range-slider
                v-model="range"
                :min="0"
                :max="100"
                color="primary"
                thumb-label
              ></v-range-slider>

              <v-range-slider
                v-model="range"
                :min="0"
                :max="100"
                color="primary"
                thumb-label="always"
                :step="10"
                :ticks="true"
              ></v-range-slider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Slider -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Slider</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-slider
                v-model="customValue"
                :min="0"
                :max="100"
                color="primary"
                thumb-label
              >
                <template v-slot:thumb-label="{ modelValue }">
                  <v-icon>{{ getIconForValue(modelValue) }}</v-icon>
                </template>
              </v-slider>

              <v-slider
                v-model="customValue"
                :min="0"
                :max="100"
                color="primary"
                :step="25"
                ticks="always"
                :tick-size="4"
                thumb-label="always"
                :track-size="6"
              >
                <template v-slot:tick="{ value }">
                  <div class="text-caption">{{ value }}%</div>
                </template>
              </v-slider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Slider -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Slider</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title>Volume Control</v-card-title>
                  <v-card-text>
                    <v-slider
                      v-model="volume"
                      :min="0"
                      :max="100"
                      :color="getVolumeColor"
                      thumb-label
                    >
                      <template v-slot:prepend>
                        <v-btn
                          :icon="getVolumeIcon"
                          @click="toggleMute"
                          :color="getVolumeColor"
                          variant="text"
                        ></v-btn>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          v-model="volume"
                          type="number"
                          style="width: 70px"
                          density="compact"
                          hide-details
                          :max="100"
                          :min="0"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title>Image Filters</v-card-title>
                  <v-card-text>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                      height="200"
                      cover
                      :style="filterStyle"
                    ></v-img>
                    <div class="mt-4">
                      <div
                        v-for="(filter, key) in filters"
                        :key="key"
                        class="mb-2"
                      >
                        <div class="d-flex justify-space-between mb-1">
                          <span class="text-caption">{{ filter.label }}</span>
                          <span class="text-caption">{{ filter.value }}{{ filter.unit }}</span>
                        </div>
                        <v-slider
                          v-model="filter.value"
                          :min="filter.min"
                          :max="filter.max"
                          :step="filter.step"
                          :color="filter.color"
                          thumb-label
                        ></v-slider>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiSlider',

  data() {
    return {
      value: 50,
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorValues: {
        primary: 60,
        secondary: 45,
        success: 80,
        info: 30,
        warning: 70,
        error: 20
      },
      range: [20, 80],
      customValue: 50,
      volume: 50,
      previousVolume: 50,
      filters: {
        brightness: {
          label: 'Brightness',
          value: 100,
          min: 0,
          max: 200,
          step: 1,
          unit: '%',
          color: 'warning'
        },
        contrast: {
          label: 'Contrast',
          value: 100,
          min: 0,
          max: 200,
          step: 1,
          unit: '%',
          color: 'error'
        },
        saturate: {
          label: 'Saturation',
          value: 100,
          min: 0,
          max: 200,
          step: 1,
          unit: '%',
          color: 'success'
        },
        blur: {
          label: 'Blur',
          value: 0,
          min: 0,
          max: 10,
          step: 0.1,
          unit: 'px',
          color: 'info'
        }
      }
    }
  },

  computed: {
    getVolumeIcon(): string {
      if (this.volume === 0) return 'mdi-volume-off'
      if (this.volume < 30) return 'mdi-volume-low'
      if (this.volume < 70) return 'mdi-volume-medium'
      return 'mdi-volume-high'
    },

    getVolumeColor(): string {
      if (this.volume === 0) return 'error'
      if (this.volume < 30) return 'warning'
      return 'success'
    },

    filterStyle(): string {
      return `
        filter: 
          brightness(${this.filters.brightness.value}%)
          contrast(${this.filters.contrast.value}%)
          saturate(${this.filters.saturate.value}%)
          blur(${this.filters.blur.value}px)
      `
    }
  },

  methods: {
    getIconForValue(value: number): string {
      if (value < 20) return 'mdi-emoticon-sad'
      if (value < 40) return 'mdi-emoticon-neutral'
      if (value < 60) return 'mdi-emoticon'
      if (value < 80) return 'mdi-emoticon-happy'
      return 'mdi-emoticon-excited'
    },

    toggleMute() {
      if (this.volume === 0) {
        this.volume = this.previousVolume
      } else {
        this.previousVolume = this.volume
        this.volume = 0
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

.gap-4 {
  gap: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>