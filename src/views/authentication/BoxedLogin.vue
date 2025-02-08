<template>
  <div class="boxed-login d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- Login Card -->
          <v-card class="login-card">
            <!-- Logo -->
            <div class="text-center pt-8">
              <v-img
                src="@/assets/images/logos/logo.svg"
                height="40"
                class="mx-auto"
              ></v-img>
            </div>

            <v-card-text class="pt-6">
              <!-- Welcome Text -->
              <h1 class="text-h4 font-weight-bold text-center mb-2">Welcome back!</h1>
              <p class="text-body-1 text-medium-emphasis text-center mb-8">
                Please sign in to continue
              </p>

              <!-- Login Form -->
              <v-form @submit.prevent="handleLogin" v-model="form.valid">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>

                <v-text-field
                  v-model="form.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[rules.required, rules.password]"
                  variant="outlined"
                  class="mb-2"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>

                <div class="d-flex justify-space-between align-center mb-6">
                  <v-checkbox
                    v-model="form.rememberMe"
                    label="Remember me"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                  <router-link
                    to="/auth/forgot-password"
                    class="text-primary text-decoration-none"
                  >
                    Forgot Password?
                  </router-link>
                </div>

                <v-btn
                  color="primary"
                  size="large"
                  block
                  type="submit"
                  :loading="loading"
                  :disabled="!form.valid"
                >
                  Sign In
                </v-btn>
              </v-form>

              <!-- Social Login -->
              <div class="my-8">
                <div class="divider-with-text text-center mb-6">
                  <span class="text-medium-emphasis px-4 bg-surface">or continue with</span>
                </div>

                <div class="d-flex gap-4">
                  <v-btn
                    v-for="social in socialLogins"
                    :key="social.icon"
                    :color="social.color"
                    variant="outlined"
                    block
                  >
                    <v-icon :icon="social.icon" start></v-icon>
                    {{ social.name }}
                  </v-btn>
                </div>
              </div>

              <!-- Sign Up Link -->
              <p class="text-center text-body-1">
                Don't have an account?
                <router-link
                  to="/auth/register"
                  class="text-primary text-decoration-none font-weight-medium"
                >
                  Sign up
                </router-link>
              </p>
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
  name: 'BoxedLogin',

  data() {
    return {
      loading: false,
      showPassword: false,
      form: {
        valid: false,
        email: '',
        password: '',
        rememberMe: false
      },
      rules: {
        required: (v: any) => !!v || 'This field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
        password: (v: string) => v.length >= 8 || 'Password must be at least 8 characters'
      },
      socialLogins: [
        { name: 'Google', icon: 'mdi-google', color: 'error' },
        { name: 'Facebook', icon: 'mdi-facebook', color: 'blue' }
      ]
    }
  },

  methods: {
    async handleLogin() {
      if (!this.form.valid) return

      this.loading = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Handle successful login
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        // Handle login error
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.boxed-login {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);

  .login-card {
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  }

  .divider-with-text {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--v-border-color);
      z-index: -1;
    }
  }
}
</style>