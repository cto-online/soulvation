<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Hover -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Hover</v-card-title>
          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 12 : 2"
                class="mx-auto"
                max-width="300"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  height="200"
                  cover
                ></v-img>
                <v-card-title>Hover Card</v-card-title>
                <v-card-text>
                  This card's elevation changes when you hover over it.
                </v-card-text>
              </v-card>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Hover with Overlay -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Hover with Overlay</v-card-title>
          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="mx-auto"
                max-width="300"
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
                <v-card-title>Hover Overlay</v-card-title>
                <v-card-text>
                  This card shows an overlay with a button on hover.
                </v-card-text>
              </v-card>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Hover Scale -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Hover Scale</v-card-title>
          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :class="{ 'on-hover': isHovering }"
                class="mx-auto"
                max-width="300"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200"
                  cover
                ></v-img>
                <v-card-title>Hover Scale</v-card-title>
                <v-card-text>
                  This card scales up when you hover over it.
                </v-card-text>
              </v-card>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Hover with Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Hover with Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-hover
                v-for="(icon, index) in icons"
                :key="index"
                v-slot="{ isHovering, props }"
              >
                <v-btn
                  v-bind="props"
                  :color="isHovering ? icon.activeColor : undefined"
                  :icon="isHovering ? icon.activeIcon : icon.icon"
                  size="x-large"
                ></v-btn>
              </v-hover>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Hover List -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Hover List</v-card-title>
          <v-card-text>
            <v-list lines="one">
              <v-hover
                v-for="(item, index) in listItems"
                :key="index"
                v-slot="{ isHovering, props }"
              >
                <v-list-item
                  v-bind="props"
                  :color="isHovering ? 'primary' : undefined"
                  :title="item.title"
                  :subtitle="item.subtitle"
                >
                  <template v-slot:prepend>
                    <v-avatar :color="isHovering ? 'primary' : item.color">
                      {{ item.initials }}
                    </v-avatar>
                  </template>
                  <template v-slot:append>
                    <v-fade-transition>
                      <v-btn
                        v-if="isHovering"
                        icon="mdi-dots-vertical"
                        variant="text"
                      ></v-btn>
                    </v-fade-transition>
                  </template>
                </v-list-item>
              </v-hover>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Hover -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Hover</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(project, index) in projects"
                :key="index"
                cols="12"
                md="4"
              >
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 8 : 2"
                    class="h-100"
                  >
                    <v-img
                      :src="project.image"
                      height="200"
                      cover
                      class="align-end"
                    >
                      <v-overlay
                        :model-value="isHovering"
                        contained
                        class="align-center justify-center"
                        scrim="primary"
                      >
                        <div class="d-flex flex-column align-center">
                          <v-rating
                            v-model="project.rating"
                            color="warning"
                            density="compact"
                            half-increments
                            readonly
                          ></v-rating>
                          <div class="text-white mt-2">
                            {{ project.views }} views
                          </div>
                        </div>
                      </v-overlay>
                    </v-img>
                    <v-card-title>{{ project.title }}</v-card-title>
                    <v-card-text>
                      <div class="mb-2">{{ project.description }}</div>
                      <v-chip-group>
                        <v-chip
                          v-for="(tag, tagIndex) in project.tags"
                          :key="tagIndex"
                          size="small"
                        >
                          {{ tag }}
                        </v-chip>
                      </v-chip-group>
                    </v-card-text>
                    <v-expand-transition>
                      <div v-if="isHovering">
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            variant="text"
                            color="primary"
                            prepend-icon="mdi-eye"
                          >
                            Preview
                          </v-btn>
                          <v-btn
                            variant="text"
                            color="primary"
                            prepend-icon="mdi-share-variant"
                          >
                            Share
                          </v-btn>
                        </v-card-actions>
                      </div>
                    </v-expand-transition>
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
  name: 'UiHover',

  data() {
    return {
      icons: [
        {
          icon: 'mdi-heart-outline',
          activeIcon: 'mdi-heart',
          activeColor: 'error'
        },
        {
          icon: 'mdi-star-outline',
          activeIcon: 'mdi-star',
          activeColor: 'warning'
        },
        {
          icon: 'mdi-bookmark-outline',
          activeIcon: 'mdi-bookmark',
          activeColor: 'primary'
        },
        {
          icon: 'mdi-thumb-up-outline',
          activeIcon: 'mdi-thumb-up',
          activeColor: 'success'
        }
      ],
      listItems: [
        {
          title: 'John Doe',
          subtitle: 'Software Engineer',
          initials: 'JD',
          color: 'primary'
        },
        {
          title: 'Jane Smith',
          subtitle: 'UI Designer',
          initials: 'JS',
          color: 'success'
        },
        {
          title: 'Bob Wilson',
          subtitle: 'Product Manager',
          initials: 'BW',
          color: 'warning'
        }
      ],
      projects: [
        {
          title: 'Modern Dashboard',
          description: 'A clean and modern admin dashboard template',
          image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          rating: 4.5,
          views: 1234,
          tags: ['Vue.js', 'Vuetify', 'TypeScript']
        },
        {
          title: 'E-commerce App',
          description: 'Full-featured e-commerce application',
          image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          rating: 4.8,
          views: 2345,
          tags: ['React', 'Node.js', 'MongoDB']
        },
        {
          title: 'Portfolio Website',
          description: 'Personal portfolio website template',
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          rating: 4.2,
          views: 987,
          tags: ['HTML', 'CSS', 'JavaScript']
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

.gap-4 {
  gap: 1rem;
}

.on-hover {
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
</style>