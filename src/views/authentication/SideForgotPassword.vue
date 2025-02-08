<template>
  <div class="side-forgot-password d-flex">
    <!-- Left Side: Form -->
    <div class="form-container pa-8">
      <div class="form-wrapper" style="max-width: 400px; margin: 0 auto;">
        <!-- Logo -->
        <div class="text-center mb-8">
          <v-img
            src="@/assets/images/logos/logo.svg"
            height="40"
            class="mx-auto"
          ></v-img>
        </div>

        <!-- Header -->
        <h1 class="text-h4 font-weight-bold mb-2">Forgot Password?</h1>
        <p class="text-body-1 text-medium-emphasis mb-8">
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
      </div>
    </div>

    <!-- Right Side: Background Image -->
    <div class="image-container">
      <v-img
        src="@/assets/images/backgrounds/forgot-password-bg.jpg"
        cover
        class="h-100"
      >
        <div class="image-overlay pa-16">
          <div class="text-white">
            <h2 class="text-h3 font-weight-bold mb-4">
              Password Recovery
            </h2>
            <p class="text-h6">
              We'll help you get back to your account securely
            </p>
          </div>
        </div>
      </v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideForgotPassword',

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
.side-forgot-password {
  height: 100vh;

  .form-container {
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    background: var(--v-background);
  }

  .image-container {
    flex: 1;
    position: relative;
    display: none;

    @media (min-width: 960px) {
      display: block;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>