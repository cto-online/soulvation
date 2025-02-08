<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Time Picker -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Time Picker</v-card-title>
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

      <!-- 24h Format -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>24h Format</v-card-title>
          <v-card-text>
            <v-time-picker
              v-model="format24h.time"
              format="24hr"
              class="mb-4"
            ></v-time-picker>
            <v-text-field
              v-model="format24h.time"
              label="Selected Time"
              readonly
              variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Seconds -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Seconds</v-card-title>
          <v-card-text>
            <v-time-picker
              v-model="withSeconds.time"
              use-seconds
              class="mb-4"
            ></v-time-picker>
            <v-text-field
              v-model="withSeconds.time"
              label="Selected Time"
              readonly
              variant="outlined"
            ></v-text-field>
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
                v-model="validation.time"
                label="Required Time"
                type="time"
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

      <!-- Time Range -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Time Range</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="range.start"
                  label="Start Time"
                  type="time"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="range.end"
                  label="End Time"
                  type="time"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="mt-4">
              Duration: {{ calculateDuration }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dialog Time Picker -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Dialog Time Picker</v-card-title>
          <v-card-text>
            <v-menu
              v-model="dialog.menu"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="dialog.time"
                  label="Pick Time"
                  readonly
                  v-bind="props"
                  variant="outlined"
                  prepend-inner-icon="mdi-clock"
                ></v-text-field>
              </template>
              <v-time-picker
                v-model="dialog.time"
                @update:model-value="dialog.menu = false"
              ></v-time-picker>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VTimePicker',

  data() {
    return {
      basic: {
        time: '12:00'
      },
      format24h: {
        time: '14:00'
      },
      withSeconds: {
        time: '12:00:00'
      },
      validation: {
        valid: true,
        time: '',
        rules: [
          (v: string) => !!v || 'Time is required',
          (v: string) => {
            const [hours] = v.split(':').map(Number)
            return hours >= 9 && hours <= 17 || 'Time must be between 9 AM and 5 PM'
          }
        ]
      },
      range: {
        start: '09:00',
        end: '17:00'
      },
      dialog: {
        menu: false,
        time: '12:00'
      }
    }
  },

  computed: {
    calculateDuration(): string {
      if (!this.range.start || !this.range.end) return ''

      const [startHours, startMinutes] = this.range.start.split(':').map(Number)
      const [endHours, endMinutes] = this.range.end.split(':').map(Number)

      let diffMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes)
      if (diffMinutes < 0) diffMinutes += 24 * 60

      const hours = Math.floor(diffMinutes / 60)
      const minutes = diffMinutes % 60

      return `${hours} hours ${minutes} minutes`
    }
  },

  methods: {
    submitValidation() {
      console.log('Form submitted:', this.validation.time)
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