<template>
  <div class="maintenance d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="text-center">
          <!-- Logo -->
          <v-img
            src="@/assets/images/logos/logo.svg"
            height="40"
            class="mx-auto mb-8"
          ></v-img>

          <!-- Maintenance Image -->
          <v-img
            src="@/assets/images/backgrounds/maintenance.svg"
            max-height="300"
            contain
            class="mb-8"
          ></v-img>

          <!-- Content -->
          <h1 class="text-h2 font-weight-bold mb-4">Under Maintenance</h1>
          <p class="text-body-1 text-medium-emphasis mb-8">
            Sorry for the inconvenience but we're performing some maintenance at the moment.
            We'll be back up shortly!
          </p>

          <!-- Countdown -->
          <div class="countdown d-flex justify-center gap-4 mb-8">
            <div
              v-for="(unit, index) in countdown"
              :key="index"
              class="countdown-unit"
            >
              <div class="text-h3 font-weight-bold">{{ unit.value }}</div>
              <div class="text-caption text-medium-emphasis">{{ unit.label }}</div>
            </div>
          </div>

          <!-- Notification Form -->
          <v-card class="mx-auto" max-width="500">
            <v-card-text>
              <p class="text-body-1 mb-4">
                Get notified when we're back online:
              </p>
              <v-form @submit.prevent="subscribe" v-model="form.valid">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="form.email"
                      label="Email Address"
                      type="email"
                      :rules="[rules.required, rules.email]"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn
                      color="primary"
                      size="large"
                      block
                      type="submit"
                      :loading="loading"
                      :disabled="!form.valid"
                    >
                      Notify Me
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>

          <!-- Social Links -->
          <div class="mt-16">
            <p class="text-body-1 mb-4">Follow us for updates:</p>
            <div class="d-flex justify-center gap-4">
              <v-btn
                v-for="social in socialLinks"
                :key="social.icon"
                :href="social.link"
                target="_blank"
                icon
                :color="social.color"
                variant="flat"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Maintenance',

  data() {
    return {
      loading: false,
      form: {
        valid: false,
        email: ''
      },
      rules: {
        required: (v: any) => !!v || 'Email is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
      },
      countdown: [
        { value: '00', label: 'Days' },
        { value: '00', label: 'Hours' },
        { value: '00', label: 'Minutes' },
        { value: '00', label: 'Seconds' }
      ],
      socialLinks: [
        { icon: 'mdi-twitter', color: 'light-blue', link: '#' },
        { icon: 'mdi-facebook', color: 'blue', link: '#' },
        { icon: 'mdi-instagram', color: 'purple', link: '#' },
        { icon: 'mdi-linkedin', color: 'blue-darken-1', link: '#' }
      ],
      countdownInterval: null as number | null,
      targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    }
  },

  mounted() {
    this.startCountdown()
  },

  methods: {
    startCountdown() {
      this.countdownInterval = window.setInterval(() => {
        const now = new Date().getTime()
        const distance = this.targetDate.getTime() - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        this.countdown = [
          { value: days.toString().padStart(2, '0'), label: 'Days' },
          { value: hours.toString().padStart(2, '0'), label: 'Hours' },
          { value: minutes.toString().padStart(2, '0'), label: 'Minutes' },
          { value: seconds.toString().padStart(2, '0'), label: 'Seconds' }
        ]

        if (distance < 0) {
          if (this.countdownInterval) {
            clearInterval(this.countdownInterval)
          }
        }
      }, 1000)
    },

    async subscribe() {
      if (!this.form.valid) return

      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.form.email = ''
        // Show success message
      } catch (error) {
        console.error('Subscription error:', error)
        // Show error message
      } finally {
        this.loading = false
      }
    }
  },

  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }
  }
})
</script>

<style lang="scss" scoped>
.maintenance {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);

  .countdown {
    .countdown-unit {
      background: var(--v-surface);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      min-width: 100px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>