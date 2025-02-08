<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Date Picker -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Date Picker</v-card-title>
          <v-card-text>
            <v-date-picker
              v-model="basic.date"
              class="mb-4"
            ></v-date-picker>
            <v-text-field
              v-model="basic.date"
              label="Selected Date"
              readonly
              variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Time Picker -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Time Picker</v-card-title>
          <v-card-text>
            <v-time-picker
              v-model="basic.time"
              class="mb-4"
            ></v-time-picker>
            <v-text-field
              v-model="basic.time"
              label="Selected Time"
              readonly
              variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Date Range -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Date Range</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="range.start"
                  label="Start Date"
                  type="date"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="range.end"
                  label="End Date"
                  type="date"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid">
              <v-text-field
                v-model="validation.date"
                label="Required Date"
                type="date"
                :rules="validation.rules"
                variant="outlined"
                class="mb-4"
              ></v-text-field>
              <v-btn
                color="primary"
                :disabled="!validation.valid"
                @click="submitValidation"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Format -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Format</v-card-title>
          <v-card-text>
            <v-menu
              v-model="custom.menu"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="custom.formattedDate"
                  label="Custom Format"
                  readonly
                  v-bind="props"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="custom.date"
                @update:model-value="custom.menu = false"
              ></v-date-picker>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Date Time Combined -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Date Time Combined</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="combined.dateMenu"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="combined.date"
                      label="Date"
                      readonly
                      v-bind="props"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="combined.date"
                    @update:model-value="combined.dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="combined.timeMenu"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="combined.time"
                      label="Time"
                      readonly
                      v-bind="props"
                      variant="outlined"
                      prepend-inner-icon="mdi-clock"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="combined.time"
                    @update:model-value="combined.timeMenu = false"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <div class="mt-4">
              Selected DateTime: {{ combinedDateTime }}
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
  name: 'VDateTime',

  data() {
    return {
      basic: {
        date: new Date().toISOString().substr(0, 10),
        time: '12:00'
      },
      range: {
        start: '',
        end: ''
      },
      validation: {
        valid: true,
        date: '',
        rules: [
          (v: string) => !!v || 'Date is required',
          (v: string) => {
            const date = new Date(v)
            return date >= new Date() || 'Date must be in the future'
          }
        ]
      },
      custom: {
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        formattedDate: this.formatDate(new Date())
      },
      combined: {
        dateMenu: false,
        timeMenu: false,
        date: new Date().toISOString().substr(0, 10),
        time: '12:00'
      }
    }
  },

  computed: {
    combinedDateTime(): string {
      if (!this.combined.date || !this.combined.time) return ''
      return `${this.formatDate(new Date(this.combined.date))} ${this.combined.time}`
    }
  },

  watch: {
    'custom.date'(val: string) {
      this.custom.formattedDate = this.formatDate(new Date(val))
    }
  },

  methods: {
    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return date.toLocaleDateString('en-US', options)
    },

    submitValidation() {
      console.log('Form submitted:', this.validation.date)
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