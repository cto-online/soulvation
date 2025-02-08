<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Parallax -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Parallax</v-card-title>
          <v-card-text>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              height="400"
            >
              <div class="d-flex flex-column align-center justify-center">
                <div class="text-h2 text-white mb-4">Welcome</div>
                <div class="text-h4 text-white">To our website</div>
              </div>
            </v-parallax>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Content with Parallax -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Content with Parallax</v-card-title>
          <v-card-text>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
              height="300"
            >
              <div class="d-flex flex-column align-center justify-center">
                <div class="text-h3 text-white mb-4">Our Services</div>
                <v-row class="mx-auto" style="max-width: 600px">
                  <v-col
                    v-for="(service, index) in services"
                    :key="index"
                    cols="12"
                    md="4"
                  >
                    <v-card
                      class="pa-4 text-center"
                      elevation="8"
                      height="100%"
                    >
                      <v-icon
                        :icon="service.icon"
                        color="primary"
                        size="48"
                        class="mb-2"
                      ></v-icon>
                      <div class="text-h6 mb-2">{{ service.title }}</div>
                      <div class="text-body-2">{{ service.description }}</div>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-parallax>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multiple Parallax -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Multiple Parallax</v-card-title>
          <v-card-text>
            <div class="position-relative">
              <v-parallax
                src="https://cdn.vuetifyjs.com/images/parallax/material3.jpg"
                height="200"
              >
                <div class="text-h3 text-white text-center">Section 1</div>
              </v-parallax>

              <div class="py-12 bg-surface">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="text-h4 mb-4">About Us</div>
                      <p class="text-body-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
                        height="300"
                        cover
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </div>

              <v-parallax
                src="https://cdn.vuetifyjs.com/images/parallax/material4.jpg"
                height="200"
              >
                <div class="text-h3 text-white text-center">Section 2</div>
              </v-parallax>

              <div class="py-12 bg-surface">
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        height="300"
                        cover
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="text-h4 mb-4">Our Mission</div>
                      <p class="text-body-1">
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Parallax -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Parallax</v-card-title>
          <v-card-text>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material5.jpg"
              height="400"
            >
              <div class="d-flex flex-column align-center justify-center">
                <div class="text-h3 text-white mb-4">Our Team</div>
                <v-row justify="center">
                  <v-col
                    v-for="(member, index) in teamMembers"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card
                        v-bind="props"
                        :elevation="isHovering ? 12 : 2"
                        class="mx-auto transition-swing"
                        max-width="200"
                      >
                        <v-img
                          :src="member.avatar"
                          height="200"
                          cover
                        >
                          <v-overlay
                            :model-value="isHovering"
                            contained
                            class="align-center justify-center"
                            scrim="primary"
                          >
                            <div class="d-flex flex-column align-center">
                              <div class="text-h6 text-white mb-2">{{ member.name }}</div>
                              <div class="text-subtitle-2 text-white mb-4">{{ member.position }}</div>
                              <div class="d-flex gap-2">
                                <v-btn
                                  v-for="social in member.socials"
                                  :key="social.icon"
                                  :icon="social.icon"
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
              </div>
            </v-parallax>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Parallax with Video -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Parallax with Video</v-card-title>
          <v-card-text>
            <v-parallax height="500">
              <template v-slot:default>
                <video
                  autoplay
                  loop
                  muted
                  playsinline
                  class="video-background"
                >
                  <source
                    src="https://cdn.vuetifyjs.com/videos/parallax.mp4"
                    type="video/mp4"
                  >
                </video>
                <div class="video-overlay d-flex flex-column align-center justify-center">
                  <div class="text-h2 text-white mb-4">Video Background</div>
                  <div class="text-h5 text-white mb-8">With Parallax Effect</div>
                  <v-btn
                    color="primary"
                    size="x-large"
                    rounded
                  >
                    Get Started
                  </v-btn>
                </div>
              </template>
            </v-parallax>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Parallax with Stats -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Parallax with Stats</v-card-title>
          <v-card-text>
            <v-parallax
              src="https://cdn.vuetifyjs.com/images/parallax/material6.jpg"
              height="300"
            >
              <div class="d-flex flex-column align-center justify-center">
                <v-row class="stats-container">
                  <v-col
                    v-for="(stat, index) in stats"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <div class="text-center">
                      <div class="text-h2 text-white mb-2">{{ stat.value }}</div>
                      <div class="text-h6 text-white">{{ stat.label }}</div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-parallax>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiParallax',

  data() {
    return {
      services: [
        {
          icon: 'mdi-web',
          title: 'Web Design',
          description: 'Modern and responsive web design solutions'
        },
        {
          icon: 'mdi-cellphone',
          title: 'Mobile Apps',
          description: 'Native and cross-platform mobile applications'
        },
        {
          icon: 'mdi-cog',
          title: 'Development',
          description: 'Custom software development services'
        }
      ],
      teamMembers: [
        {
          name: 'John Doe',
          position: 'CEO',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-email' }
          ]
        },
        {
          name: 'Jane Smith',
          position: 'Designer',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-email' }
          ]
        },
        {
          name: 'Bob Wilson',
          position: 'Developer',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-email' }
          ]
        },
        {
          name: 'Alice Brown',
          position: 'Marketing',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-email' }
          ]
        }
      ],
      stats: [
        { value: '1000+', label: 'Clients' },
        { value: '500+', label: 'Projects' },
        { value: '50+', label: 'Countries' },
        { value: '100%', label: 'Satisfaction' }
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

.gap-2 {
  gap: 0.5rem;
}

.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.video-overlay {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.stats-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 8px;
}
</style>