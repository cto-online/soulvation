<template>
  <div class="boxed-two-step d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- Two-Step Card -->
          <v-card class="two-step-card">
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
              <h1 class="text-h4 font-weight-bold text-center mb-2">Two-Step Verification</h1>
              <p class="text-body-1 text-medium-emphasis text-center mb-8">
                We sent a verification code to your mobile. Enter the code from the mobile in the field below.
              </p>
              <p class="text-body-2 text-medium-emphasis text-center mb-8">
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
  name: 'BoxedTwoStep',

  data() {
    return {
      verificationCode: ['', '', '', '', '', ''],
      loading: false,
      countdown: 0,
      countdownInterval: null as number | null,
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
.boxed-two-step {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);

  .two-step-card {
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
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