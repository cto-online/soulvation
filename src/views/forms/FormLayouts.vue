<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Form Layout -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Form Layout</v-card-title>
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

              <v-textarea
                v-model="basic.message"
                label="Message"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-textarea>

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

      <!-- Multi Column Form -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Multi Column Form</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitMultiColumnForm" v-model="multiColumn.valid">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="multiColumn.firstName"
                    label="First Name"
                    :rules="[rules.required]"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="multiColumn.lastName"
                    label="Last Name"
                    :rules="[rules.required]"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="multiColumn.email"
                    label="Email"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    variant="outlined"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="multiColumn.phone"
                    label="Phone"
                    type="tel"
                    :rules="[rules.required]"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-textarea
                v-model="multiColumn.message"
                label="Message"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-textarea>

              <v-btn
                color="primary"
                type="submit"
                :loading="multiColumn.loading"
                :disabled="!multiColumn.valid"
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

      <!-- Form with Actions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Form with Actions</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitActionForm" v-model="action.valid">
              <v-text-field
                v-model="action.title"
                label="Title"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-textarea
                v-model="action.description"
                label="Description"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              ></v-textarea>

              <v-file-input
                v-model="action.files"
                label="Attachments"
                variant="outlined"
                multiple
                show-size
                class="mb-4"
              ></v-file-input>

              <div class="d-flex gap-4">
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="action.loading"
                  :disabled="!action.valid"
                >
                  Submit
                </v-btn>
                <v-btn
                  color="secondary"
                  variant="outlined"
                  @click="resetActionForm"
                >
                  Reset
                </v-btn>
                <v-btn
                  color="error"
                  variant="text"
                  @click="cancelActionForm"
                >
                  Cancel
                </v-btn>
              </div>
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
  name: 'FormLayouts',

  data() {
    return {
      rules: {
        required: (v: any) => !!v || 'This field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
        password: (v: string) => v.length >= 8 || 'Password must be at least 8 characters'
      },
      basic: {
        valid: true,
        loading: false,
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      },
      multiColumn: {
        valid: true,
        loading: false,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      },
      icon: {
        valid: true,
        loading: false,
        username: '',
        email: '',
        password: '',
        showPassword: false
      },
      action: {
        valid: true,
        loading: false,
        title: '',
        description: '',
        files: []
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

    async submitMultiColumnForm() {
      if (!this.multiColumn.valid) return
      this.multiColumn.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Multi column form submitted:', this.multiColumn)
      } finally {
        this.multiColumn.loading = false
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

    async submitActionForm() {
      if (!this.action.valid) return
      this.action.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Action form submitted:', this.action)
      } finally {
        this.action.loading = false
      }
    },

    resetActionForm() {
      this.action.title = ''
      this.action.description = ''
      this.action.files = []
    },

    cancelActionForm() {
      // Handle cancel action
      console.log('Form cancelled')
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