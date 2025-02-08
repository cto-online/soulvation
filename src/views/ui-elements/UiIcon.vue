<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Icons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-icon
                v-for="icon in basicIcons"
                :key="icon"
                :icon="icon"
                size="24"
              ></v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-icon
                v-for="color in colors"
                :key="color"
                icon="mdi-star"
                :color="color"
                size="24"
              ></v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Sizes -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon Sizes</v-card-title>
          <v-card-text>
            <div class="d-flex align-center flex-wrap gap-4">
              <v-icon
                v-for="size in [16, 24, 32, 48]"
                :key="size"
                icon="mdi-heart"
                color="error"
                :size="size"
              ></v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Buttons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon Buttons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-4">
              <v-btn
                v-for="(icon, index) in actionIcons"
                :key="index"
                :icon="icon.icon"
                :color="icon.color"
              ></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon with Badge -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon with Badge</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-8">
              <v-badge
                content="3"
                color="error"
              >
                <v-icon icon="mdi-email" size="32"></v-icon>
              </v-badge>

              <v-badge
                dot
                color="success"
              >
                <v-icon icon="mdi-bell" size="32"></v-icon>
              </v-badge>

              <v-badge
                content="99+"
                color="primary"
              >
                <v-icon icon="mdi-cart" size="32"></v-icon>
              </v-badge>

              <v-badge
                icon="mdi-check"
                color="success"
              >
                <v-icon icon="mdi-account" size="32"></v-icon>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Animated Icons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Animated Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-8">
              <v-icon
                v-for="(icon, index) in animatedIcons"
                :key="index"
                :icon="icon.icon"
                :color="icon.color"
                size="32"
                :class="icon.animation"
              ></v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Groups -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon Groups</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(group, index) in iconGroups"
                :key="index"
                cols="12"
                md="4"
              >
                <v-card variant="outlined">
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-icon
                        :icon="group.icon"
                        :color="group.color"
                        size="32"
                      ></v-icon>
                    </template>
                    <v-card-title>{{ group.title }}</v-card-title>
                  </v-card-item>
                  <v-card-text>
                    <div class="d-flex flex-wrap gap-2">
                      <v-icon
                        v-for="(subIcon, subIndex) in group.icons"
                        :key="subIndex"
                        :icon="subIcon"
                        :color="group.color"
                        size="24"
                      ></v-icon>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Icons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-8">
              <v-hover v-slot="{ isHovering, props }">
                <v-icon
                  v-bind="props"
                  :icon="isHovering ? 'mdi-heart' : 'mdi-heart-outline'"
                  :color="isHovering ? 'error' : undefined"
                  size="32"
                ></v-icon>
              </v-hover>

              <v-hover v-slot="{ isHovering, props }">
                <v-icon
                  v-bind="props"
                  :icon="isHovering ? 'mdi-star' : 'mdi-star-outline'"
                  :color="isHovering ? 'warning' : undefined"
                  size="32"
                ></v-icon>
              </v-hover>

              <v-hover v-slot="{ isHovering, props }">
                <v-icon
                  v-bind="props"
                  :icon="isHovering ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                  :color="isHovering ? 'primary' : undefined"
                  size="32"
                ></v-icon>
              </v-hover>

              <v-hover v-slot="{ isHovering, props }">
                <v-icon
                  v-bind="props"
                  :icon="isHovering ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                  :color="isHovering ? 'success' : undefined"
                  size="32"
                ></v-icon>
              </v-hover>
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
  name: 'UiIcon',

  data() {
    return {
      basicIcons: [
        'mdi-home',
        'mdi-account',
        'mdi-cog',
        'mdi-email',
        'mdi-bell',
        'mdi-calendar',
        'mdi-file',
        'mdi-folder'
      ],
      colors: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error'
      ],
      actionIcons: [
        { icon: 'mdi-pencil', color: 'primary' },
        { icon: 'mdi-delete', color: 'error' },
        { icon: 'mdi-content-copy', color: 'info' },
        { icon: 'mdi-share-variant', color: 'success' }
      ],
      animatedIcons: [
        { icon: 'mdi-refresh', color: 'primary', animation: 'rotate' },
        { icon: 'mdi-bell-ring', color: 'warning', animation: 'shake' },
        { icon: 'mdi-heart-pulse', color: 'error', animation: 'pulse' },
        { icon: 'mdi-star', color: 'warning', animation: 'bounce' }
      ],
      iconGroups: [
        {
          title: 'Communication',
          icon: 'mdi-message',
          color: 'primary',
          icons: [
            'mdi-email',
            'mdi-chat',
            'mdi-phone',
            'mdi-video',
            'mdi-forum'
          ]
        },
        {
          title: 'Media',
          icon: 'mdi-play-circle',
          color: 'error',
          icons: [
            'mdi-play',
            'mdi-pause',
            'mdi-stop',
            'mdi-skip-next',
            'mdi-skip-previous'
          ]
        },
        {
          title: 'Files',
          icon: 'mdi-folder',
          color: 'warning',
          icons: [
            'mdi-file',
            'mdi-file-pdf',
            'mdi-file-word',
            'mdi-file-excel',
            'mdi-file-image'
          ]
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

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.rotate {
  animation: rotate 2s linear infinite;
}

.shake {
  animation: shake 0.5s ease-in-out infinite;
}

.pulse {
  animation: pulse 1s ease-in-out infinite;
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}
</style>