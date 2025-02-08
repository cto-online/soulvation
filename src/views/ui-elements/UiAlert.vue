<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Alerts -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Alerts</v-card-title>
          <v-card-text>
            <v-alert
              v-for="(alert, index) in basicAlerts"
              :key="index"
              :type="alert.type"
              :title="alert.title"
              class="mb-4"
            >
              {{ alert.text }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Alert Variants -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Alert Variants</v-card-title>
          <v-card-text>
            <v-alert
              v-for="(variant, index) in variants"
              :key="index"
              color="primary"
              :variant="variant"
              :title="`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`"
              class="mb-4"
            >
              This is a primary alert with {{ variant }} variant.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Closable Alerts -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Closable Alerts</span>
            <v-btn
              color="primary"
              @click="restoreAlerts"
              :disabled="closableAlerts.every(alert => alert.visible)"
            >
              Restore All
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert
              v-for="(alert, index) in closableAlerts"
              :key="index"
              v-model="alert.visible"
              :type="alert.type"
              :title="alert.title"
              closable
              class="mb-4"
            >
              {{ alert.text }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Content -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Content</v-card-title>
          <v-card-text>
            <!-- Success Alert with Icon -->
            <v-alert
              type="success"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-avatar color="success" class="text-white">
                  <v-icon>mdi-check-circle</v-icon>
                </v-avatar>
              </template>
              <div class="text-h6 mb-1">Payment Successful</div>
              <p class="mb-0">Your payment has been processed successfully.</p>
              <div class="mt-2">
                <v-btn
                  variant="text"
                  color="success"
                  class="px-0 me-4"
                >
                  View Receipt
                </v-btn>
                <v-btn
                  variant="text"
                  color="success"
                >
                  Download Invoice
                </v-btn>
              </div>
            </v-alert>

            <!-- Warning Alert with Progress -->
            <v-alert
              type="warning"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-avatar color="warning" class="text-white">
                  <v-icon>mdi-cloud-upload</v-icon>
                </v-avatar>
              </template>
              <div class="text-h6 mb-1">Uploading Files</div>
              <p class="mb-2">Please wait while we upload your files...</p>
              <v-progress-linear
                model-value="70"
                color="warning"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="mt-2 text-caption">
                3 of 5 files uploaded
              </div>
            </v-alert>

            <!-- Error Alert with Actions -->
            <v-alert
              type="error"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-avatar color="error" class="text-white">
                  <v-icon>mdi-alert-circle</v-icon>
                </v-avatar>
              </template>
              <div class="text-h6 mb-1">Storage Limit Exceeded</div>
              <p class="mb-2">Your storage space is running low. Please upgrade your plan or free up some space.</p>
              <v-progress-linear
                model-value="95"
                color="error"
                height="8"
                rounded
              ></v-progress-linear>
              <div class="d-flex align-center justify-space-between mt-2">
                <span class="text-caption">95% used of 1GB</span>
                <div>
                  <v-btn
                    color="error"
                    variant="text"
                    class="me-2"
                  >
                    Manage Files
                  </v-btn>
                  <v-btn
                    color="error"
                  >
                    Upgrade Plan
                  </v-btn>
                </div>
              </div>
            </v-alert>

            <!-- Info Alert with Timeline -->
            <v-alert
              type="info"
              class="mb-4"
            >
              <template v-slot:prepend>
                <v-avatar color="info" class="text-white">
                  <v-icon>mdi-information</v-icon>
                </v-avatar>
              </template>
              <div class="text-h6 mb-1">System Updates</div>
              <p class="mb-2">Recent system updates and changes:</p>
              <v-timeline density="compact" class="mt-2">
                <v-timeline-item
                  v-for="(update, index) in systemUpdates"
                  :key="index"
                  :dot-color="update.color"
                  size="small"
                >
                  <div class="text-caption">{{ update.time }}</div>
                  <div>{{ update.text }}</div>
                </v-timeline-item>
              </v-timeline>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Border Alerts -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Border Alerts</v-card-title>
          <v-card-text>
            <v-alert
              v-for="(alert, index) in borderAlerts"
              :key="index"
              :type="alert.type"
              :title="alert.title"
              variant="outlined"
              class="mb-4"
              border
            >
              {{ alert.text }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dense Alerts -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Dense Alerts</v-card-title>
          <v-card-text>
            <v-alert
              v-for="(alert, index) in basicAlerts"
              :key="index"
              :type="alert.type"
              :title="alert.title"
              density="compact"
              class="mb-4"
            >
              {{ alert.text }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiAlert',

  data() {
    return {
      basicAlerts: [
        {
          type: 'success',
          title: 'Success Alert',
          text: 'This is a success alert — check it out!'
        },
        {
          type: 'info',
          title: 'Info Alert',
          text: 'This is an info alert — check it out!'
        },
        {
          type: 'warning',
          title: 'Warning Alert',
          text: 'This is a warning alert — check it out!'
        },
        {
          type: 'error',
          title: 'Error Alert',
          text: 'This is an error alert — check it out!'
        }
      ],
      variants: ['elevated', 'flat', 'tonal', 'outlined', 'text'],
      closableAlerts: [
        {
          type: 'success',
          title: 'Task Completed',
          text: 'Your task has been completed successfully.',
          visible: true
        },
        {
          type: 'info',
          title: 'New Update Available',
          text: 'A new software update is available for download.',
          visible: true
        },
        {
          type: 'warning',
          title: 'Storage Space Low',
          text: 'You are running low on storage space.',
          visible: true
        },
        {
          type: 'error',
          title: 'Connection Error',
          text: 'Failed to connect to the server.',
          visible: true
        }
      ],
      borderAlerts: [
        {
          type: 'success',
          title: 'Border Success',
          text: 'This is a bordered success alert.'
        },
        {
          type: 'info',
          title: 'Border Info',
          text: 'This is a bordered info alert.'
        },
        {
          type: 'warning',
          title: 'Border Warning',
          text: 'This is a bordered warning alert.'
        },
        {
          type: 'error',
          title: 'Border Error',
          text: 'This is a bordered error alert.'
        }
      ],
      systemUpdates: [
        {
          time: '2 minutes ago',
          text: 'Security patches installed',
          color: 'success'
        },
        {
          time: '1 hour ago',
          text: 'Database backup completed',
          color: 'info'
        },
        {
          time: '3 hours ago',
          text: 'System optimization performed',
          color: 'warning'
        }
      ]
    }
  },

  methods: {
    restoreAlerts() {
      this.closableAlerts.forEach(alert => {
        alert.visible = true
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

.v-timeline {
  background-color: transparent;
  
  .v-timeline-item {
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>