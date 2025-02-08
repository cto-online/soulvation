<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Snackbars -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Snackbars</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="primary"
                @click="showSnackbar('default')"
              >
                Default
              </v-btn>

              <v-btn
                color="primary"
                @click="showSnackbar('withAction')"
              >
                With Action
              </v-btn>

              <v-btn
                color="primary"
                @click="showSnackbar('multiLine')"
              >
                Multi-line
              </v-btn>
            </div>

            <v-snackbar
              v-model="snackbars.default"
              :timeout="2000"
            >
              This is a basic snackbar
            </v-snackbar>

            <v-snackbar
              v-model="snackbars.withAction"
              :timeout="2000"
            >
              Action has been completed

              <template v-slot:actions>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="snackbars.withAction = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <v-snackbar
              v-model="snackbars.multiLine"
              multi-line
              :timeout="2000"
            >
              This is a multi-line snackbar with more text to show how it handles longer content.
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Snackbar Colors -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Snackbar Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                v-for="(color, index) in colors"
                :key="index"
                :color="color"
                @click="showColorSnackbar(color)"
              >
                {{ color }}
              </v-btn>
            </div>

            <v-snackbar
              v-model="colorSnackbar.show"
              :color="colorSnackbar.color"
              :timeout="2000"
            >
              This is a {{ colorSnackbar.color }} snackbar

              <template v-slot:actions>
                <v-btn
                  variant="text"
                  @click="colorSnackbar.show = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Positioned Snackbars -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Positioned Snackbars</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                v-for="position in positions"
                :key="position.value"
                color="primary"
                @click="showPositionedSnackbar(position.value)"
              >
                {{ position.text }}
              </v-btn>
            </div>

            <v-snackbar
              v-model="positionedSnackbar.show"
              :location="positionedSnackbar.position"
              :timeout="2000"
            >
              Snackbar at {{ positionedSnackbar.position }}

              <template v-slot:actions>
                <v-btn
                  variant="text"
                  @click="positionedSnackbar.show = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Snackbars -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Interactive Snackbars</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                color="error"
                @click="showDeleteSnackbar"
              >
                Delete Item
              </v-btn>

              <v-btn
                color="success"
                @click="showUploadSnackbar"
              >
                Upload File
              </v-btn>

              <v-btn
                color="warning"
                @click="showUpdateSnackbar"
              >
                Update Available
              </v-btn>
            </div>

            <!-- Delete Snackbar -->
            <v-snackbar
              v-model="interactiveSnackbars.delete"
              color="error"
            >
              Item will be permanently deleted

              <template v-slot:actions>
                <v-btn
                  variant="text"
                  @click="cancelDelete"
                >
                  Cancel
                </v-btn>
                <v-btn
                  variant="text"
                  @click="confirmDelete"
                >
                  Confirm
                </v-btn>
              </template>
            </v-snackbar>

            <!-- Upload Snackbar -->
            <v-snackbar
              v-model="interactiveSnackbars.upload"
              color="success"
            >
              <v-card-text class="pa-0">
                <div class="d-flex align-center">
                  <v-progress-circular
                    :model-value="uploadProgress"
                    color="white"
                    class="me-4"
                  ></v-progress-circular>
                  <div>
                    <div>Uploading file...</div>
                    <div class="text-caption">{{ uploadProgress }}% complete</div>
                  </div>
                </div>
              </v-card-text>

              <template v-slot:actions>
                <v-btn
                  variant="text"
                  @click="cancelUpload"
                >
                  Cancel
                </v-btn>
              </template>
            </v-snackbar>

            <!-- Update Snackbar -->
            <v-snackbar
              v-model="interactiveSnackbars.update"
              color="warning"
            >
              A new version is available

              <template v-slot:actions>
                <v-btn
                  variant="text"
                  @click="interactiveSnackbars.update = false"
                >
                  Later
                </v-btn>
                <v-btn
                  variant="text"
                  @click="installUpdate"
                >
                  Update Now
                </v-btn>
              </template>
            </v-snackbar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiSnackbar',

  data() {
    return {
      snackbars: {
        default: false,
        withAction: false,
        multiLine: false
      },
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorSnackbar: {
        show: false,
        color: ''
      },
      positions: [
        { text: 'Top', value: 'top' },
        { text: 'Bottom', value: 'bottom' },
        { text: 'Left', value: 'left' },
        { text: 'Right', value: 'right' },
        { text: 'Top Left', value: 'top left' },
        { text: 'Top Right', value: 'top right' },
        { text: 'Bottom Left', value: 'bottom left' },
        { text: 'Bottom Right', value: 'bottom right' }
      ],
      positionedSnackbar: {
        show: false,
        position: 'bottom'
      },
      interactiveSnackbars: {
        delete: false,
        upload: false,
        update: false
      },
      uploadProgress: 0,
      uploadInterval: null as number | null
    }
  },

  methods: {
    showSnackbar(type: string) {
      this.snackbars[type as keyof typeof this.snackbars] = true
    },

    showColorSnackbar(color: string) {
      this.colorSnackbar.color = color
      this.colorSnackbar.show = true
    },

    showPositionedSnackbar(position: string) {
      this.positionedSnackbar.position = position
      this.positionedSnackbar.show = true
    },

    showDeleteSnackbar() {
      this.interactiveSnackbars.delete = true
    },

    showUploadSnackbar() {
      this.interactiveSnackbars.upload = true
      this.uploadProgress = 0
      this.uploadInterval = window.setInterval(() => {
        if (this.uploadProgress >= 100) {
          this.cancelUpload()
        } else {
          this.uploadProgress += 10
        }
      }, 500)
    },

    showUpdateSnackbar() {
      this.interactiveSnackbars.update = true
    },

    cancelDelete() {
      this.interactiveSnackbars.delete = false
    },

    confirmDelete() {
      // Handle delete confirmation
      this.interactiveSnackbars.delete = false
    },

    cancelUpload() {
      if (this.uploadInterval) {
        clearInterval(this.uploadInterval)
        this.uploadInterval = null
      }
      this.interactiveSnackbars.upload = false
      this.uploadProgress = 0
    },

    installUpdate() {
      // Handle update installation
      this.interactiveSnackbars.update = false
    }
  },

  beforeUnmount() {
    if (this.uploadInterval) {
      clearInterval(this.uploadInterval)
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