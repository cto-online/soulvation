<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      :rail="mini"
      permanent
      @click="mini = false"
    >
      <!-- App Logo -->
      <v-list-item
        prepend-avatar="/logo.svg"
        :title="mini ? '' : 'Soulvation'"
        :subtitle="mini ? '' : 'Admin Dashboard'"
        class="py-2"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="mini = !mini"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Navigation Menu -->
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          to="/dashboard/dashboard1"
        ></v-list-item>

        <!-- UI Elements -->
        <v-list-group value="ui">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-palette"
              title="UI Elements"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(item, index) in uiElements"
            :key="index"
            :title="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
          ></v-list-item>
        </v-list-group>

        <!-- Forms -->
        <v-list-group value="forms">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-form-select"
              title="Forms"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(item, index) in formElements"
            :key="index"
            :title="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
          ></v-list-item>
        </v-list-group>

        <!-- Tables -->
        <v-list-group value="tables">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-table"
              title="Tables"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(item, index) in tableElements"
            :key="index"
            :title="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <!-- Search -->
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        hide-details
        density="compact"
        class="app-bar-search mx-4"
        style="max-width: 300px"
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Theme Toggle -->
      <v-btn
        icon
        @click="toggleTheme"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <!-- Notifications -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="mx-2"
          >
            <v-badge
              :content="notifications.length"
              :model-value="notifications.length > 0"
              color="error"
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list width="300">
          <v-list-subheader>Notifications</v-list-subheader>
          <v-list-item
            v-for="notification in notifications"
            :key="notification.id"
            :title="notification.title"
            :subtitle="notification.message"
          >
            <template v-slot:prepend>
              <v-avatar :color="notification.color">
                <v-icon color="white">{{ notification.icon }}</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- User Menu -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar color="primary">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="Profile"
            to="/profile"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            to="/settings"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout"
          ></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BaseLayout',

  setup() {
    const layoutStore = useLayoutStore()
    const router = useRouter()
    const { drawer, mini, theme } = storeToRefs(layoutStore)
    const { toggleTheme } = layoutStore

    const search = ref('')
    const notifications = ref([
      {
        id: 1,
        title: 'New Update',
        message: 'System update available',
        icon: 'mdi-update',
        color: 'info'
      },
      {
        id: 2,
        title: 'New Message',
        message: 'You have a new message',
        icon: 'mdi-email',
        color: 'success'
      }
    ])

    const uiElements = [
      { title: 'Alert', to: '/ui/alert', icon: 'mdi-alert' },
      { title: 'Buttons', to: '/ui/button', icon: 'mdi-gesture-tap-button' },
      { title: 'Cards', to: '/ui/card', icon: 'mdi-card' },
      { title: 'Tables', to: '/ui/table', icon: 'mdi-table' }
    ]

    const formElements = [
      { title: 'Basic Forms', to: '/forms/basic', icon: 'mdi-form-select' },
      { title: 'Validation', to: '/forms/validation', icon: 'mdi-checkbox-marked-circle' }
    ]

    const tableElements = [
      { title: 'Basic Tables', to: '/tables/basic', icon: 'mdi-table' },
      { title: 'Data Tables', to: '/tables/data', icon: 'mdi-table-large' }
    ]

    const logout = () => {
      // Handle logout logic here
      router.push('/auth/login')
    }

    return {
      drawer,
      mini,
      theme,
      search,
      notifications,
      uiElements,
      formElements,
      tableElements,
      toggleTheme,
      logout,
      isDark: computed(() => theme.value === 'dark')
    }
  }
})
</script>

<style lang="scss" scoped>
.app-bar-search {
  .v-field__input {
    padding-top: 8px !important;
    padding-bottom: 8px !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>