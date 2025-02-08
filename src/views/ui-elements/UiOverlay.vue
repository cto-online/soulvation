<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Overlay -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Overlay</v-card-title>
          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="mx-auto"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                  height="200"
                  cover
                >
                  <v-overlay
                    :model-value="isHovering"
                    contained
                    class="align-center justify-center"
                  >
                    <v-btn
                      color="white"
                      variant="text"
                    >
                      View Details
                    </v-btn>
                  </v-overlay>
                </v-img>
              </v-card>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Overlay with Content -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Overlay with Content</v-card-title>
          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="mx-auto"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  height="200"
                  cover
                >
                  <v-overlay
                    :model-value="isHovering"
                    contained
                    class="align-center justify-center"
                    scrim="primary"
                  >
                    <div class="text-center">
                      <div class="text-h6 text-white mb-2">Recipe Title</div>
                      <div class="text-body-2 text-white mb-4">
                        A delicious recipe with detailed instructions
                      </div>
                      <v-btn
                        color="white"
                        variant="outlined"
                        class="me-2"
                      >
                        View Recipe
                      </v-btn>
                      <v-btn
                        color="white"
                        variant="outlined"
                      >
                        Save
                      </v-btn>
                    </div>
                  </v-overlay>
                </v-img>
              </v-card>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Gradient Overlay -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Gradient Overlay</v-card-title>
          <v-card-text>
            <v-card class="mx-auto">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200"
                cover
              >
                <div class="gradient-overlay d-flex align-end">
                  <div class="pa-4">
                    <div class="text-h6 text-white">Beautiful Sunset</div>
                    <div class="text-subtitle-2 text-white">
                      Captured at golden hour
                    </div>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Loading Overlay -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Loading Overlay</span>
            <v-btn
              color="primary"
              @click="loading = !loading"
            >
              Toggle Loading
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-card class="mx-auto">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                height="200"
                cover
              >
                <v-overlay
                  :model-value="loading"
                  contained
                  class="align-center justify-center"
                  persistent
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-overlay>
              </v-img>
              <v-card-text>
                <div class="text-h6">Content Loading</div>
                <p class="mt-2">
                  This content is being loaded. Please wait...
                </p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Overlay -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Overlay</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(item, index) in galleryItems"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    class="mx-auto"
                  >
                    <v-img
                      :src="item.image"
                      height="250"
                      cover
                    >
                      <v-overlay
                        :model-value="isHovering"
                        contained
                        class="align-center justify-center"
                        scrim="primary"
                      >
                        <div class="d-flex flex-column align-center">
                          <v-avatar
                            :image="item.avatar"
                            size="64"
                            class="mb-2"
                          ></v-avatar>
                          <div class="text-h6 text-white mb-2">{{ item.title }}</div>
                          <div class="text-body-2 text-white mb-4">{{ item.description }}</div>
                          <div class="d-flex gap-2">
                            <v-btn
                              v-for="action in item.actions"
                              :key="action.icon"
                              :icon="action.icon"
                              color="white"
                              variant="text"
                            >
                              <v-tooltip
                                activator="parent"
                                location="top"
                              >
                                {{ action.text }}
                              </v-tooltip>
                            </v-btn>
                          </div>
                        </div>
                      </v-overlay>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Overlay Effects -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Overlay Effects</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(effect, index) in overlayEffects"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    class="mx-auto"
                  >
                    <v-img
                      :src="effect.image"
                      height="200"
                      cover
                    >
                      <v-overlay
                        :model-value="isHovering"
                        contained
                        :class="['align-center justify-center', effect.class]"
                        :scrim="effect.scrim"
                      >
                        <div class="text-center">
                          <div class="text-h6 text-white mb-2">{{ effect.title }}</div>
                          <v-btn
                            :color="effect.buttonColor"
                            :variant="effect.buttonVariant"
                          >
                            {{ effect.buttonText }}
                          </v-btn>
                        </div>
                      </v-overlay>
                    </v-img>
                  </v-card>
                </v-hover>
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
  name: 'UiOverlay',

  data() {
    return {
      loading: false,
      galleryItems: [
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          title: 'Modern Architecture',
          description: 'Contemporary design with clean lines',
          actions: [
            { icon: 'mdi-heart', text: 'Like' },
            { icon: 'mdi-bookmark', text: 'Save' },
            { icon: 'mdi-share-variant', text: 'Share' }
          ]
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Gourmet Kitchen',
          description: 'Professional cooking space',
          actions: [
            { icon: 'mdi-heart', text: 'Like' },
            { icon: 'mdi-bookmark', text: 'Save' },
            { icon: 'mdi-share-variant', text: 'Share' }
          ]
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Natural Beauty',
          description: 'Scenic landscape photography',
          actions: [
            { icon: 'mdi-heart', text: 'Like' },
            { icon: 'mdi-bookmark', text: 'Save' },
            { icon: 'mdi-share-variant', text: 'Share' }
          ]
        }
      ],
      overlayEffects: [
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          title: 'Fade Effect',
          class: 'fade-overlay',
          scrim: 'primary',
          buttonColor: 'white',
          buttonVariant: 'outlined',
          buttonText: 'Learn More'
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          title: 'Slide Effect',
          class: 'slide-overlay',
          scrim: 'error',
          buttonColor: 'white',
          buttonVariant: 'outlined',
          buttonText: 'View Details'
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Zoom Effect',
          class: 'zoom-overlay',
          scrim: 'success',
          buttonColor: 'white',
          buttonVariant: 'outlined',
          buttonText: 'Explore'
        }
      ]
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

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
}

.gap-2 {
  gap: 0.5rem;
}

// Custom Overlay Effects
.fade-overlay {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.v-overlay--active {
    opacity: 1;
  }
}

.slide-overlay {
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  &.v-overlay--active {
    transform: translateY(0);
  }
}

.zoom-overlay {
  transform: scale(0);
  transition: transform 0.3s ease-in-out;

  &.v-overlay--active {
    transform: scale(1);
  }
}
</style>