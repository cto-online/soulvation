<template>
  <v-container fluid class="py-8">
    <v-row>
      <v-col cols="12" md="3">
        <!-- Settings Navigation -->
        <v-card>
          <v-list>
            <v-list-item
              v-for="(item, index) in settingsMenu"
              :key="index"
              :value="item"
              :active="currentTab === item.value"
              @click="currentTab = item.value"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card>
          <!-- Profile Settings -->
          <v-window v-model="currentTab">
            <v-window-item value="profile">
              <v-card-text>
                <h2 class="text-h5 mb-6">Profile Settings</h2>
                <v-form @submit.prevent="saveProfile">
                  <v-row>
                    <!-- Avatar Upload -->
                    <v-col cols="12" class="text-center mb-6">
                      <v-avatar size="120" color="grey-lighten-2">
                        <v-img v-if="profile.avatar" :src="profile.avatar"></v-img>
                        <v-icon v-else size="48">mdi-account</v-icon>
                      </v-avatar>
                      <div class="mt-3">
                        <v-btn variant="outlined" size="small">
                          Change Avatar
                        </v-btn>
                      </div>
                    </v-col>

                    <!-- Profile Form -->
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="profile.firstName"
                        label="First Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="profile.lastName"
                        label="Last Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.email"
                        label="Email"
                        type="email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="profile.bio"
                        label="Bio"
                        rows="3"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-window-item>

            <!-- Security Settings -->
            <v-window-item value="security">
              <v-card-text>
                <h2 class="text-h5 mb-6">Security Settings</h2>
                <v-form @submit.prevent="changePassword">
                  <v-text-field
                    v-model="security.currentPassword"
                    label="Current Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="security.newPassword"
                    label="New Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="security.confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-form>

                <v-divider class="my-6"></v-divider>

                <h3 class="text-h6 mb-4">Two-Factor Authentication</h3>
                <v-switch
                  v-model="security.twoFactor"
                  label="Enable Two-Factor Authentication"
                ></v-switch>
              </v-card-text>
            </v-window-item>

            <!-- Notification Settings -->
            <v-window-item value="notifications">
              <v-card-text>
                <h2 class="text-h5 mb-6">Notification Settings</h2>
                <v-list>
                  <v-list-item v-for="(setting, index) in notificationSettings" :key="index">
                    <template v-slot:prepend>
                      <v-checkbox v-model="setting.enabled"></v-checkbox>
                    </template>
                    <v-list-item-title>{{ setting.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ setting.description }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="saveSettings"
            >
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AccountSettings',

  data() {
    return {
      currentTab: 'profile',
      settingsMenu: [
        { title: 'Profile', value: 'profile', icon: 'mdi-account-outline' },
        { title: 'Security', value: 'security', icon: 'mdi-shield-outline' },
        { title: 'Notifications', value: 'notifications', icon: 'mdi-bell-outline' }
      ],
      profile: {
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        bio: ''
      },
      security: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactor: false
      },
      notificationSettings: [
        {
          title: 'Email Notifications',
          description: 'Receive email notifications about account activity',
          enabled: true
        },
        {
          title: 'Push Notifications',
          description: 'Receive push notifications on your devices',
          enabled: true
        },
        {
          title: 'Monthly Newsletter',
          description: 'Receive our monthly newsletter with updates',
          enabled: false
        },
        {
          title: 'Security Alerts',
          description: 'Get notified about important security updates',
          enabled: true
        }
      ]
    }
  },

  methods: {
    saveProfile() {
      // Implement profile save logic
      console.log('Saving profile...', this.profile)
    },

    changePassword() {
      // Implement password change logic
      console.log('Changing password...', this.security)
    },

    saveSettings() {
      // Implement settings save logic
      console.log('Saving settings...')
    }
  }
})
</script>

<style lang="scss" scoped>
.v-list-item {
  cursor: pointer;

  &--active {
    background-color: var(--v-primary-lighten5);
    color: var(--v-primary-base);

    .v-icon {
      color: var(--v-primary-base);
    }
  }
}
</style>