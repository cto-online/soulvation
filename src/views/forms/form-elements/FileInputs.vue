<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic File Input -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic File Input</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="basic.files"
              label="Choose file"
              variant="outlined"
              accept="image/*"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multiple Files -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Multiple Files</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="multiple.files"
              label="Choose files"
              multiple
              variant="outlined"
              show-size
              counter
            ></v-file-input>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid">
              <v-file-input
                v-model="validation.file"
                :rules="validation.rules"
                label="Required file"
                variant="outlined"
                accept="image/*"
                show-size
                required
              ></v-file-input>
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

      <!-- With Preview -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Preview</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="preview.file"
              label="Choose image"
              variant="outlined"
              accept="image/*"
              @update:model-value="handlePreview"
              show-size
            ></v-file-input>
            <div v-if="preview.url" class="mt-4">
              <v-img
                :src="preview.url"
                max-height="200"
                contain
              ></v-img>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Drag and Drop -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Drag and Drop</v-card-title>
          <v-card-text>
            <v-file-input
              v-model="dragDrop.files"
              label="Drop files here"
              multiple
              variant="outlined"
              show-size
              accept="image/*,.pdf,.doc,.docx"
              :rules="dragDrop.rules"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-cloud-upload</v-icon>
              </template>
              <template v-slot:selection="{ fileNames }">
                <template v-for="fileName in fileNames" :key="fileName">
                  <v-chip
                    label
                    size="small"
                    color="primary"
                    class="me-2"
                  >
                    {{ fileName }}
                  </v-chip>
                </template>
              </template>
            </v-file-input>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Upload -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Upload</v-card-title>
          <v-card-text>
            <div
              class="custom-upload pa-8 rounded-lg"
              :class="{ 'custom-upload--dragging': customUpload.isDragging }"
              @dragenter.prevent="customUpload.isDragging = true"
              @dragleave.prevent="customUpload.isDragging = false"
              @dragover.prevent
              @drop.prevent="handleCustomDrop"
            >
              <div class="text-center">
                <v-icon
                  color="primary"
                  size="48"
                  class="mb-4"
                >
                  mdi-cloud-upload-outline
                </v-icon>
                <h3 class="text-h6 mb-2">Drop files here or click to upload</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">
                  Support for images, documents, and more
                </p>
                <v-btn
                  color="primary"
                  prepend-icon="mdi-plus"
                  @click="triggerFileInput"
                >
                  Select Files
                </v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  class="d-none"
                  @change="handleCustomFileSelect"
                >
              </div>
            </div>

            <!-- Upload Progress -->
            <div v-if="customUpload.files.length" class="mt-6">
              <v-list>
                <v-list-item
                  v-for="file in customUpload.files"
                  :key="file.name"
                >
                  <template v-slot:prepend>
                    <v-icon :color="file.status === 'success' ? 'success' : 'primary'">
                      {{ file.status === 'success' ? 'mdi-check-circle' : 'mdi-file' }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ file.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ formatFileSize(file.size) }}
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-progress-circular
                      v-if="file.status === 'uploading'"
                      :model-value="file.progress"
                      color="primary"
                      size="24"
                    ></v-progress-circular>
                  </template>
                </v-list-item>
              </v-list>
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
  name: 'FileInputs',

  data() {
    return {
      basic: {
        files: null
      },
      multiple: {
        files: []
      },
      validation: {
        valid: true,
        file: null,
        rules: [
          (v: any) => !!v || 'File is required',
          (v: any) => !v || v.size < 2000000 || 'File size should be less than 2 MB'
        ]
      },
      preview: {
        file: null,
        url: null as string | null
      },
      dragDrop: {
        files: [],
        rules: [
          (v: any) => !v || !v.length || v.length <= 5 || 'Maximum 5 files allowed',
          (v: any) => !v || !v.length || v.every((file: File) => file.size < 2000000) || 'File size should be less than 2 MB'
        ]
      },
      customUpload: {
        isDragging: false,
        files: [] as Array<{
          name: string;
          size: number;
          status: 'uploading' | 'success';
          progress: number;
        }>
      }
    }
  },

  methods: {
    submitValidation() {
      if (this.validation.valid) {
        console.log('File submitted:', this.validation.file)
      }
    },

    handlePreview(file: File | null) {
      if (!file) {
        this.preview.url = null
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.preview.url = e.target?.result as string
      }
      reader.readAsDataURL(file)
    },

    triggerFileInput() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      fileInput.click()
    },

    handleCustomFileSelect(event: Event) {
      const files = (event.target as HTMLInputElement).files
      if (files) {
        this.uploadFiles(Array.from(files))
      }
    },

    handleCustomDrop(event: DragEvent) {
      this.customUpload.isDragging = false
      const files = event.dataTransfer?.files
      if (files) {
        this.uploadFiles(Array.from(files))
      }
    },

    uploadFiles(files: File[]) {
      files.forEach(file => {
        const uploadFile = {
          name: file.name,
          size: file.size,
          status: 'uploading' as const,
          progress: 0
        }

        this.customUpload.files.push(uploadFile)

        // Simulate upload progress
        const interval = setInterval(() => {
          const index = this.customUpload.files.findIndex(f => f.name === file.name)
          if (index === -1) return clearInterval(interval)

          if (this.customUpload.files[index].progress >= 100) {
            this.customUpload.files[index].status = 'success'
            clearInterval(interval)
          } else {
            this.customUpload.files[index].progress += 10
          }
        }, 500)
      })
    },

    formatFileSize(bytes: number) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-upload {
  border: 2px dashed var(--v-border-color);
  transition: all 0.3s ease;

  &--dragging {
    border-color: var(--v-primary-base);
    background: var(--v-primary-lighten5);
  }
}
</style>