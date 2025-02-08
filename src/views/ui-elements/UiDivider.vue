<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Dividers -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Dividers</v-card-title>
          <v-card-text>
            <div class="text-body-1 mb-4">
              Above divider
            </div>
            <v-divider></v-divider>
            <div class="text-body-1 mt-4">
              Below divider
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Vertical Dividers -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Vertical Dividers</v-card-title>
          <v-card-text>
            <div class="d-flex align-center" style="height: 100px;">
              <div class="text-body-1">
                Left content
              </div>
              <v-divider vertical class="mx-4"></v-divider>
              <div class="text-body-1">
                Middle content
              </div>
              <v-divider vertical class="mx-4"></v-divider>
              <div class="text-body-1">
                Right content
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Divider with Text -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Divider with Text</v-card-title>
          <v-card-text>
            <div class="text-body-1 mb-4">
              Above divider
            </div>
            <div class="divider-wrapper">
              <v-divider>
                <span class="divider-text">OR</span>
              </v-divider>
            </div>
            <div class="text-body-1 mt-4">
              Below divider
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Inset Dividers -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Inset Dividers</v-card-title>
          <v-card-text>
            <v-list lines="one">
              <v-list-item
                v-for="(item, index) in listItems"
                :key="index"
                :title="item.title"
                :subtitle="item.subtitle"
              >
                <template v-slot:prepend>
                  <v-avatar :color="item.color">
                    {{ item.initials }}
                  </v-avatar>
                </template>
              </v-list-item>
              <v-divider inset></v-divider>
              <v-list-item
                v-for="(item, index) in listItems2"
                :key="index"
                :title="item.title"
                :subtitle="item.subtitle"
              >
                <template v-slot:prepend>
                  <v-avatar :color="item.color">
                    {{ item.initials }}
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Colored Dividers -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Colored Dividers</v-card-title>
          <v-card-text>
            <div v-for="(color, index) in colors" :key="index" class="mb-4">
              <div class="text-body-1 mb-2">{{ color }} divider</div>
              <v-divider :color="color" :thickness="2"></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Divider in Card -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Divider in Card</v-card-title>
          <v-card-text>
            <v-card variant="outlined">
              <v-card-item>
                <v-card-title>Card Title</v-card-title>
                <v-card-subtitle>Card Subtitle</v-card-subtitle>
              </v-card-item>

              <v-divider></v-divider>

              <v-card-text>
                This is the main content of the card.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="text"
                >
                  Action
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Divider in Menu -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Divider in Menu</v-card-title>
          <v-card-text>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                >
                  Menu with Dividers
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menuItems1"
                  :key="index"
                  :value="index"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  v-for="(item, index) in menuItems2"
                  :key="index"
                  :value="index + menuItems1.length"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Divider with Icons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Divider with Icons</v-card-title>
          <v-card-text>
            <div class="divider-wrapper">
              <v-divider>
                <v-icon color="primary">mdi-star</v-icon>
              </v-divider>
            </div>

            <div class="divider-wrapper my-4">
              <v-divider>
                <div class="d-flex align-center">
                  <v-icon color="error" class="me-2">mdi-heart</v-icon>
                  <span class="text-error">Favorite</span>
                  <v-icon color="error" class="ms-2">mdi-heart</v-icon>
                </div>
              </v-divider>
            </div>

            <div class="divider-wrapper">
              <v-divider>
                <v-btn
                  size="small"
                  color="primary"
                  variant="text"
                >
                  Button
                </v-btn>
              </v-divider>
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
  name: 'UiDivider',

  data() {
    return {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      listItems: [
        {
          title: 'John Doe',
          subtitle: 'Software Engineer',
          color: 'primary',
          initials: 'JD'
        },
        {
          title: 'Jane Smith',
          subtitle: 'UI Designer',
          color: 'success',
          initials: 'JS'
        }
      ],
      listItems2: [
        {
          title: 'Bob Wilson',
          subtitle: 'Product Manager',
          color: 'warning',
          initials: 'BW'
        },
        {
          title: 'Alice Brown',
          subtitle: 'Marketing',
          color: 'error',
          initials: 'AB'
        }
      ],
      menuItems1: [
        { title: 'Profile', icon: 'mdi-account' },
        { title: 'Settings', icon: 'mdi-cog' }
      ],
      menuItems2: [
        { title: 'Help', icon: 'mdi-help-circle' },
        { title: 'Logout', icon: 'mdi-logout' }
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

.divider-wrapper {
  position: relative;
  text-align: center;

  .divider-text {
    background-color: rgb(var(--v-theme-surface));
    padding: 0 1rem;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }
}
</style>