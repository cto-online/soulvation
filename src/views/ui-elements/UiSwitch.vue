<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Switches -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Switches</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-switch
                v-model="switch1"
                label="Default Switch"
              ></v-switch>

              <v-switch
                v-model="switch2"
                label="With Hint"
                hint="This is a hint text"
                persistent-hint
              ></v-switch>

              <v-switch
                v-model="switch3"
                label="With Rules"
                :rules="[v => !!v || 'Switch must be enabled']"
              ></v-switch>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Switch Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Switch Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-switch
                v-for="(color, index) in colors"
                :key="index"
                v-model="colorSwitches[color]"
                :label="color"
                :color="color"
              ></v-switch>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Switch Variants -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Switch Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-switch
                v-for="variant in variants"
                :key="variant"
                v-model="variantSwitches[variant]"
                :label="variant"
                color="primary"
                :variant="variant"
              ></v-switch>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Switch Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Switch Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-switch
                v-model="iconSwitch1"
                color="success"
                true-icon="mdi-check"
                false-icon="mdi-close"
                label="With Icons"
              ></v-switch>

              <v-switch
                v-model="iconSwitch2"
                color="warning"
                true-icon="mdi-weather-sunny"
                false-icon="mdi-weather-night"
                label="Light/Dark Mode"
              ></v-switch>

              <v-switch
                v-model="iconSwitch3"
                color="error"
                true-icon="mdi-bell"
                false-icon="mdi-bell-off"
                label="Notifications"
              ></v-switch>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Switches -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Switches</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title>App Settings</v-card-title>
                  <v-card-text>
                    <div class="d-flex flex-column gap-4">
                      <v-switch
                        v-for="(setting, index) in settings"
                        :key="index"
                        v-model="setting.value"
                        :label="setting.label"
                        :color="setting.color"
                        :true-icon="setting.icon"
                        :false-icon="setting.icon"
                        :hint="setting.hint"
                        persistent-hint
                      ></v-switch>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-title>Theme Customization</v-card-title>
                  <v-card-text>
                    <div class="d-flex flex-column gap-4">
                      <v-switch
                        v-model="themeSettings.darkMode"
                        label="Dark Mode"
                        color="primary"
                        true-icon="mdi-weather-night"
                        false-icon="mdi-weather-sunny"
                        @update:model-value="updateTheme"
                      ></v-switch>

                      <v-switch
                        v-model="themeSettings.animations"
                        label="Enable Animations"
                        color="success"
                        :disabled="!themeSettings.darkMode"
                      ></v-switch>

                      <v-switch
                        v-model="themeSettings.reducedMotion"
                        label="Reduced Motion"
                        color="info"
                        :disabled="!themeSettings.animations"
                      ></v-switch>
                    </div>

                    <v-divider class="my-4"></v-divider>

                    <div class="preview-box pa-4" :class="previewClasses">
                      <div class="text-h6 mb-2">Preview</div>
                      <p>This box demonstrates your current theme settings.</p>
                      <v-btn
                        color="primary"
                        class="mt-2"
                        :class="{ 'animate-button': themeSettings.animations }"
                      >
                        Sample Button
                      </v-btn>
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
  name: 'UiSwitch',

  data() {
    return {
      switch1: false,
      switch2: false,
      switch3: false,
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorSwitches: {
        primary: true,
        secondary: false,
        success: true,
        info: false,
        warning: true,
        error: false
      },
      variants: ['default', 'inset', 'flat'],
      variantSwitches: {
        default: false,
        inset: false,
        flat: false
      },
      iconSwitch1: false,
      iconSwitch2: false,
      iconSwitch3: false,
      settings: [
        {
          label: 'Notifications',
          value: true,
          color: 'success',
          icon: 'mdi-bell',
          hint: 'Receive push notifications'
        },
        {
          label: 'Auto Update',
          value: false,
          color: 'info',
          icon: 'mdi-update',
          hint: 'Keep app up to date'
        },
        {
          label: 'Data Sync',
          value: true,
          color: 'warning',
          icon: 'mdi-sync',
          hint: 'Sync data across devices'
        },
        {
          label: 'Analytics',
          value: false,
          color: 'error',
          icon: 'mdi-chart-bar',
          hint: 'Share anonymous usage data'
        }
      ],
      themeSettings: {
        darkMode: false,
        animations: true,
        reducedMotion: false
      }
    }
  },

  computed: {
    previewClasses() {
      return {
        'bg-dark': this.themeSettings.darkMode,
        'text-white': this.themeSettings.darkMode,
        'reduced-motion': this.themeSettings.reducedMotion && this.themeSettings.animations
      }
    }
  },

  methods: {
    updateTheme() {
      // Handle theme update
      console.log('Theme updated:', this.themeSettings)
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

.preview-box {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 4px;
  transition: all 0.3s ease;

  &.bg-dark {
    background-color: #1E1E1E;
  }
}

.animate-button {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.reduced-motion {
  .animate-button {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>