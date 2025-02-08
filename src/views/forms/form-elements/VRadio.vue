<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Radio -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Radio Buttons</v-card-title>
          <v-card-text>
            <v-radio-group v-model="basic.selected">
              <v-radio
                label="Option 1"
                value="1"
              ></v-radio>
              <v-radio
                label="Option 2"
                value="2"
              ></v-radio>
              <v-radio
                label="Disabled Option"
                value="3"
                disabled
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Colored Radio Buttons</v-card-title>
          <v-card-text>
            <v-radio-group v-model="colors.selected">
              <v-radio
                label="Primary"
                value="primary"
                color="primary"
              ></v-radio>
              <v-radio
                label="Secondary"
                value="secondary"
                color="secondary"
              ></v-radio>
              <v-radio
                label="Success"
                value="success"
                color="success"
              ></v-radio>
              <v-radio
                label="Error"
                value="error"
                color="error"
              ></v-radio>
              <v-radio
                label="Warning"
                value="warning"
                color="warning"
              ></v-radio>
              <v-radio
                label="Info"
                value="info"
                color="info"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Density -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Radio Button Density</v-card-title>
          <v-card-text>
            <v-radio-group v-model="density.selected">
              <v-radio
                label="Default Density"
                value="default"
              ></v-radio>
              <v-radio
                label="Comfortable Density"
                value="comfortable"
                density="comfortable"
              ></v-radio>
              <v-radio
                label="Compact Density"
                value="compact"
                density="compact"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Labels -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Labels</v-card-title>
          <v-card-text>
            <v-radio-group v-model="custom.selected">
              <v-radio value="1">
                <template v-slot:label>
                  <div>
                    <strong>Custom Label</strong>
                    <div class="text-caption text-medium-emphasis">
                      With additional description text
                    </div>
                  </div>
                </template>
              </v-radio>
              <v-radio value="2">
                <template v-slot:label>
                  <div class="d-flex align-center">
                    <v-icon color="primary" class="mr-2">mdi-star</v-icon>
                    <span>With Icon</span>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Inline Radio -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Inline Radio Buttons</v-card-title>
          <v-card-text>
            <v-radio-group
              v-model="inline.selected"
              inline
            >
              <v-radio
                label="Option 1"
                value="1"
              ></v-radio>
              <v-radio
                label="Option 2"
                value="2"
              ></v-radio>
              <v-radio
                label="Option 3"
                value="3"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid">
              <v-radio-group
                v-model="validation.selected"
                :rules="validation.rules"
                label="Required Selection"
              >
                <v-radio
                  label="Option 1"
                  value="1"
                ></v-radio>
                <v-radio
                  label="Option 2"
                  value="2"
                ></v-radio>
              </v-radio-group>
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

      <!-- Radio Card Group -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Radio Card Group</v-card-title>
          <v-card-text>
            <v-radio-group v-model="cardGroup.selected">
              <v-row>
                <v-col
                  v-for="plan in cardGroup.plans"
                  :key="plan.value"
                  cols="12"
                  md="4"
                >
                  <v-card
                    :class="[
                      'radio-card',
                      { 'radio-card--selected': cardGroup.selected === plan.value }
                    ]"
                    @click="cardGroup.selected = plan.value"
                  >
                    <v-card-text>
                      <div class="d-flex align-center mb-4">
                        <v-radio
                          :value="plan.value"
                          class="mt-0"
                        ></v-radio>
                        <h3 class="text-h6 mb-0 ml-2">{{ plan.title }}</h3>
                      </div>
                      <p class="text-body-2 mb-4">{{ plan.description }}</p>
                      <div class="text-h5 font-weight-bold">
                        ${{ plan.price }}/mo
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VRadio',

  data() {
    return {
      basic: {
        selected: '1'
      },
      colors: {
        selected: 'primary'
      },
      density: {
        selected: 'default'
      },
      custom: {
        selected: '1'
      },
      inline: {
        selected: '1'
      },
      validation: {
        valid: true,
        selected: null,
        rules: [
          (v: any) => !!v || 'Selection is required'
        ]
      },
      cardGroup: {
        selected: 'basic',
        plans: [
          {
            value: 'basic',
            title: 'Basic Plan',
            description: 'Perfect for small teams and startups',
            price: 29
          },
          {
            value: 'pro',
            title: 'Pro Plan',
            description: 'Advanced features for growing businesses',
            price: 59
          },
          {
            value: 'enterprise',
            title: 'Enterprise Plan',
            description: 'Custom solutions for large organizations',
            price: 99
          }
        ]
      }
    }
  },

  methods: {
    submitValidation() {
      console.log('Form submitted:', this.validation.selected)
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

.radio-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--v-primary-lighten2);
  }

  &--selected {
    border-color: var(--v-primary-base);
    background: var(--v-primary-lighten5);
  }
}
</style>