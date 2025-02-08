<template>
  <div class="side-login d-flex">
    <!-- Left Side: Login Form -->
    <div class="login-form-container pa-8">
      <div class="login-form-wrapper" style="max-width: 400px; margin: 0 auto;">
        <!-- Logo -->
        <div class="text-center mb-8">
          <v-img
            src="@/assets/images/logos/logo.svg"
            height="40"
            class="mx-auto"
          ></v-img>
        </div>

        <!-- Welcome Text -->
        <h1 class="text-h4 font-weight-bold mb-2">Welcome back!</h1>
        <p class="text-body-1 text-medium-emphasis mb-8">
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
      </div>
    </div>

    <!-- Right Side: Background Image -->
    <div class="login-image-container">
      <v-img
        src="@/assets/images/backgrounds/login-bg.jpg"
        cover
        class="h-100"
      >
        <div class="image-overlay pa-16">
          <div class="text-white">
            <h2 class="text-h3 font-weight-bold mb-4">
              Welcome to Our Platform
            </h2>
            <p class="text-h6">
              Discover amazing features and boost your productivity
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
  name: 'SideLogin',

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
.side-login {
  height: 100vh;

  .login-form-container {
    width: 100%;
    max-width: 600px;
    display: flex;
    align-items: center;
    background: var(--v-background);
  }

  .login-image-container {
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