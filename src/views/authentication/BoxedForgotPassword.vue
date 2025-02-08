<template>
  <div class="boxed-forgot-password d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- Card -->
          <v-card class="forgot-password-card">
            <!-- Logo -->
            <div class="text-center pt-8">
              <v-img
                src="@/assets/images/logos/logo.svg"
                height="40"
                class="mx-auto"
              ></v-img>
            </div>

            <v-card-text class="pt-6">
              <!-- Header -->
              <h1 class="text-h4 font-weight-bold text-center mb-2">Forgot Password?</h1>
              <p class="text-body-1 text-medium-emphasis text-center mb-8">
                Enter your email and we'll send you instructions to reset your password
              </p>

              <!-- Form -->
              <v-form @submit.prevent="handleSubmit" v-model="form.valid">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>

                <v-btn
                  color="primary"
                  size="large"
                  block
                  type="submit"
                  :loading="loading"
                  :disabled="!form.valid"
                >
                  Send Reset Link
                </v-btn>

                <!-- Success Alert -->
                <v-alert
                  v-if="showSuccess"
                  type="success"
                  variant="tonal"
                  class="mt-4"
                >
                  Password reset instructions have been sent to your email.
                </v-alert>

                <!-- Error Alert -->
                <v-alert
                  v-if="showError"
                  type="error"
                  variant="tonal"
                  class="mt-4"
                >
                  {{ errorMessage }}
                </v-alert>
              </v-form>

              <!-- Back to Login -->
              <div class="text-center mt-8">
                <v-btn
                  variant="text"
                  to="/auth/login"
                  prepend-icon="mdi-arrow-left"
                >
                  Back to Login
                </v-btn>
              </div>

              <!-- Help Section -->
              <div class="mt-16">
                <h3 class="text-h6 font-weight-bold mb-4">Need Help?</h3>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in helpItems"
                    :key="index"
                    :to="item.to"
                    class="px-0"
                  >
                    <template v-slot:prepend>
                      <v-icon :color="item.color">{{ item.icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BoxedForgotPassword',

  data() {
    return {
      loading: false,
      showSuccess: false,
      showError: false,
      errorMessage: '',
      form: {
        valid: false,
        email: ''
      },
      rules: {
        required: (v: any) => !!v || 'This field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email'
      },
      helpItems: [
        {
          title: 'Contact Support',
          subtitle: 'Get help from our support team',
          icon: 'mdi-lifebuoy',
          color: 'primary',
          to: '/support'
        },
        {
          title: 'FAQs',
          subtitle: 'Find answers to common questions',
          icon: 'mdi-frequently-asked-questions',
          color: 'info',
          to: '/faqs'
        },
        {
          title: 'Documentation',
          subtitle: 'Read our detailed documentation',
          icon: 'mdi-book-open-page-variant',
          color: 'success',
          to: '/docs'
        }
      ]
    }
  },

  methods: {
    async handleSubmit() {
      if (!this.form.valid) return

      this.loading = true
      this.showSuccess = false
      this.showError = false

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Show success message
        this.showSuccess = true

        // Reset form
        this.form.email = ''
        
        // Redirect after delay
        setTimeout(() => {
          this.$router.push('/auth/login')
        }, 3000)
      } catch (error) {
        console.error('Password reset error:', error)
        this.showError = true
        this.errorMessage = 'An error occurred. Please try again later.'
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.boxed-forgot-password {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);

  .forgot-password-card {
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }
}
</style>