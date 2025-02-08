<template>
  <div class="boxed-register d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <!-- Register Card -->
          <v-card class="register-card">
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
              <h1 class="text-h4 font-weight-bold text-center mb-2">Get Started</h1>
              <p class="text-body-1 text-medium-emphasis text-center mb-8">
                Create your account to continue
              </p>

              <!-- Register Form -->
              <v-form @submit.prevent="handleRegister" v-model="form.valid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.firstName"
                      label="First Name"
                      :rules="[rules.required]"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.lastName"
                      label="Last Name"
                      :rules="[rules.required]"
                      variant="outlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

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
                  class="mb-4"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>

                <v-text-field
                  v-model="form.confirmPassword"
                  label="Confirm Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="[rules.required, rules.confirmPassword]"
                  variant="outlined"
                  class="mb-4"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>

                <v-checkbox
                  v-model="form.terms"
                  :rules="[rules.terms]"
                  class="mb-4"
                >
                  <template v-slot:label>
                    I agree to the
                    <router-link
                      to="/terms"
                      class="text-primary text-decoration-none"
                    >
                      Terms of Service
                    </router-link>
                    and
                    <router-link
                      to="/privacy"
                      class="text-primary text-decoration-none"
                    >
                      Privacy Policy
                    </router-link>
                  </template>
                </v-checkbox>

                <v-btn
                  color="primary"
                  size="large"
                  block
                  type="submit"
                  :loading="loading"
                  :disabled="!form.valid"
                >
                  Create Account
                </v-btn>
              </v-form>

              <!-- Social Register -->
              <div class="my-8">
                <div class="divider-with-text text-center mb-6">
                  <span class="text-medium-emphasis px-4 bg-surface">or register with</span>
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

              <!-- Sign In Link -->
              <p class="text-center text-body-1">
                Already have an account?
                <router-link
                  to="/auth/login"
                  class="text-primary text-decoration-none font-weight-medium"
                >
                  Sign in
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
  name: 'BoxedRegister',

  data() {
    return {
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      form: {
        valid: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      },
      rules: {
        required: (v: any) => !!v || 'This field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
        password: (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
        confirmPassword: (v: string) => v === this.form.password || 'Passwords must match',
        terms: (v: boolean) => v || 'You must agree to continue'
      },
      socialLogins: [
        { name: 'Google', icon: 'mdi-google', color: 'error' },
        { name: 'Facebook', icon: 'mdi-facebook', color: 'blue' }
      ]
    }
  },

  methods: {
    async handleRegister() {
      if (!this.form.valid) return

      this.loading = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Handle successful registration
        this.$router.push('/auth/login')
      } catch (error) {
        console.error('Registration error:', error)
        // Handle registration error
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.boxed-register {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);

  .register-card {
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