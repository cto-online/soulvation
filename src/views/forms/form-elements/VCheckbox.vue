<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Checkboxes -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Checkboxes</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="basic.checkbox1"
              label="Default Checkbox"
            ></v-checkbox>
            <v-checkbox
              v-model="basic.checkbox2"
              label="Checked by Default"
              :model-value="true"
            ></v-checkbox>
            <v-checkbox
              v-model="basic.checkbox3"
              label="Disabled Checkbox"
              disabled
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Colored Checkboxes</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="colors.primary"
              label="Primary"
              color="primary"
            ></v-checkbox>
            <v-checkbox
              v-model="colors.secondary"
              label="Secondary"
              color="secondary"
            ></v-checkbox>
            <v-checkbox
              v-model="colors.success"
              label="Success"
              color="success"
            ></v-checkbox>
            <v-checkbox
              v-model="colors.error"
              label="Error"
              color="error"
            ></v-checkbox>
            <v-checkbox
              v-model="colors.warning"
              label="Warning"
              color="warning"
            ></v-checkbox>
            <v-checkbox
              v-model="colors.info"
              label="Info"
              color="info"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Density -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Checkbox Density</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="density.default"
              label="Default Density"
            ></v-checkbox>
            <v-checkbox
              v-model="density.comfortable"
              label="Comfortable Density"
              density="comfortable"
            ></v-checkbox>
            <v-checkbox
              v-model="density.compact"
              label="Compact Density"
              density="compact"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Indeterminate -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Indeterminate State</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="indeterminate.parent"
              :indeterminate="isIndeterminate"
              label="Parent Checkbox"
              @click="toggleParent"
            ></v-checkbox>
            <div class="pl-4">
              <v-checkbox
                v-for="(child, index) in indeterminate.children"
                :key="index"
                v-model="indeterminate.children[index]"
                :label="`Child Checkbox ${index + 1}`"
                @change="updateParentState"
              ></v-checkbox>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Labels -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Labels</v-card-title>
          <v-card-text>
            <v-checkbox v-model="custom.checkbox1">
              <template v-slot:label>
                <div>
                  <strong>Custom Label</strong>
                  <div class="text-caption text-medium-emphasis">
                    With additional description text
                  </div>
                </div>
              </template>
            </v-checkbox>

            <v-checkbox v-model="custom.checkbox2">
              <template v-slot:label>
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-star</v-icon>
                  <span>With Icon</span>
                </div>
              </template>
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid">
              <v-checkbox
                v-model="validation.terms"
                :rules="validation.rules"
                label="I agree to the terms and conditions"
              ></v-checkbox>
              <v-checkbox
                v-model="validation.newsletter"
                label="Subscribe to newsletter"
              ></v-checkbox>
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

      <!-- Checkbox Group -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Checkbox Group</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <h3 class="text-h6 mb-4">Interests</h3>
                <v-checkbox
                  v-for="interest in group.interests"
                  :key="interest.value"
                  v-model="group.selected"
                  :label="interest.label"
                  :value="interest.value"
                  color="primary"
                ></v-checkbox>
              </v-col>

              <v-col cols="12" md="8">
                <h3 class="text-h6 mb-4">Selected Interests</h3>
                <v-chip
                  v-for="value in group.selected"
                  :key="value"
                  class="mr-2 mb-2"
                  color="primary"
                  closable
                  @click:close="removeInterest(value)"
                >
                  {{ getInterestLabel(value) }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VCheckbox',

  data() {
    return {
      basic: {
        checkbox1: false,
        checkbox2: true,
        checkbox3: false
      },
      colors: {
        primary: true,
        secondary: true,
        success: true,
        error: true,
        warning: true,
        info: true
      },
      density: {
        default: true,
        comfortable: true,
        compact: true
      },
      indeterminate: {
        parent: false,
        children: [false, false, false]
      },
      custom: {
        checkbox1: false,
        checkbox2: false
      },
      validation: {
        valid: true,
        terms: false,
        newsletter: false,
        rules: [
          (v: boolean) => !!v || 'You must agree to continue'
        ]
      },
      group: {
        selected: [] as string[],
        interests: [
          { label: 'Technology', value: 'tech' },
          { label: 'Sports', value: 'sports' },
          { label: 'Reading', value: 'reading' },
          { label: 'Music', value: 'music' },
          { label: 'Travel', value: 'travel' },
          { label: 'Food', value: 'food' }
        ]
      }
    }
  },

  computed: {
    isIndeterminate(): boolean {
      const checkedCount = this.indeterminate.children.filter(v => v).length
      return checkedCount > 0 && checkedCount < this.indeterminate.children.length
    }
  },

  methods: {
    toggleParent() {
      const value = !this.indeterminate.parent
      this.indeterminate.children = this.indeterminate.children.map(() => value)
    },

    updateParentState() {
      const checkedCount = this.indeterminate.children.filter(v => v).length
      this.indeterminate.parent = checkedCount === this.indeterminate.children.length
    },

    submitValidation() {
      console.log('Form submitted:', {
        terms: this.validation.terms,
        newsletter: this.validation.newsletter
      })
    },

    getInterestLabel(value: string): string {
      const interest = this.group.interests.find(i => i.value === value)
      return interest ? interest.label : value
    },

    removeInterest(value: string) {
      const index = this.group.selected.indexOf(value)
      if (index !== -1) {
        this.group.selected.splice(index, 1)
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