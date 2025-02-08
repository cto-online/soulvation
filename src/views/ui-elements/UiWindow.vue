<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Window -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Window</v-card-title>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item
                v-for="n in 3"
                :key="n"
                :value="n"
              >
                <v-card variant="outlined">
                  <v-card-text>
                    <div class="text-h6 mb-2">Content {{ n }}</div>
                    <p>This is the content for window item {{ n }}.</p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>

            <div class="d-flex justify-center mt-4">
              <v-btn-group>
                <v-btn
                  v-for="n in 3"
                  :key="n"
                  :color="tab === n ? 'primary' : undefined"
                  @click="tab = n"
                >
                  Item {{ n }}
                </v-btn>
              </v-btn-group>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Window with Transitions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Window with Transitions</v-card-title>
          <v-card-text>
            <v-window
              v-model="transitionTab"
              :reverse="reverse"
              @update:modelValue="updateReverse"
            >
              <v-window-item
                v-for="(item, i) in transitionItems"
                :key="i"
                :value="i"
              >
                <v-card
                  :color="item.color"
                  height="200"
                  class="d-flex align-center justify-center"
                >
                  <div class="text-h4 text-white">{{ item.text }}</div>
                </v-card>
              </v-window-item>
            </v-window>

            <div class="d-flex justify-space-between align-center mt-4">
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                :disabled="transitionTab === 0"
                @click="prev"
              ></v-btn>

              <div class="text-center">
                <v-chip
                  v-for="(item, i) in transitionItems"
                  :key="i"
                  class="mx-1"
                  :color="transitionTab === i ? item.color : undefined"
                  :variant="transitionTab === i ? 'elevated' : 'outlined'"
                  @click="transitionTab = i"
                >
                  {{ i + 1 }}
                </v-chip>
              </div>

              <v-btn
                icon="mdi-chevron-right"
                variant="text"
                :disabled="transitionTab === transitionItems.length - 1"
                @click="next"
              ></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Window -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Window</v-card-title>
          <v-card-text>
            <v-window v-model="step">
              <!-- Step 1: Personal Info -->
              <v-window-item :value="1">
                <v-card variant="outlined">
                  <v-card-text>
                    <div class="text-h6 mb-4">Personal Information</div>
                    <v-form v-model="forms.personal.valid">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="forms.personal.firstName"
                            label="First Name"
                            :rules="[v => !!v || 'First name is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="forms.personal.lastName"
                            label="Last Name"
                            :rules="[v => !!v || 'Last name is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="forms.personal.email"
                            label="Email"
                            :rules="[
                              v => !!v || 'Email is required',
                              v => /.+@.+\..+/.test(v) || 'Email must be valid'
                            ]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <!-- Step 2: Address -->
              <v-window-item :value="2">
                <v-card variant="outlined">
                  <v-card-text>
                    <div class="text-h6 mb-4">Address Information</div>
                    <v-form v-model="forms.address.valid">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="forms.address.street"
                            label="Street Address"
                            :rules="[v => !!v || 'Street address is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="forms.address.city"
                            label="City"
                            :rules="[v => !!v || 'City is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="forms.address.state"
                            label="State"
                            :rules="[v => !!v || 'State is required']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-window-item>

              <!-- Step 3: Review -->
              <v-window-item :value="3">
                <v-card variant="outlined">
                  <v-card-text>
                    <div class="text-h6 mb-4">Review Information</div>
                    <v-list>
                      <v-list-subheader>Personal Information</v-list-subheader>
                      <v-list-item>
                        <v-list-item-title>Name</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ forms.personal.firstName }} {{ forms.personal.lastName }}
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>Email</v-list-item-title>
                        <v-list-item-subtitle>{{ forms.personal.email }}</v-list-item-subtitle>
                      </v-list-item>

                      <v-divider class="my-4"></v-divider>

                      <v-list-subheader>Address Information</v-list-subheader>
                      <v-list-item>
                        <v-list-item-title>Street</v-list-item-title>
                        <v-list-item-subtitle>{{ forms.address.street }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>City, State</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ forms.address.city }}, {{ forms.address.state }}
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>

            <div class="d-flex justify-space-between mt-4">
              <v-btn
                color="primary"
                variant="text"
                :disabled="step === 1"
                @click="step--"
              >
                Back
              </v-btn>

              <v-btn
                color="primary"
                :disabled="!canContinue"
                @click="step === 3 ? submit() : step++"
              >
                {{ step === 3 ? 'Submit' : 'Continue' }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiWindow',

  data() {
    return {
      tab: 1,
      transitionTab: 0,
      reverse: false,
      step: 1,
      transitionItems: [
        { text: 'Slide 1', color: 'primary' },
        { text: 'Slide 2', color: 'success' },
        { text: 'Slide 3', color: 'info' }
      ],
      forms: {
        personal: {
          valid: false,
          firstName: '',
          lastName: '',
          email: ''
        },
        address: {
          valid: false,
          street: '',
          city: '',
          state: ''
        }
      }
    }
  },

  computed: {
    canContinue(): boolean {
      if (this.step === 1) return this.forms.personal.valid
      if (this.step === 2) return this.forms.address.valid
      return true
    }
  },

  methods: {
    updateReverse(value: number) {
      this.reverse = value < this.transitionTab
    },

    prev() {
      this.transitionTab--
    },

    next() {
      this.transitionTab++
    },

    submit() {
      // Handle form submission
      console.log('Form submitted:', this.forms)
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