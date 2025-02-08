<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Card Style Form -->
      <v-col cols="12" md="6">
        <v-card class="custom-card">
          <v-card-title class="custom-title">
            <v-icon size="32" color="primary" class="mr-4">mdi-account-circle</v-icon>
            Personal Information
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitPersonalForm" v-model="personal.valid">
              <div class="custom-field mb-6">
                <label class="custom-label">Full Name</label>
                <v-text-field
                  v-model="personal.fullName"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  placeholder="John Doe"
                  hide-details
                ></v-text-field>
              </div>

              <div class="custom-field mb-6">
                <label class="custom-label">Email Address</label>
                <v-text-field
                  v-model="personal.email"
                  :rules="[rules.required, rules.email]"
                  variant="outlined"
                  density="comfortable"
                  placeholder="john@example.com"
                  hide-details
                ></v-text-field>
              </div>

              <div class="custom-field mb-6">
                <label class="custom-label">Bio</label>
                <v-textarea
                  v-model="personal.bio"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  placeholder="Tell us about yourself"
                  hide-details
                ></v-textarea>
              </div>

              <v-btn
                color="primary"
                type="submit"
                :loading="personal.loading"
                :disabled="!personal.valid"
                block
                class="mt-4"
              >
                Save Changes
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Floating Label Form -->
      <v-col cols="12" md="6">
        <v-card class="custom-card">
          <v-card-title class="custom-title">
            <v-icon size="32" color="primary" class="mr-4">mdi-briefcase</v-icon>
            Project Details
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitProjectForm" v-model="project.valid">
              <div class="custom-field mb-6">
                <label class="custom-label">Project Title</label>
                <v-text-field
                  v-model="project.title"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  placeholder="Enter project title"
                  hide-details
                ></v-text-field>
              </div>

              <div class="custom-field mb-6">
                <label class="custom-label">Project Type</label>
                <v-select
                  v-model="project.type"
                  :items="project.types"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  placeholder="Select project type"
                  hide-details
                ></v-select>
              </div>

              <div class="custom-field mb-6">
                <label class="custom-label">Start Date</label>
                <v-text-field
                  v-model="project.startDate"
                  type="date"
                  :rules="[rules.required]"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                ></v-text-field>
              </div>

              <div class="custom-field mb-6">
                <label class="custom-label">Budget Range</label>
                <v-range-slider
                  v-model="project.budgetRange"
                  :min="0"
                  :max="100000"
                  :step="1000"
                  :rules="[rules.required]"
                  class="mt-4"
                  hide-details
                >
                  <template v-slot:prepend>
                    <div class="text-caption">
                      ${{ project.budgetRange[0] }}
                    </div>
                  </template>
                  <template v-slot:append>
                    <div class="text-caption">
                      ${{ project.budgetRange[1] }}
                    </div>
                  </template>
                </v-range-slider>
              </div>

              <div class="d-flex gap-4">
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="project.loading"
                  :disabled="!project.valid"
                  block
                >
                  Create Project
                </v-btn>
                <v-btn
                  color="secondary"
                  variant="outlined"
                  @click="resetProjectForm"
                  block
                >
                  Reset
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Style Form -->
      <v-col cols="12">
        <v-card class="custom-card">
          <v-card-title class="custom-title">
            <v-icon size="32" color="primary" class="mr-4">mdi-cog</v-icon>
            Advanced Settings
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitSettingsForm" v-model="settings.valid">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="custom-field mb-6">
                    <label class="custom-label">Theme Color</label>
                    <v-select
                      v-model="settings.theme"
                      :items="settings.themes"
                      :rules="[rules.required]"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                    >
                      <template v-slot:selection="{ item }">
                        <v-icon :color="item.raw.color" class="mr-2">
                          mdi-circle
                        </v-icon>
                        {{ item.raw.text }}
                      </template>
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props">
                          <template v-slot:prepend>
                            <v-icon :color="item.raw.color">
                              mdi-circle
                            </v-icon>
                          </template>
                          <v-list-item-title>{{ item.raw.text }}</v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-select>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="custom-field mb-6">
                    <label class="custom-label">Language</label>
                    <v-select
                      v-model="settings.language"
                      :items="settings.languages"
                      :rules="[rules.required]"
                      variant="outlined"
                      density="comfortable"
                      hide-details
                    ></v-select>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="6">
                  <div class="custom-field mb-6">
                    <label class="custom-label">Notifications</label>
                    <div class="d-flex flex-column gap-2">
                      <v-switch
                        v-model="settings.emailNotifications"
                        label="Email Notifications"
                        color="primary"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="settings.pushNotifications"
                        label="Push Notifications"
                        color="primary"
                        hide-details
                      ></v-switch>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="custom-field mb-6">
                    <label class="custom-label">Privacy</label>
                    <div class="d-flex flex-column gap-2">
                      <v-switch
                        v-model="settings.publicProfile"
                        label="Public Profile"
                        color="primary"
                        hide-details
                      ></v-switch>
                      <v-switch
                        v-model="settings.showActivity"
                        label="Show Activity Status"
                        color="primary"
                        hide-details
                      ></v-switch>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <div class="d-flex justify-end gap-4 mt-4">
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="settings.loading"
                  :disabled="!settings.valid"
                >
                  Save Settings
                </v-btn>
                <v-btn
                  color="secondary"
                  variant="outlined"
                  @click="resetSettingsForm"
                >
                  Reset
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
  name: 'FormCustom',

  data() {
    return {
      rules: {
        required: (v: any) => !!v || 'This field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email'
      },
      personal: {
        valid: true,
        loading: false,
        fullName: '',
        email: '',
        bio: ''
      },
      project: {
        valid: true,
        loading: false,
        title: '',
        type: '',
        types: ['Web Development', 'Mobile App', 'Desktop Application', 'Other'],
        startDate: '',
        budgetRange: [10000, 50000]
      },
      settings: {
        valid: true,
        loading: false,
        theme: { color: 'primary', text: 'Blue' },
        themes: [
          { color: 'primary', text: 'Blue' },
          { color: 'success', text: 'Green' },
          { color: 'error', text: 'Red' },
          { color: 'warning', text: 'Orange' }
        ],
        language: 'English',
        languages: ['English', 'Spanish', 'French', 'German'],
        emailNotifications: true,
        pushNotifications: true,
        publicProfile: false,
        showActivity: true
      }
    }
  },

  methods: {
    async submitPersonalForm() {
      if (!this.personal.valid) return
      this.personal.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Personal form submitted:', this.personal)
      } finally {
        this.personal.loading = false
      }
    },

    async submitProjectForm() {
      if (!this.project.valid) return
      this.project.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Project form submitted:', this.project)
      } finally {
        this.project.loading = false
      }
    },

    async submitSettingsForm() {
      if (!this.settings.valid) return
      this.settings.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Settings form submitted:', this.settings)
      } finally {
        this.settings.loading = false
      }
    },

    resetProjectForm() {
      this.project.title = ''
      this.project.type = ''
      this.project.startDate = ''
      this.project.budgetRange = [10000, 50000]
    },

    resetSettingsForm() {
      this.settings.theme = { color: 'primary', text: 'Blue' }
      this.settings.language = 'English'
      this.settings.emailNotifications = true
      this.settings.pushNotifications = true
      this.settings.publicProfile = false
      this.settings.showActivity = true
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-card {
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.custom-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.custom-field {
  .custom-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: rgba(0, 0, 0, 0.6);
  }
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}
</style>