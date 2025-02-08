<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Dialogs -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Dialogs</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="primary"
                @click="basicDialog = true"
              >
                Open Dialog
              </v-btn>

              <v-dialog
                v-model="basicDialog"
                width="500"
              >
                <v-card>
                  <v-card-title>Basic Dialog</v-card-title>
                  <v-card-text>
                    This is a basic dialog with simple content.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click="basicDialog = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Persistent Dialog -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Persistent Dialog</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="warning"
                @click="persistentDialog = true"
              >
                Open Persistent Dialog
              </v-btn>

              <v-dialog
                v-model="persistentDialog"
                persistent
                width="500"
              >
                <v-card>
                  <v-card-title>Unsaved Changes</v-card-title>
                  <v-card-text>
                    You have unsaved changes. Are you sure you want to leave?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="grey-darken-1"
                      variant="text"
                      @click="persistentDialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="persistentDialog = false"
                    >
                      Leave
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Form Dialog -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Form Dialog</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="success"
                @click="formDialog = true"
              >
                Open Form Dialog
              </v-btn>

              <v-dialog
                v-model="formDialog"
                width="500"
              >
                <v-card>
                  <v-card-title>New User</v-card-title>
                  <v-card-text>
                    <v-form ref="form" v-model="formValid">
                      <v-text-field
                        v-model="formData.name"
                        label="Name"
                        :rules="[v => !!v || 'Name is required']"
                      ></v-text-field>

                      <v-text-field
                        v-model="formData.email"
                        label="Email"
                        type="email"
                        :rules="[
                          v => !!v || 'Email is required',
                          v => /.+@.+\..+/.test(v) || 'Email must be valid'
                        ]"
                      ></v-text-field>

                      <v-select
                        v-model="formData.role"
                        :items="roles"
                        label="Role"
                        :rules="[v => !!v || 'Role is required']"
                      ></v-select>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="grey-darken-1"
                      variant="text"
                      @click="formDialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="success"
                      :disabled="!formValid"
                      @click="submitForm"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Loading Dialog -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Loading Dialog</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="info"
                @click="showLoadingDialog"
              >
                Show Loading Dialog
              </v-btn>

              <v-dialog
                v-model="loadingDialog"
                persistent
                width="300"
              >
                <v-card>
                  <v-card-text class="text-center pa-4">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      size="64"
                      class="mb-4"
                    ></v-progress-circular>
                    <div>Processing your request...</div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Fullscreen Dialog -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Fullscreen Dialog</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="primary"
                @click="fullscreenDialog = true"
              >
                Open Fullscreen Dialog
              </v-btn>

              <v-dialog
                v-model="fullscreenDialog"
                fullscreen
                :scrim="false"
                transition="dialog-bottom-transition"
              >
                <v-card>
                  <v-toolbar color="primary">
                    <v-btn
                      icon="mdi-close"
                      @click="fullscreenDialog = false"
                    ></v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn
                        variant="text"
                        @click="fullscreenDialog = false"
                      >
                        Save
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-list lines="two" select-strategy="multiple">
                    <v-list-subheader>User Controls</v-list-subheader>
                    <v-list-item
                      v-for="(item, i) in settings"
                      :key="i"
                      :value="item"
                      :title="item.title"
                      :subtitle="item.subtitle"
                    >
                      <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                      </template>
                      <template v-slot:append>
                        <v-switch
                          v-model="item.value"
                          color="primary"
                          hide-details
                        ></v-switch>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Scrollable Dialog -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Scrollable Dialog</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="primary"
                @click="scrollDialog = true"
              >
                Open Scrollable Dialog
              </v-btn>

              <v-dialog
                v-model="scrollDialog"
                scrollable
                width="500"
              >
                <v-card>
                  <v-card-title>Terms of Service</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text style="height: 300px;">
                    <div v-for="n in 10" :key="n" class="mb-4">
                      <div class="text-h6">Section {{ n }}</div>
                      <p>{{ loremIpsum }}</p>
                    </div>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="grey-darken-1"
                      variant="text"
                      @click="scrollDialog = false"
                    >
                      Decline
                    </v-btn>
                    <v-btn
                      color="primary"
                      @click="scrollDialog = false"
                    >
                      Accept
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
  name: 'UiDialog',

  data() {
    return {
      basicDialog: false,
      persistentDialog: false,
      formDialog: false,
      loadingDialog: false,
      fullscreenDialog: false,
      scrollDialog: false,
      formValid: false,
      formData: {
        name: '',
        email: '',
        role: ''
      },
      roles: ['Admin', 'Editor', 'User'],
      settings: [
        {
          title: 'Notifications',
          subtitle: 'Allow email notifications',
          value: true,
          icon: 'mdi-email'
        },
        {
          title: 'Sound',
          subtitle: 'Enable sound effects',
          value: false,
          icon: 'mdi-volume-high'
        },
        {
          title: 'Auto-Update',
          subtitle: 'Keep app up to date',
          value: true,
          icon: 'mdi-update'
        }
      ],
      loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },

  methods: {
    showLoadingDialog() {
      this.loadingDialog = true
      setTimeout(() => {
        this.loadingDialog = false
      }, 3000)
    },

    submitForm() {
      if (this.formValid) {
        // Handle form submission
        console.log('Form submitted:', this.formData)
        this.formDialog = false
        // Reset form
        this.formData = {
          name: '',
          email: '',
          role: ''
        }
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

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .3s ease-in-out;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
  transform: translateY(100%);
}
</style>