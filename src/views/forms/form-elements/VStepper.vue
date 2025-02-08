<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Stepper -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Stepper</v-card-title>
          <v-card-text>
            <v-stepper v-model="basic.step">
              <v-stepper-header>
                <v-stepper-item
                  v-for="n in 3"
                  :key="n"
                  :value="n"
                  :complete="basic.step > n"
                >
                  Step {{ n }}
                </v-stepper-item>
              </v-stepper-header>

              <v-stepper-window>
                <v-stepper-window-item
                  v-for="n in 3"
                  :key="n"
                  :value="n"
                >
                  <div class="pa-4">
                    <h3 class="text-h6 mb-2">Step {{ n }}</h3>
                    <p class="text-body-1">This is the content for step {{ n }}</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>

              <div class="d-flex justify-space-between pa-4">
                <v-btn
                  color="primary"
                  variant="text"
                  :disabled="basic.step === 1"
                  @click="basic.step--"
                >
                  Back
                </v-btn>
                <v-btn
                  color="primary"
                  :disabled="basic.step === 3"
                  @click="basic.step++"
                >
                  Continue
                </v-btn>
              </div>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Vertical Stepper -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Vertical Stepper</v-card-title>
          <v-card-text>
            <v-stepper
              v-model="vertical.step"
              direction="vertical"
            >
              <v-stepper-item
                v-for="n in 3"
                :key="n"
                :value="n"
                :complete="vertical.step > n"
              >
                <v-stepper-header>Step {{ n }}</v-stepper-header>
                <v-stepper-content :step="n">
                  <div class="pa-4">
                    <h3 class="text-h6 mb-2">Step {{ n }}</h3>
                    <p class="text-body-1">This is the content for step {{ n }}</p>
                    <div class="d-flex justify-space-between mt-4">
                      <v-btn
                        color="primary"
                        variant="text"
                        :disabled="n === 1"
                        @click="vertical.step--"
                      >
                        Back
                      </v-btn>
                      <v-btn
                        color="primary"
                        :disabled="n === 3"
                        @click="vertical.step++"
                      >
                        Continue
                      </v-btn>
                    </div>
                  </div>
                </v-stepper-content>
              </v-stepper-item>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Alternative Labels -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Alternative Labels</v-card-title>
          <v-card-text>
            <v-stepper
              v-model="alt.step"
              alt-labels
            >
              <v-stepper-header>
                <v-stepper-item
                  v-for="step in alt.steps"
                  :key="step.title"
                  :value="step.step"
                  :complete="alt.step > step.step"
                >
                  <template v-slot:title>
                    {{ step.title }}
                  </template>
                  <template v-slot:subtitle>
                    {{ step.subtitle }}
                  </template>
                </v-stepper-item>
              </v-stepper-header>

              <v-stepper-window>
                <v-stepper-window-item
                  v-for="step in alt.steps"
                  :key="step.title"
                  :value="step.step"
                >
                  <div class="pa-4">
                    <h3 class="text-h6 mb-2">{{ step.title }}</h3>
                    <p class="text-body-1">{{ step.content }}</p>
                  </div>
                </v-stepper-window-item>
              </v-stepper-window>

              <div class="d-flex justify-space-between pa-4">
                <v-btn
                  color="primary"
                  variant="text"
                  :disabled="alt.step === 1"
                  @click="alt.step--"
                >
                  Back
                </v-btn>
                <v-btn
                  color="primary"
                  :disabled="alt.step === alt.steps.length"
                  @click="alt.step++"
                >
                  Continue
                </v-btn>
              </div>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VStepper',

  data() {
    return {
      basic: {
        step: 1
      },
      vertical: {
        step: 1
      },
      alt: {
        step: 1,
        steps: [
          {
            step: 1,
            title: 'Account',
            subtitle: 'Create account',
            content: 'Create your account with basic information'
          },
          {
            step: 2,
            title: 'Profile',
            subtitle: 'Complete profile',
            content: 'Add additional profile information'
          },
          {
            step: 3,
            title: 'Confirm',
            subtitle: 'Review & submit',
            content: 'Review your information and submit'
          }
        ]
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
</style>