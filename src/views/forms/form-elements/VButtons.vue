<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Buttons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn color="primary">Primary</v-btn>
              <v-btn color="secondary">Secondary</v-btn>
              <v-btn color="success">Success</v-btn>
              <v-btn color="error">Error</v-btn>
              <v-btn color="warning">Warning</v-btn>
              <v-btn color="info">Info</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Button Variants -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Button Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn color="primary" variant="flat">Flat</v-btn>
              <v-btn color="primary" variant="outlined">Outlined</v-btn>
              <v-btn color="primary" variant="text">Text</v-btn>
              <v-btn color="primary" variant="plain">Plain</v-btn>
              <v-btn color="primary" variant="tonal">Tonal</v-btn>
              <v-btn color="primary" variant="elevated">Elevated</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Button Sizes -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Button Sizes</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap align-center gap-4">
              <v-btn color="primary" size="x-small">X-Small</v-btn>
              <v-btn color="primary" size="small">Small</v-btn>
              <v-btn color="primary">Default</v-btn>
              <v-btn color="primary" size="large">Large</v-btn>
              <v-btn color="primary" size="x-large">X-Large</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Buttons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Icon Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn icon="mdi-heart" color="error"></v-btn>
              <v-btn icon="mdi-star" color="warning"></v-btn>
              <v-btn icon="mdi-account" color="primary"></v-btn>
              <v-btn icon="mdi-cog" color="secondary"></v-btn>
              <v-btn icon="mdi-bell" color="info"></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Loading Buttons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Loading Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="primary"
                :loading="loading"
                @click="simulateLoading"
              >
                Click Me
              </v-btn>
              <v-btn
                color="secondary"
                :loading="loading"
                loading-text="Processing..."
                @click="simulateLoading"
              >
                With Text
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Block Buttons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Block Buttons</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              block
              class="mb-4"
            >
              Block Button
            </v-btn>
            <v-btn
              color="secondary"
              block
              variant="outlined"
            >
              Block Outlined
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Button Groups -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Button Groups</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <!-- Segmented Button Group -->
              <v-btn-toggle
                v-model="toggle.segmented"
                mandatory
                color="primary"
              >
                <v-btn value="left">Left</v-btn>
                <v-btn value="center">Center</v-btn>
                <v-btn value="right">Right</v-btn>
              </v-btn-toggle>

              <!-- Multiple Selection -->
              <v-btn-toggle
                v-model="toggle.multiple"
                multiple
                color="primary"
              >
                <v-btn value="bold">
                  <v-icon>mdi-format-bold</v-icon>
                </v-btn>
                <v-btn value="italic">
                  <v-icon>mdi-format-italic</v-icon>
                </v-btn>
                <v-btn value="underline">
                  <v-icon>mdi-format-underline</v-icon>
                </v-btn>
              </v-btn-toggle>

              <!-- Rounded Button Group -->
              <v-btn-toggle
                v-model="toggle.rounded"
                rounded="pill"
                color="primary"
              >
                <v-btn value="day">Day</v-btn>
                <v-btn value="week">Week</v-btn>
                <v-btn value="month">Month</v-btn>
                <v-btn value="year">Year</v-btn>
              </v-btn-toggle>
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
  name: 'VButtons',

  data() {
    return {
      loading: false,
      toggle: {
        segmented: 'center',
        multiple: [],
        rounded: 'week'
      }
    }
  },

  methods: {
    async simulateLoading() {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 2000))
      this.loading = false
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
</style>