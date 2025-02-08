<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Vertical Form -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Vertical Form</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitBasicForm" v-model="basic.valid">
              <v-text-field
                v-model="basic.firstName"
                label="First Name"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="basic.lastName"
                label="Last Name"
                :rules="[rules.required]"
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
                v-model="basic.phone"
                label="Phone"
                type="tel"
                :rules="[rules.required]"
                variant="outlined"
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

      <!-- Form with Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Form with Icons</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitIconForm" v-model="icon.valid">
              <v-text-field
                v-model="icon.username"
                label="Username"
                :rules="[rules.required]"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="icon.email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="icon.password"
                label="Password"
                :type="icon.showPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.password]"
                variant="outlined"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="icon.showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="icon.showPassword = !icon.showPassword"
                class="mb-4"
              ></v-text-field>

              <v-btn
                color="primary"
                type="submit"
                :loading="icon.loading"
                :disabled="!icon.valid"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Form with Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Form with Validation</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitValidationForm" v-model="validation.valid">
              <v-text-field
                v-model="validation.projectName"
                label="Project Name"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-select
                v-model="validation.projectType"
                :items="validation.projectTypes"
                label="Project Type"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-select>

              <v-textarea
                v-model="validation.description"
                label="Description"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-textarea>

              <v-text-field
                v-model="validation.budget"
                label="Budget"
                type="number"
                :rules="[rules.required, rules.positive]"
                variant="outlined"
                prefix="$"
                class="mb-4"
              ></v-text-field>

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
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Form with File Upload -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Form with File Upload</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitFileForm" v-model="file.valid">
              <v-text-field
                v-model="file.title"
                label="Document Title"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-textarea
                v-model="file.description"
                label="Document Description"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-textarea>

              <v-file-input
                v-model="file.files"
                label="Upload Files"
                :rules="[rules.required]"
                variant="outlined"
                multiple
                show-size
                class="mb-4"
              ></v-file-input>

              <v-checkbox
                v-model="file.terms"
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
                :loading="file.loading"
                :disabled="!file.valid"
              >
                Upload
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
  name: 'FormVertical',

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
      },
      file: {
        valid: true,
        loading: false,
        title: '',
        description: '',
        files: [],
        terms: false
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

    async submitFileForm() {
      if (!this.file.valid) return
      this.file.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('File form submitted:', this.file)
      } finally {
        this.file.loading = false
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
</style>