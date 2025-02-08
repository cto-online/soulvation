<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Images -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Images</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(image, index) in basicImages"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-img
                  :src="image.src"
                  :height="200"
                  :alt="image.alt"
                  cover
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Image Aspects -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Image Aspects</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(aspect, index) in aspects"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                  :aspect-ratio="aspect.ratio"
                  cover
                >
                  <div class="text-overlay">
                    {{ aspect.text }}
                  </div>
                </v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Image with Gradient -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Image with Gradient</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(gradient, index) in gradients"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                  height="200"
                  cover
                >
                  <div :class="gradient.class">
                    <div class="text-h6 text-white pa-4">
                      {{ gradient.title }}
                    </div>
                  </div>
                </v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Image with Loading -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Image with Loading</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  height="200"
                  cover
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-col>

              <v-col cols="12" sm="6">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-linear
                        indeterminate
                        color="primary"
                      ></v-progress-linear>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Images -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Images</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(item, index) in interactiveImages"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-img
                    v-bind="props"
                    :src="item.src"
                    height="200"
                    cover
                  >
                    <v-overlay
                      :model-value="isHovering"
                      contained
                      class="align-center justify-center"
                      scrim="primary"
                    >
                      <v-btn
                        color="white"
                        variant="text"
                        :prepend-icon="item.icon"
                      >
                        {{ item.action }}
                      </v-btn>
                    </v-overlay>
                  </v-img>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Image Gallery -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Image Gallery</span>
            <v-btn-toggle
              v-model="galleryView"
              mandatory
              density="comfortable"
            >
              <v-btn value="grid" icon="mdi-view-grid"></v-btn>
              <v-btn value="masonry" icon="mdi-view-quilt"></v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text>
            <v-row :class="galleryView === 'masonry' ? 'masonry' : ''">
              <v-col
                v-for="(image, index) in galleryImages"
                :key="index"
                :cols="galleryView === 'grid' ? 4 : 6"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 12 : 2"
                  >
                    <v-img
                      :src="image.src"
                      :height="galleryView === 'grid' ? 200 : image.height"
                      cover
                    >
                      <v-overlay
                        :model-value="isHovering"
                        contained
                        class="align-center justify-center"
                      >
                        <div class="d-flex flex-column align-center">
                          <div class="text-h6 text-white mb-2">{{ image.title }}</div>
                          <div class="d-flex gap-2">
                            <v-btn
                              icon="mdi-magnify"
                              variant="text"
                              color="white"
                              size="small"
                            ></v-btn>
                            <v-btn
                              icon="mdi-heart"
                              variant="text"
                              color="white"
                              size="small"
                            ></v-btn>
                            <v-btn
                              icon="mdi-download"
                              variant="text"
                              color="white"
                              size="small"
                            ></v-btn>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiImage',

  data() {
    return {
      galleryView: 'grid',
      basicImages: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          alt: 'House'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          alt: 'Road'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          alt: 'Plane'
        }
      ],
      aspects: [
        { ratio: 16/9, text: '16:9 Aspect' },
        { ratio: 4/3, text: '4:3 Aspect' },
        { ratio: 1, text: '1:1 Aspect' }
      ],
      gradients: [
        {
          title: 'Top to Bottom',
          class: 'gradient-overlay-tb'
        },
        {
          title: 'Bottom to Top',
          class: 'gradient-overlay-bt'
        },
        {
          title: 'Radial',
          class: 'gradient-overlay-radial'
        }
      ],
      interactiveImages: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          icon: 'mdi-magnify',
          action: 'View'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          icon: 'mdi-heart',
          action: 'Like'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          icon: 'mdi-share-variant',
          action: 'Share'
        }
      ],
      galleryImages: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          title: 'Modern House',
          height: 300
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
          title: 'Mountain Road',
          height: 400
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
          title: 'Private Jet',
          height: 250
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Sunny Beach',
          height: 350
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          title: 'Gourmet Kitchen',
          height: 280
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/hotel.jpg',
          title: 'Luxury Hotel',
          height: 320
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

.text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
  text-align: center;
}

.gradient-overlay-tb {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
}

.gradient-overlay-bt {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
}

.gradient-overlay-radial {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.7) 100%);
}

.gap-2 {
  gap: 0.5rem;
}

.masonry {
  column-count: 2;
  column-gap: 1rem;

  .v-col {
    display: inline-block;
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>