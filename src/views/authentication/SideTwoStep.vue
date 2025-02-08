<template>
  <div class="side-two-step d-flex">
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
        <h1 class="text-h4 font-weight-bold mb-2">Two-Step Verification</h1>
        <p class="text-body-1 text-medium-emphasis mb-8">
          We sent a verification code to your mobile. Enter the code from the mobile in the field below.
        </p>
        <p class="text-body-2 text-medium-emphasis mb-8">
          <strong>Phone Number:</strong> ***-***-7890
        </p>

        <!-- Code Input -->
        <div class="verification-code mb-8">
          <div class="d-flex justify-space-between">
            <v-text-field
              v-for="(digit, index) in verificationCode"
              :key="index"
              v-model="verificationCode[index]"
              type="text"
              maxlength="1"
              class="verification-input"
              variant="outlined"
              @input="handleInput(index)"
              @keydown.delete="handleDelete(index)"
              @keydown.left="focusPrevious(index)"
              @keydown.right="focusNext(index)"
              ref="inputs"
            ></v-text-field>
          </div>
        </div>

        <v-btn
          color="primary"
          size="large"
          block
          :loading="loading"
          :disabled="!isCodeComplete"
          @click="verifyCode"
        >
          Verify My Account
        </v-btn>

        <!-- Resend Code -->
        <div class="text-center mt-8">
          <p class="text-body-1 text-medium-emphasis mb-2">
            Didn't get the code?
          </p>
          <v-btn
            variant="text"
            color="primary"
            :disabled="countdown > 0"
            @click="resendCode"
          >
            {{ countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code' }}
          </v-btn>
        </div>

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
      </div>
    </div>

    <!-- Right Side: Background Image -->
    <div class="image-container">
      <v-img
        src="@/assets/images/backgrounds/two-step-bg.jpg"
        cover
        class="h-100"
      >
        <div class="image-overlay pa-16">
          <div class="text-white">
            <h2 class="text-h3 font-weight-bold mb-4">
              Enhanced Security
            </h2>
            <p class="text-h6">
              Protecting your account with two-step verification
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
  name: 'SideTwoStep',

  data() {
    return {
      verificationCode: ['', '', '', '', '', ''],
      loading: false,
      countdown: 0,
      countdownInterval: null as number | null
    }
  },

  computed: {
    isCodeComplete(): boolean {
      return this.verificationCode.every(digit => digit !== '')
    }
  },

  methods: {
    handleInput(index: number) {
      const value = this.verificationCode[index]
      if (value.length > 1) {
        this.verificationCode[index] = value.slice(-1)
      }
      if (value && index < 5) {
        this.focusNext(index)
      }
    },

    handleDelete(index: number) {
      if (!this.verificationCode[index] && index > 0) {
        this.focusPrevious(index)
      }
    },

    focusPrevious(index: number) {
      if (index > 0) {
        const previousInput = this.$refs.inputs[index - 1] as any
        previousInput?.focus()
      }
    },

    focusNext(index: number) {
      if (index < 5) {
        const nextInput = this.$refs.inputs[index + 1] as any
        nextInput?.focus()
      }
    },

    async verifyCode() {
      if (!this.isCodeComplete) return

      this.loading = true
      const code = this.verificationCode.join('')

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Redirect to dashboard on success
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Verification error:', error)
        // Handle verification error
      } finally {
        this.loading = false
      }
    },

    resendCode() {
      if (this.countdown > 0) return

      // Start countdown
      this.countdown = 30
      this.countdownInterval = window.setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          if (this.countdownInterval) {
            clearInterval(this.countdownInterval)
          }
        }
      }, 1000)

      // Clear previous code
      this.verificationCode = ['', '', '', '', '', '']

      // Focus first input
      this.$nextTick(() => {
        const firstInput = this.$refs.inputs[0] as any
        firstInput?.focus()
      })
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
.side-two-step {
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

  .verification-code {
    .verification-input {
      width: 50px;
      margin: 0 4px;

      :deep(.v-field__input) {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0;
      }
    }
  }
}
</style>