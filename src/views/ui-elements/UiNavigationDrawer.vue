<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Navigation Drawer -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Navigation Drawer</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              @click="drawer = !drawer"
            >
              Toggle Drawer
            </v-btn>

            <v-navigation-drawer
              v-model="drawer"
              location="left"
              temporary
            >
              <v-list>
                <v-list-item
                  prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                  title="John Doe"
                  subtitle="john@example.com"
                ></v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  v-for="(item, index) in basicItems"
                  :key="index"
                  :value="index"
                  :prepend-icon="item.icon"
                  :title="item.title"
                ></v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Navigation Drawer with Groups -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Navigation Drawer with Groups</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              @click="groupDrawer = !groupDrawer"
            >
              Toggle Drawer
            </v-btn>

            <v-navigation-drawer
              v-model="groupDrawer"
              location="right"
              temporary
            >
              <v-list>
                <v-list-item
                  prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                  title="John Doe"
                  subtitle="Administrator"
                >
                  <template v-slot:append>
                    <v-btn
                      variant="text"
                      icon="mdi-cog"
                    ></v-btn>
                  </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-group
                  v-for="group in groupedItems"
                  :key="group.title"
                  :value="group.title"
                >
                  <template v-slot:activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      :prepend-icon="group.icon"
                      :title="group.title"
                    ></v-list-item>
                  </template>

                  <v-list-item
                    v-for="(item, index) in group.items"
                    :key="index"
                    :value="index"
                    :title="item.title"
                    :prepend-icon="item.icon"
                  >
                    <template v-slot:append v-if="item.badge">
                      <v-badge
                        :content="item.badge"
                        :color="item.badgeColor"
                      ></v-badge>
                    </template>
                  </v-list-item>
                </v-list-group>
              </v-list>

              <template v-slot:append>
                <div class="pa-4">
                  <v-btn
                    block
                    color="error"
                    prepend-icon="mdi-logout"
                  >
                    Logout
                  </v-btn>
                </div>
              </template>
            </v-navigation-drawer>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Mini Navigation Drawer -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Mini Navigation Drawer</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              @click="miniDrawer = !miniDrawer"
            >
              Toggle Drawer
            </v-btn>

            <v-navigation-drawer
              v-model="miniDrawer"
              :rail="rail"
              permanent
              @click="rail = false"
              location="left"
              temporary
            >
              <template v-slot:prepend>
                <v-list-item
                  lines="two"
                  :prepend-avatar="rail ? undefined : 'https://cdn.vuetifyjs.com/images/john.jpg'"
                  :title="rail ? undefined : 'John Doe'"
                  :subtitle="rail ? undefined : 'Administrator'"
                >
                  <template v-slot:append>
                    <v-btn
                      variant="text"
                      icon="mdi-chevron-left"
                      @click.stop="rail = !rail"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>

              <v-divider></v-divider>

              <v-list density="compact" nav>
                <v-list-item
                  v-for="item in miniItems"
                  :key="item.title"
                  :prepend-icon="item.icon"
                  :title="rail ? undefined : item.title"
                  :value="item.title"
                ></v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Navigation Drawer -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Navigation Drawer</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              @click="customDrawer = !customDrawer"
            >
              Toggle Drawer
            </v-btn>

            <v-navigation-drawer
              v-model="customDrawer"
              location="right"
              temporary
              class="custom-drawer"
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                height="200"
                cover
                class="drawer-header"
              >
                <v-row class="fill-height" align="end">
                  <v-col class="pa-4">
                    <v-avatar size="64">
                      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-avatar>
                    <div class="text-h6 text-white mt-2">John Doe</div>
                    <div class="text-subtitle-2 text-white">Administrator</div>
                  </v-col>
                </v-row>
              </v-img>

              <v-list>
                <v-list-subheader>MAIN MENU</v-list-subheader>

                <v-list-item
                  v-for="(item, index) in customItems"
                  :key="index"
                  :value="index"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  :subtitle="item.subtitle"
                  :class="{ 'active-item': activeItem === index }"
                  @click="activeItem = index"
                >
                  <template v-slot:append>
                    <v-chip
                      v-if="item.status"
                      :color="item.statusColor"
                      size="small"
                      class="ms-2"
                    >
                      {{ item.status }}
                    </v-chip>
                  </template>
                </v-list-item>

                <v-divider class="my-4"></v-divider>

                <v-list-subheader>SYSTEM</v-list-subheader>

                <v-list-item
                  prepend-icon="mdi-cog"
                  title="Settings"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-help-circle"
                  title="Help & Support"
                ></v-list-item>
              </v-list>

              <template v-slot:append>
                <v-divider></v-divider>
                <div class="pa-4">
                  <v-progress-linear
                    model-value="80"
                    color="primary"
                    height="8"
                    rounded
                    class="mb-2"
                  ></v-progress-linear>
                  <div class="text-caption">Storage: 80% used</div>
                </div>
              </template>
            </v-navigation-drawer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiNavigationDrawer',

  data() {
    return {
      drawer: false,
      groupDrawer: false,
      miniDrawer: false,
      customDrawer: false,
      rail: true,
      activeItem: 0,
      basicItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Profile', icon: 'mdi-account' },
        { title: 'Messages', icon: 'mdi-message' },
        { title: 'Settings', icon: 'mdi-cog' }
      ],
      groupedItems: [
        {
          title: 'Applications',
          icon: 'mdi-apps',
          items: [
            { title: 'Email', icon: 'mdi-email', badge: '3', badgeColor: 'error' },
            { title: 'Chat', icon: 'mdi-chat', badge: '5', badgeColor: 'primary' },
            { title: 'Calendar', icon: 'mdi-calendar' }
          ]
        },
        {
          title: 'Pages',
          icon: 'mdi-file',
          items: [
            { title: 'Authentication', icon: 'mdi-lock' },
            { title: 'Error Pages', icon: 'mdi-alert' },
            { title: 'User Profile', icon: 'mdi-account-circle' }
          ]
        }
      ],
      miniItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      customItems: [
        {
          title: 'Projects',
          subtitle: 'Current projects',
          icon: 'mdi-folder',
          status: '12 active',
          statusColor: 'success'
        },
        {
          title: 'Team',
          subtitle: 'Manage team members',
          icon: 'mdi-account-group',
          status: '3 new',
          statusColor: 'info'
        },
        {
          title: 'Analytics',
          subtitle: 'View statistics',
          icon: 'mdi-chart-bar',
          status: 'Updated',
          statusColor: 'warning'
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

.drawer-header {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
  }
}

.active-item {
  background-color: rgb(var(--v-theme-primary), 0.1);
}
</style>