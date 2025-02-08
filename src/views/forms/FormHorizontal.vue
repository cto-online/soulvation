<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Horizontal Form -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Horizontal Form</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitBasicForm" v-model="basic.valid">
              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">First Name:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="basic.firstName"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Last Name:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="basic.lastName"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Email:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="basic.email"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Phone:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="basic.phone"
                    type="tel"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="9" offset-sm="3">
                  <v-btn
                    color="primary"
                    type="submit"
                    :loading="basic.loading"
                    :disabled="!basic.valid"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Horizontal Form with Icons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Horizontal Form with Icons</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitIconForm" v-model="icon.valid">
              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Username:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="icon.username"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-account"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Email:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="icon.email"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-email"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Password:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="icon.password"
                    :type="icon.showPassword ? 'text' : 'password'"
                    :rules="[rules.required, rules.password]"
                    variant="outlined"
                    density="comfortable"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="icon.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="icon.showPassword = !icon.showPassword"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="9" offset-sm="3">
                  <v-btn
                    color="primary"
                    type="submit"
                    :loading="icon.loading"
                    :disabled="!icon.valid"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Horizontal Form with Validation -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Horizontal Form with Validation</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitValidationForm" v-model="validation.valid">
              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Project Name:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="validation.projectName"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Project Type:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-select
                    v-model="validation.projectType"
                    :items="validation.projectTypes"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Description:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-textarea
                    v-model="validation.description"
                    :rules="[rules.required]"
                    variant="outlined"
                    density="comfortable"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row align="center" class="mb-4">
                <v-col cols="12" sm="3">
                  <label class="text-body-1">Budget:</label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field
                    v-model="validation.budget"
                    type="number"
                    :rules="[rules.required, rules.positive]"
                    variant="outlined"
                    density="comfortable"
                    prefix="$"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="9" offset-sm="3">
                  <div class="d-flex gap-4">
                    <v-btn
                      color="primary"
                      type="submit"
                      :loading="validation.loading"
                      :disabled="!validation.valid"
                    >
                      Submit
                    </v-btn>
                    <v-btn
                      color="secondary"
                      variant="outlined"
                      @click="resetValidationForm"
                    >
                      Reset
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
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
  name: 'FormHorizontal',

  data() {
    return {
      rules: {
        required: (v: any) => !!v || 'This field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
        password: (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
        positive: (v: number) => v > 0 || 'Value must be greater than 0'
      },
      basic: {
        valid: true,
        loading: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      icon: {
        valid: true,
        loading: false,
        username: '',
        email: '',
        password: '',
        showPassword: false
      },
      validation: {
        valid: true,
        loading: false,
        projectName: '',
        projectType: '',
        projectTypes: ['Web Development', 'Mobile App', 'Desktop Application', 'Other'],
        description: '',
        budget: null
      }
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

    async submitIconForm() {
      if (!this.icon.valid) return
      this.icon.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Icon form submitted:', this.icon)
      } finally {
        this.icon.loading = false
      }
    },

    async submitValidationForm() {
      if (!this.validation.valid) return
      this.validation.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Validation form submitted:', this.validation)
      } finally {
        this.validation.loading = false
      }
    },

    resetValidationForm() {
      this.validation.projectName = ''
      this.validation.projectType = ''
      this.validation.description = ''
      this.validation.budget = null
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

.gap-4 {
  gap: 1rem;
}

label {
  display: inline-block;
  margin-bottom: 0;
  @media (min-width: 600px) {
    text-align: right;
    width: 100%;
    padding-right: 1rem;
  }
}
</style>