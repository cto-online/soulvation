<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Validation</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitBasicForm" v-model="basic.valid">
              <v-text-field
                v-model="basic.username"
                label="Username"
                :rules="[rules.required, rules.minLength(3)]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="basic.email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="basic.password"
                label="Password"
                :type="basic.showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.password]"
                variant="outlined"
                :append-inner-icon="basic.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="basic.showPassword = !basic.showPassword"
                class="mb-4"
              ></v-text-field>

              <v-btn
                color="primary"
                type="submit"
                :loading="basic.loading"
                :disabled="!basic.valid"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Advanced Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Advanced Validation</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitAdvancedForm" v-model="advanced.valid">
              <v-text-field
                v-model="advanced.password"
                label="Password"
                :type="advanced.showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.strongPassword]"
                variant="outlined"
                :append-inner-icon="advanced.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="advanced.showPassword = !advanced.showPassword"
                class="mb-4"
              >
                <template v-slot:message>
                  <div class="password-requirements">
                    <div :class="{ 'text-success': hasLength }">
                      <v-icon :color="hasLength ? 'success' : ''">
                        {{ hasLength ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                      At least 8 characters
                    </div>
                    <div :class="{ 'text-success': hasUpperCase }">
                      <v-icon :color="hasUpperCase ? 'success' : ''">
                        {{ hasUpperCase ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                      One uppercase letter
                    </div>
                    <div :class="{ 'text-success': hasLowerCase }">
                      <v-icon :color="hasLowerCase ? 'success' : ''">
                        {{ hasLowerCase ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                      One lowercase letter
                    </div>
                    <div :class="{ 'text-success': hasNumber }">
                      <v-icon :color="hasNumber ? 'success' : ''">
                        {{ hasNumber ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                      One number
                    </div>
                    <div :class="{ 'text-success': hasSpecial }">
                      <v-icon :color="hasSpecial ? 'success' : ''">
                        {{ hasSpecial ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                      One special character
                    </div>
                  </div>
                </template>
              </v-text-field>

              <v-text-field
                v-model="advanced.confirmPassword"
                label="Confirm Password"
                :type="advanced.showConfirmPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.passwordMatch(advanced.password)]"
                variant="outlined"
                :append-inner-icon="advanced.showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="advanced.showConfirmPassword = !advanced.showConfirmPassword"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="advanced.phone"
                label="Phone Number"
                :rules="[rules.required, rules.phone]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-btn
                color="primary"
                type="submit"
                :loading="advanced.loading"
                :disabled="!advanced.valid"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Validation -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Validation</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitCustomForm" v-model="custom.valid">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="custom.creditCard"
                    label="Credit Card Number"
                    :rules="[rules.required, rules.creditCard]"
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="custom.expiryDate"
                    label="Expiry Date (MM/YY)"
                    :rules="[rules.required, rules.expiryDate]"
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="custom.cvv"
                    label="CVV"
                    :rules="[rules.required, rules.cvv]"
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="custom.website"
                label="Website URL"
                :rules="[rules.required, rules.url]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-checkbox
                v-model="custom.terms"
                :rules="[rules.required]"
                class="mb-4"
              >
                <template v-slot:label>
                  I agree to the
                  <a href="#" class="text-primary text-decoration-none">Terms and Conditions</a>
                </template>
              </v-checkbox>

              <v-btn
                color="primary"
                type="submit"
                :loading="custom.loading"
                :disabled="!custom.valid"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormValidation',

  data() {
    return {
      rules: {
        required: (v: any) => !!v || 'This field is required',
        minLength: (length: number) => (v: string) => 
          !v || v.length >= length || `Minimum length is ${length} characters`,
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
        password: (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
        strongPassword: (v: string) => {
          const hasLength = v.length >= 8
          const hasUpperCase = /[A-Z]/.test(v)
          const hasLowerCase = /[a-z]/.test(v)
          const hasNumber = /[0-9]/.test(v)
          const hasSpecial = /[!@#$%^&*]/.test(v)
          return hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecial ||
            'Password must meet all requirements'
        },
        passwordMatch: (password: string) => (v: string) =>
          v === password || 'Passwords must match',
        phone: (v: string) => /^\+?[\d\s-]{10,}$/.test(v) || 'Please enter a valid phone number',
        creditCard: (v: string) => /^\d{16}$/.test(v) || 'Please enter a valid credit card number',
        expiryDate: (v: string) => /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(v) || 'Please enter a valid expiry date (MM/YY)',
        cvv: (v: string) => /^\d{3,4}$/.test(v) || 'Please enter a valid CVV',
        url: (v: string) => /^https?:\/\/.*/.test(v) || 'Please enter a valid URL starting with http(s)://'
      },
      basic: {
        valid: true,
        loading: false,
        username: '',
        email: '',
        password: '',
        showPassword: false
      },
      advanced: {
        valid: true,
        loading: false,
        password: '',
        confirmPassword: '',
        phone: '',
        showPassword: false,
        showConfirmPassword: false
      },
      custom: {
        valid: true,
        loading: false,
        creditCard: '',
        expiryDate: '',
        cvv: '',
        website: '',
        terms: false
      }
    }
  },

  computed: {
    hasLength(): boolean {
      return this.advanced.password.length >= 8
    },
    hasUpperCase(): boolean {
      return /[A-Z]/.test(this.advanced.password)
    },
    hasLowerCase(): boolean {
      return /[a-z]/.test(this.advanced.password)
    },
    hasNumber(): boolean {
      return /[0-9]/.test(this.advanced.password)
    },
    hasSpecial(): boolean {
      return /[!@#$%^&*]/.test(this.advanced.password)
    }
  },

  methods: {
    async submitBasicForm() {
      if (!this.basic.valid) return
      this.basic.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Basic form submitted:', this.basic)
      } finally {
        this.basic.loading = false
      }
    },

    async submitAdvancedForm() {
      if (!this.advanced.valid) return
      this.advanced.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Advanced form submitted:', this.advanced)
      } finally {
        this.advanced.loading = false
      }
    },

    async submitCustomForm() {
      if (!this.custom.valid) return
      this.custom.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Custom form submitted:', this.custom)
      } finally {
        this.custom.loading = false
      }
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

.password-requirements {
  margin-top: 0.5rem;
  font-size: 0.875rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    color: rgba(0, 0, 0, 0.6);

    &.text-success {
      color: rgb(var(--v-theme-success));
    }
  }
}
</style>