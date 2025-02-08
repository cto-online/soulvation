<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Text Fields -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Text Fields</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-text-field
                v-model="text1"
                label="Default"
                placeholder="Enter text"
              ></v-text-field>

              <v-text-field
                v-model="text2"
                label="With Hint"
                placeholder="Enter text"
                hint="This is a hint text"
                persistent-hint
              ></v-text-field>

              <v-text-field
                v-model="text3"
                label="With Rules"
                placeholder="Enter text"
                :rules="[v => !!v || 'Field is required']"
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Text Field Variants -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Text Field Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-text-field
                v-for="variant in variants"
                :key="variant"
                v-model="variantValues[variant]"
                :label="variant"
                :variant="variant"
                placeholder="Enter text"
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Text Field with Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Text Field with Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                clearable
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                append-inner-icon="mdi-check-circle"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-inner-icon="mdi-lock"
                @click:append-inner="showPassword = !showPassword"
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Text Field Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Text Field Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-text-field
                v-for="(color, index) in colors"
                :key="index"
                v-model="colorValues[color]"
                :label="color"
                :color="color"
                :bg-color="color"
                variant="outlined"
              ></v-text-field>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Text Fields -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Text Fields</v-card-title>
          <v-card-text>
            <v-form v-model="formValid" @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.firstName"
                    label="First Name"
                    :rules="nameRules"
                    counter
                    maxlength="20"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.lastName"
                    label="Last Name"
                    :rules="nameRules"
                    counter
                    maxlength="20"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    :rules="emailRules"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.phone"
                    label="Phone"
                    :rules="phoneRules"
                    prepend-inner-icon="mdi-phone"
                    prefix="+1"
                    mask="(###) ###-####"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.address"
                    label="Address"
                    :rules="[v => !!v || 'Address is required']"
                  >
                    <template v-slot:append>
                      <v-btn
                        icon="mdi-map-marker"
                        color="primary"
                        variant="text"
                        @click="getLocation"
                      ></v-btn>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" class="text-center">
                  <v-btn
                    color="primary"
                    size="large"
                    type="submit"
                    :disabled="!formValid"
                  >
                    Submit
                  </v-btn>
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
  name: 'UiTextField',

  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      variants: ['outlined', 'filled', 'solo', 'underlined', 'plain'],
      variantValues: {
        outlined: '',
        filled: '',
        solo: '',
        underlined: '',
        plain: ''
      },
      search: '',
      email: '',
      password: '',
      showPassword: false,
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorValues: {
        primary: '',
        secondary: '',
        success: '',
        info: '',
        warning: '',
        error: ''
      },
      formValid: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 20 || 'Name must be less than 20 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^\(\d{3}\) \d{3}-\d{4}$/.test(v) || 'Phone must be valid'
      ]
    }
  },

  methods: {
    getLocation() {
      // Simulate getting location
      setTimeout(() => {
        this.form.address = '123 Main St, New York, NY 10001'
      }, 1000)
    },

    submitForm() {
      if (this.formValid) {
        // Handle form submission
        console.log('Form submitted:', this.form)
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

.gap-4 {
  gap: 1rem;
}
</style>