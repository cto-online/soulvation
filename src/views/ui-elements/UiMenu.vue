<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Menus -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Menus</v-card-title>
          <v-card-text>
            <div class="d-flex gap-4">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    Menu
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, index) in basicItems"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="secondary"
                    v-bind="props"
                  >
                    With Icons
                    <v-icon end>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, index) in iconItems"
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
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Menu Positions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Menu Positions</v-card-title>
          <v-card-text>
            <div class="d-flex gap-4">
              <v-menu location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                  >
                    Top
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in basicItems"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="secondary"
                    v-bind="props"
                  >
                    Bottom
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in basicItems"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu location="start">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="success"
                    v-bind="props"
                  >
                    Start
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in basicItems"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu location="end">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="info"
                    v-bind="props"
                  >
                    End
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in basicItems"
                    :key="index"
                    :value="index"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cascading Menu -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Cascading Menu</v-card-title>
          <v-card-text>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                >
                  Cascading Menu
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, index) in cascadingItems"
                  :key="index"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>

                  <template v-slot:append>
                    <v-menu location="end" v-if="item.children">
                      <template v-slot:activator="{ props: menuProps }">
                        <v-btn
                          variant="text"
                          icon="mdi-chevron-right"
                          v-bind="menuProps"
                        ></v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(child, childIndex) in item.children"
                          :key="childIndex"
                        >
                          <template v-slot:prepend>
                            <v-icon :icon="child.icon"></v-icon>
                          </template>
                          <v-list-item-title>{{ child.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Menu -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Menu</v-card-title>
          <v-card-text>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                >
                  <v-avatar size="32" class="me-2">
                    <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                  </v-avatar>
                  John Doe
                  <v-icon end>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar size="40">
                      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title>John Doe</v-list-item-title>
                  <v-list-item-subtitle>john@example.com</v-list-item-subtitle>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  v-for="(item, index) in profileItems"
                  :key="index"
                  :value="index"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  :subtitle="item.subtitle"
                >
                  <template v-slot:append v-if="item.badge">
                    <v-badge
                      :content="item.badge"
                      :color="item.badgeColor"
                    ></v-badge>
                  </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  prepend-icon="mdi-logout"
                  title="Logout"
                  color="error"
                ></v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Context Menu -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Context Menu</v-card-title>
          <v-card-text>
            <v-menu
              v-model="showContext"
              :position-x="x"
              :position-y="y"
              absolute
            >
              <v-list>
                <v-list-item
                  v-for="(item, index) in contextItems"
                  :key="index"
                  :value="index"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  @click="handleContextAction(item)"
                ></v-list-item>
              </v-list>
            </v-menu>

            <div
              class="context-area pa-4 text-center"
              @contextmenu.prevent="showContextMenu"
            >
              Right click in this area to show context menu
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
  name: 'UiMenu',

  data() {
    return {
      showContext: false,
      x: 0,
      y: 0,
      basicItems: [
        { title: 'Option 1' },
        { title: 'Option 2' },
        { title: 'Option 3' }
      ],
      iconItems: [
        { title: 'Profile', icon: 'mdi-account' },
        { title: 'Settings', icon: 'mdi-cog' },
        { title: 'Logout', icon: 'mdi-logout' }
      ],
      cascadingItems: [
        {
          title: 'File',
          icon: 'mdi-file',
          children: [
            { title: 'New', icon: 'mdi-file-plus' },
            { title: 'Open', icon: 'mdi-folder-open' },
            { title: 'Save', icon: 'mdi-content-save' }
          ]
        },
        {
          title: 'Edit',
          icon: 'mdi-pencil',
          children: [
            { title: 'Cut', icon: 'mdi-content-cut' },
            { title: 'Copy', icon: 'mdi-content-copy' },
            { title: 'Paste', icon: 'mdi-content-paste' }
          ]
        }
      ],
      profileItems: [
        { title: 'Profile', subtitle: 'View your profile', icon: 'mdi-account' },
        { title: 'Messages', subtitle: 'View messages', icon: 'mdi-message', badge: '3', badgeColor: 'error' },
        { title: 'Settings', subtitle: 'Manage preferences', icon: 'mdi-cog' }
      ],
      contextItems: [
        { title: 'Cut', icon: 'mdi-content-cut' },
        { title: 'Copy', icon: 'mdi-content-copy' },
        { title: 'Paste', icon: 'mdi-content-paste' },
        { title: 'Delete', icon: 'mdi-delete' }
      ]
    }
  },

  methods: {
    showContextMenu(e: MouseEvent) {
      e.preventDefault()
      this.showContext = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showContext = true
      })
    },

    handleContextAction(item: any) {
      console.log('Context action:', item.title)
      this.showContext = false
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

.context-area {
  height: 200px;
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.2);
  border-radius: 4px;
  cursor: context-menu;
}
</style>