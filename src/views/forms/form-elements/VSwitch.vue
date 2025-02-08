<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Switch -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Switch</v-card-title>
          <v-card-text>
            <v-switch
              v-model="basic.switch1"
              label="Basic Switch"
              class="mb-4"
            ></v-switch>
            <v-switch
              v-model="basic.switch2"
              label="Switch with hint"
              hint="This is a hint text"
              class="mb-4"
            ></v-switch>
            <v-switch
              v-model="basic.switch3"
              label="Disabled Switch"
              disabled
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Colored Switches</v-card-title>
          <v-card-text>
            <v-switch
              v-for="(item, index) in colors.switches"
              :key="index"
              v-model="item.value"
              :label="item.label"
              :color="item.color"
              class="mb-4"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Inset -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Inset Switches</v-card-title>
          <v-card-text>
            <v-switch
              v-model="inset.switch1"
              label="Default Switch"
              class="mb-4"
            ></v-switch>
            <v-switch
              v-model="inset.switch2"
              label="Inset Switch"
              inset
              class="mb-4"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Labels -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Labels</v-card-title>
          <v-card-text>
            <v-switch
              v-model="custom.switch1"
              class="mb-4"
            >
              <template v-slot:label>
                <div>
                  <strong>Custom Label</strong>
                  <div class="text-caption text-medium-emphasis">
                    With additional description text
                  </div>
                </div>
              </template>
            </v-switch>

            <v-switch
              v-model="custom.switch2"
              class="mb-4"
            >
              <template v-slot:label>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-bell</v-icon>
                  <span>With Icon</span>
                </div>
              </template>
            </v-switch>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid">
              <v-switch
                v-model="validation.terms"
                :rules="validation.rules"
                label="I agree to the terms and conditions"
                class="mb-4"
              ></v-switch>
              <v-switch
                v-model="validation.newsletter"
                label="Subscribe to newsletter"
                class="mb-4"
              ></v-switch>
              <v-btn
                color="primary"
                :disabled="!validation.valid"
                @click="submitValidation"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dense -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Dense Switches</v-card-title>
          <v-card-text>
            <v-switch
              v-model="dense.switch1"
              label="Default Density"
              class="mb-4"
            ></v-switch>
            <v-switch
              v-model="dense.switch2"
              label="Comfortable Density"
              density="comfortable"
              class="mb-4"
            ></v-switch>
            <v-switch
              v-model="dense.switch3"
              label="Compact Density"
              density="compact"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VSwitch',

  data() {
    return {
      basic: {
        switch1: true,
        switch2: false,
        switch3: true
      },
      colors: {
        switches: [
          { value: true, color: 'primary', label: 'Primary' },
          { value: true, color: 'secondary', label: 'Secondary' },
          { value: true, color: 'success', label: 'Success' },
          { value: true, color: 'info', label: 'Info' },
          { value: true, color: 'warning', label: 'Warning' },
          { value: true, color: 'error', label: 'Error' }
        ]
      },
      inset: {
        switch1: true,
        switch2: true
      },
      custom: {
        switch1: true,
        switch2: false
      },
      validation: {
        valid: true,
        terms: false,
        newsletter: false,
        rules: [
          (v: boolean) => !!v || 'You must agree to continue'
        ]
      },
      dense: {
        switch1: true,
        switch2: true,
        switch3: true
      }
    }
  },

  methods: {
    submitValidation() {
      console.log('Form submitted:', {
        terms: this.validation.terms,
        newsletter: this.validation.newsletter
      })
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
</style>