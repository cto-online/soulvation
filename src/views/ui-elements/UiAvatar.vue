<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Avatars -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Avatars</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-4 mb-6">
              <v-avatar
                v-for="size in [24, 32, 40, 48, 56, 64]"
                :key="size"
                :size="size"
                color="primary"
              >
                <span class="text-white">JD</span>
              </v-avatar>
            </div>

            <div class="d-flex align-center gap-4">
              <v-avatar
                v-for="(user, index) in users.slice(0, 6)"
                :key="index"
                :image="user.image"
                size="48"
              ></v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Avatar Variants -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Avatar Variants</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-4 mb-6">
              <v-avatar
                v-for="variant in variants"
                :key="variant"
                :variant="variant"
                color="primary"
                size="48"
              >
                <span class="text-white">JD</span>
              </v-avatar>
            </div>

            <div class="d-flex align-center gap-4">
              <v-avatar
                v-for="variant in variants"
                :key="variant"
                :variant="variant"
                size="48"
                image="https://cdn.vuetifyjs.com/images/john.jpg"
              ></v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Avatar Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Avatar Colors</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-4 mb-6">
              <v-avatar
                v-for="color in colors"
                :key="color"
                :color="color"
                size="48"
              >
                <span class="text-white">{{ color.charAt(0).toUpperCase() }}</span>
              </v-avatar>
            </div>

            <div class="d-flex align-center gap-4">
              <v-avatar
                v-for="color in colors"
                :key="color"
                :color="color"
                size="48"
                variant="outlined"
              >
                <span>{{ color.charAt(0).toUpperCase() }}</span>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Avatar Groups -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Avatar Groups</span>
            <v-select
              v-model="maxAvatars"
              :items="[2, 3, 4, 5]"
              label="Max Avatars"
              density="compact"
              hide-details
              style="width: 100px"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <div class="mb-6">
              <v-avatar-group
                :max="maxAvatars"
                size="48"
              >
                <v-avatar
                  v-for="user in users"
                  :key="user.id"
                  :color="user.color"
                >
                  <span class="text-white">{{ user.initials }}</span>
                </v-avatar>
              </v-avatar-group>
            </div>

            <div>
              <v-avatar-group
                :max="maxAvatars"
                size="48"
              >
                <v-avatar
                  v-for="user in users"
                  :key="user.id"
                  :image="user.image"
                ></v-avatar>
              </v-avatar-group>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Avatar with Badge -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Avatar with Badge</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-badge
                dot
                color="success"
                location="bottom end"
                offset-x="3"
                offset-y="3"
              >
                <v-avatar
                  size="48"
                  image="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-avatar>
              </v-badge>

              <v-badge
                content="3"
                color="error"
                location="bottom end"
                offset-x="3"
                offset-y="3"
              >
                <v-avatar
                  size="48"
                  color="primary"
                >
                  <span class="text-white">JD</span>
                </v-avatar>
              </v-badge>

              <v-badge
                icon="mdi-crown"
                color="warning"
                location="bottom end"
                offset-x="3"
                offset-y="3"
              >
                <v-avatar
                  size="48"
                  color="info"
                >
                  <span class="text-white">VIP</span>
                </v-avatar>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Avatars -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Avatars</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-hover v-slot="{ isHovering, props }">
                <v-avatar
                  v-bind="props"
                  size="64"
                  :elevation="isHovering ? 8 : 2"
                  :class="{ 'on-hover': isHovering }"
                  color="primary"
                >
                  <v-icon
                    :color="isHovering ? 'white' : undefined"
                    size="32"
                  >
                    {{ isHovering ? 'mdi-pencil' : 'mdi-account' }}
                  </v-icon>
                </v-avatar>
              </v-hover>

              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-avatar
                    v-bind="props"
                    size="64"
                    color="info"
                    style="cursor: pointer"
                  >
                    <span class="text-h6">JD</span>
                  </v-avatar>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :value="index"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-dialog
                v-model="dialog"
                width="300"
              >
                <template v-slot:activator="{ props }">
                  <v-avatar
                    v-bind="props"
                    size="64"
                    image="https://cdn.vuetifyjs.com/images/john.jpg"
                    style="cursor: pointer"
                  ></v-avatar>
                </template>
                <v-card>
                  <v-card-text class="text-center pa-4">
                    <v-avatar
                      size="96"
                      image="https://cdn.vuetifyjs.com/images/john.jpg"
                      class="mb-4"
                    ></v-avatar>
                    <div class="text-h6">John Doe</div>
                    <div class="text-subtitle-1 mb-2">Software Engineer</div>
                    <div class="d-flex justify-center">
                      <v-btn
                        v-for="action in profileActions"
                        :key="action.icon"
                        :icon="action.icon"
                        variant="text"
                        size="small"
                        class="mx-1"
                      ></v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Content -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Content</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-avatar
                size="64"
                rounded="0"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  cover
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-avatar>

              <v-avatar
                size="64"
                rounded="sm"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-avatar
                      color="grey-lighten-4"
                      size="64"
                    >
                      <v-icon
                        color="grey-lighten-1"
                        size="32"
                      >
                        mdi-image
                      </v-icon>
                    </v-avatar>
                  </template>
                </v-img>
              </v-avatar>

              <v-avatar
                size="64"
                rounded="lg"
                class="elevation-4"
              >
                <v-img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  cover
                >
                  <v-overlay
                    activator="hover"
                    contained
                    class="align-center justify-center"
                  >
                    <v-btn
                      variant="text"
                      icon="mdi-download"
                      color="white"
                    ></v-btn>
                  </v-overlay>
                </v-img>
              </v-avatar>
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
  name: 'UiAvatar',

  data() {
    return {
      dialog: false,
      maxAvatars: 3,
      variants: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain'],
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      users: [
        {
          id: 1,
          initials: 'JD',
          color: 'primary',
          image: 'https://cdn.vuetifyjs.com/images/john.jpg'
        },
        {
          id: 2,
          initials: 'JS',
          color: 'success',
          image: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          id: 3,
          initials: 'BW',
          color: 'warning',
          image: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          id: 4,
          initials: 'AB',
          color: 'error',
          image: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
        },
        {
          id: 5,
          initials: 'CD',
          color: 'info',
          image: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
        }
      ],
      menuItems: [
        { title: 'View Profile', icon: 'mdi-account' },
        { title: 'Edit Profile', icon: 'mdi-pencil' },
        { title: 'Change Photo', icon: 'mdi-camera' },
        { title: 'Settings', icon: 'mdi-cog' }
      ],
      profileActions: [
        { icon: 'mdi-email' },
        { icon: 'mdi-phone' },
        { icon: 'mdi-chat' },
        { icon: 'mdi-share-variant' }
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

.gap-8 {
  gap: 2rem;
}

.on-hover {
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}
</style>