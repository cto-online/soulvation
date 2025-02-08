<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      color="transparent"
      flat
      density="compact"
    >
      <v-spacer></v-spacer>

      <!-- Language Selector -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="mx-2"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(lang, index) in languages"
            :key="index"
            :value="lang.code"
            @click="changeLanguage(lang.code)"
          >
            <v-list-item-title>{{ lang.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Theme Toggle -->
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <!-- Left Side - Image -->
          <v-col
            cols="12"
            md="6"
            class="d-none d-md-flex align-center justify-center bg-primary"
          >
            <div class="text-center">
              <v-img
                src="/logo-light.svg"
                alt="Logo"
                max-width="200"
                class="mx-auto mb-6"
              ></v-img>
              <div class="text-h4 font-weight-bold text-white mb-2">
                {{ welcomeMessage }}
              </div>
              <div class="text-subtitle-1 text-white-lighten-2">
                {{ subMessage }}
              </div>
              <v-row class="mt-12 px-12">
                <v-col
                  v-for="(feature, index) in features"
                  :key="index"
                  cols="12"
                  sm="6"
                  class="px-6"
                >
                  <div class="d-flex align-center mb-4">
                    <v-icon
                      :icon="feature.icon"
                      color="white"
                      size="24"
                      class="me-2"
                    ></v-icon>
                    <div class="text-subtitle-2 text-white">
                      {{ feature.text }}
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-carousel
                v-if="testimonials.length"
                hide-delimiters
                height="200"
                class="mt-12 testimonial-carousel"
                :show-arrows="false"
              >
                <v-carousel-item
                  v-for="(testimonial, index) in testimonials"
                  :key="index"
                >
                  <div class="text-center px-12">
                    <div class="text-body-1 text-white-lighten-2 font-italic mb-4">
                      "{{ testimonial.text }}"
                    </div>
                    <div class="text-subtitle-2 text-white">
                      {{ testimonial.author }}
                    </div>
                    <div class="text-caption text-white-lighten-1">
                      {{ testimonial.role }}
                    </div>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </div>
          </v-col>

          <!-- Right Side - Content -->
          <v-col
            cols="12"
            md="6"
            class="d-flex align-center justify-center"
          >
            <v-sheet
              width="100%"
              max-width="500"
              class="pa-8"
            >
              <!-- Mobile Logo -->
              <div class="text-center d-md-none mb-8">
                <v-img
                  src="/logo.svg"
                  alt="Logo"
                  max-width="150"
                  class="mx-auto"
                ></v-img>
              </div>

              <!-- Router View -->
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>

              <!-- Social Links -->
              <div class="text-center mt-8">
                <div class="text-caption text-medium-emphasis mb-4">
                  {{ socialMessage }}
                </div>
                <div class="d-flex justify-center gap-2">
                  <v-btn
                    v-for="(social, index) in socialLinks"
                    :key="index"
                    :icon="social.icon"
                    variant="text"
                    size="small"
                    :href="social.link"
                    target="_blank"
                    rel="noopener noreferrer"
                  ></v-btn>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      color="transparent"
      class="d-flex flex-column"
    >
      <div class="px-4 py-2 text-center w-100">
        <span class="text-caption">
          &copy; {{ new Date().getFullYear() }} {{ companyName }}. {{ rightsText }}
        </span>
        <div class="mt-1">
          <v-btn
            v-for="(link, index) in footerLinks"
            :key="index"
            variant="text"
            density="compact"
            class="text-caption"
            :to="link.to"
          >
            {{ link.text }}
          </v-btn>
        </div>
      </div>
    </v-footer>

    <!-- Global Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top"
    >
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Global Loading -->
    <v-overlay
      v-model="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'BlankLayout',

  setup() {
    const layoutStore = useLayoutStore()
    const { theme, snackbar, loading } = storeToRefs(layoutStore)
    const { toggleTheme } = layoutStore

    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'de', name: 'Deutsch' }
    ]

    const features = [
      { icon: 'mdi-shield-check', text: 'Secure Authentication' },
      { icon: 'mdi-responsive', text: 'Responsive Design' },
      { icon: 'mdi-cog', text: 'Easy Configuration' },
      { icon: 'mdi-chart-bar', text: 'Advanced Analytics' }
    ]

    const testimonials = [
      {
        text: 'This dashboard has transformed how we manage our business.',
        author: 'John Smith',
        role: 'CEO, TechCorp'
      },
      {
        text: 'The best admin template we\'ve ever used.',
        author: 'Sarah Johnson',
        role: 'CTO, InnovateCo'
      }
    ]

    const socialLinks = [
      { icon: 'mdi-facebook', link: 'https://facebook.com' },
      { icon: 'mdi-twitter', link: 'https://twitter.com' },
      { icon: 'mdi-linkedin', link: 'https://linkedin.com' },
      { icon: 'mdi-github', link: 'https://github.com' }
    ]

    const footerLinks = [
      { text: 'Privacy Policy', to: '/privacy' },
      { text: 'Terms of Service', to: '/terms' },
      { text: 'Contact Us', to: '/contact' }
    ]

    const welcomeMessage = ref('Welcome to Soulvation')
    const subMessage = ref('Your complete admin dashboard solution')
    const socialMessage = ref('Or connect with')
    const companyName = ref('Soulvation')
    const rightsText = ref('All rights reserved.')

    const changeLanguage = (code: string) => {
      // Handle language change
      console.log('Language changed to:', code)
    }

    return {
      theme,
      snackbar,
      loading,
      toggleTheme,
      isDark: computed(() => theme.value === 'dark'),
      languages,
      features,
      testimonials,
      socialLinks,
      footerLinks,
      welcomeMessage,
      subMessage,
      socialMessage,
      companyName,
      rightsText,
      changeLanguage
    }
  }
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.v-main {
  background: rgb(var(--v-theme-surface));

  :deep(.v-container) {
    background: linear-gradient(
      135deg,
      rgb(var(--v-theme-surface)) 0%,
      rgb(var(--v-theme-surface-variant)) 100%
    );
  }
}

.bg-primary {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgb(var(--v-theme-secondary)) 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern.svg') repeat;
    opacity: 0.1;
  }
}

.testimonial-carousel {
  :deep(.v-carousel__controls) {
    background: transparent;
  }

  :deep(.v-carousel__item) {
    display: flex;
    align-items: center;
  }
}

.gap-2 {
  gap: 0.5rem;
}
</style>
