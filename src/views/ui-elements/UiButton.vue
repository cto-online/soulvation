<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Buttons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn>Default</v-btn>
              <v-btn color="primary">Primary</v-btn>
              <v-btn color="secondary">Secondary</v-btn>
              <v-btn color="success">Success</v-btn>
              <v-btn color="info">Info</v-btn>
              <v-btn color="warning">Warning</v-btn>
              <v-btn color="error">Error</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Button Variants -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Button Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 mb-4">
              <v-btn
                v-for="variant in variants"
                :key="variant"
                color="primary"
                :variant="variant"
              >
                {{ variant }}
              </v-btn>
            </div>

            <div class="d-flex flex-wrap gap-4">
              <v-btn
                v-for="variant in variants"
                :key="variant"
                color="secondary"
                :variant="variant"
              >
                {{ variant }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Button Sizes -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Button Sizes</v-card-title>
          <v-card-text>
            <div class="d-flex align-center flex-wrap gap-4">
              <v-btn
                v-for="size in ['x-small', 'small', 'default', 'large', 'x-large']"
                :key="size"
                color="primary"
                :size="size"
              >
                {{ size }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Buttons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4 mb-4">
              <v-btn
                v-for="(icon, index) in icons"
                :key="index"
                :icon="icon"
                :color="colors[index % colors.length]"
              ></v-btn>
            </div>

            <div class="d-flex flex-wrap gap-4">
              <v-btn
                v-for="(icon, index) in icons"
                :key="index"
                :prepend-icon="icon"
                :color="colors[index % colors.length]"
              >
                {{ icon.replace('mdi-', '').replace(/-/g, ' ') }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Loading Buttons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Loading Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                :loading="loading"
                color="primary"
                @click="simulateLoading"
              >
                Submit
              </v-btn>

              <v-btn
                :loading="loading"
                color="secondary"
                prepend-icon="mdi-cloud-upload"
                @click="simulateLoading"
              >
                Upload
              </v-btn>

              <v-btn
                :loading="loading"
                color="success"
                @click="simulateLoading"
              >
                <template v-slot:loader>
                  <span>Loading...</span>
                </template>
                Save Changes
              </v-btn>

              <v-btn
                :loading="loading"
                color="info"
                @click="simulateLoading"
              >
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon>mdi-cached</v-icon>
                  </span>
                </template>
                Process
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Block Buttons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Block Buttons</v-card-title>
          <v-card-text>
            <v-btn
              block
              color="primary"
              class="mb-4"
            >
              Block Button
            </v-btn>

            <v-btn
              block
              color="secondary"
              variant="outlined"
              class="mb-4"
            >
              Block Outlined
            </v-btn>

            <v-btn
              block
              color="success"
              variant="tonal"
            >
              Block Tonal
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Button Groups -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Button Groups</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-btn-group>
                <v-btn>Left</v-btn>
                <v-btn>Center</v-btn>
                <v-btn>Right</v-btn>
              </v-btn-group>

              <v-btn-group mandatory>
                <v-btn
                  v-for="view in views"
                  :key="view.icon"
                  :value="view.value"
                >
                  <v-icon>{{ view.icon }}</v-icon>
                </v-btn>
              </v-btn-group>

              <v-btn-group
                divided
                color="primary"
              >
                <v-btn
                  v-for="action in actions"
                  :key="action.text"
                  :prepend-icon="action.icon"
                >
                  {{ action.text }}
                </v-btn>
              </v-btn-group>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Buttons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                :color="liked ? 'error' : undefined"
                :prepend-icon="liked ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="liked = !liked"
              >
                {{ liked ? 'Liked' : 'Like' }}
              </v-btn>

              <v-btn
                :color="following ? 'primary' : undefined"
                :variant="following ? 'flat' : 'outlined'"
                @click="following = !following"
              >
                {{ following ? 'Following' : 'Follow' }}
              </v-btn>

              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    Dropdown
                    <v-icon end>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in dropdownItems"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-dialog
                v-model="dialog"
                width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    Open Dialog
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    This is a dialog triggered by a button.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="primary"
                      @click="dialog = false"
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiButton',

  data() {
    return {
      loading: false,
      liked: false,
      following: false,
      dialog: false,
      variants: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain'],
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      icons: [
        'mdi-heart',
        'mdi-star',
        'mdi-account',
        'mdi-cog',
        'mdi-bell',
        'mdi-email'
      ],
      views: [
        { icon: 'mdi-view-list', value: 'list' },
        { icon: 'mdi-view-module', value: 'module' },
        { icon: 'mdi-view-grid', value: 'grid' }
      ],
      actions: [
        { icon: 'mdi-pencil', text: 'Edit' },
        { icon: 'mdi-content-copy', text: 'Copy' },
        { icon: 'mdi-delete', text: 'Delete' }
      ],
      dropdownItems: ['Action 1', 'Action 2', 'Action 3']
    }
  },

  methods: {
    simulateLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
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

.custom-loader {
  animation: loader 1s infinite;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>