<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Lists -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Lists</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(item, index) in basicItems"
                :key="index"
                :title="item.title"
                :subtitle="item.subtitle"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- List with Actions -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>List with Actions</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(item, index) in actionItems"
                :key="index"
                :title="item.title"
                :subtitle="item.subtitle"
              >
                <template v-slot:prepend>
                  <v-avatar :color="item.color">
                    {{ item.initials }}
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    @click="showMenu(item)"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Selectable List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Selectable List</span>
            <v-chip>{{ selected.length }} selected</v-chip>
          </v-card-title>
          <v-card-text>
            <v-list
              v-model:selected="selected"
              select-strategy="multiple"
              item-value="id"
            >
              <v-list-item
                v-for="item in selectableItems"
                :key="item.id"
                :value="item"
                :title="item.title"
                :subtitle="item.subtitle"
              >
                <template v-slot:prepend="{ isSelected }">
                  <v-list-item-action start>
                    <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Grouped List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Grouped List</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-group
                v-for="(group, index) in groupedItems"
                :key="index"
                :value="group.title"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    :title="group.title"
                    :subtitle="group.subtitle"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="group.icon"></v-icon>
                    </template>
                  </v-list-item>
                </template>

                <v-list-item
                  v-for="(item, itemIndex) in group.items"
                  :key="itemIndex"
                  :title="item.title"
                  :subtitle="item.subtitle"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive List -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive List</v-card-title>
          <v-card-text>
            <v-list lines="three">
              <v-list-item
                v-for="(task, index) in tasks"
                :key="index"
                :class="{ 'text-decoration-line-through': task.completed }"
              >
                <template v-slot:prepend>
                  <v-checkbox-btn
                    v-model="task.completed"
                    :color="task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'"
                  ></v-checkbox-btn>
                </template>

                <v-list-item-title>{{ task.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>

                <template v-slot:append>
                  <div class="d-flex align-center">
                    <v-chip
                      :color="task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'"
                      size="small"
                      class="me-2"
                    >
                      {{ task.priority }}
                    </v-chip>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon="mdi-dots-vertical"
                          variant="text"
                          v-bind="props"
                        ></v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(action, actionIndex) in taskActions"
                          :key="actionIndex"
                          :title="action.title"
                          :prepend-icon="action.icon"
                          @click="handleTaskAction(task, action)"
                        ></v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Navigation List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Navigation List</v-card-title>
          <v-card-text>
            <v-list nav>
              <v-list-item
                v-for="(item, index) in navItems"
                :key="index"
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.value"
                :active="activeNav === item.value"
                @click="activeNav = item.value"
              >
                <template v-slot:append>
                  <v-badge
                    v-if="item.badge"
                    :content="item.badge"
                    :color="item.badgeColor"
                  ></v-badge>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom List -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom List</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(notification, index) in notifications"
                :key="index"
                :subtitle="notification.time"
              >
                <template v-slot:prepend>
                  <v-avatar :color="notification.color">
                    <v-icon :icon="notification.icon" color="white"></v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="mb-1">
                  {{ notification.title }}
                </v-list-item-title>

                <div class="text-body-2">
                  {{ notification.message }}
                </div>

                <template v-slot:append>
                  <v-btn
                    variant="text"
                    size="small"
                    :color="notification.color"
                  >
                    {{ notification.action }}
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiList',

  data() {
    return {
      selected: [],
      activeNav: 'dashboard',
      basicItems: [
        { title: 'Inbox', subtitle: 'jan@example.com', icon: 'mdi-inbox' },
        { title: 'Sent', subtitle: '15 messages', icon: 'mdi-send' },
        { title: 'Drafts', subtitle: '3 drafts', icon: 'mdi-file' }
      ],
      actionItems: [
        { title: 'John Doe', subtitle: 'Software Engineer', initials: 'JD', color: 'primary' },
        { title: 'Jane Smith', subtitle: 'UI Designer', initials: 'JS', color: 'success' },
        { title: 'Bob Wilson', subtitle: 'Product Manager', initials: 'BW', color: 'warning' }
      ],
      selectableItems: [
        { id: 1, title: 'Photos', subtitle: '15 items' },
        { id: 2, title: 'Documents', subtitle: '10 items' },
        { id: 3, title: 'Music', subtitle: '25 items' }
      ],
      groupedItems: [
        {
          title: 'Development',
          subtitle: '3 items',
          icon: 'mdi-code-braces',
          items: [
            { title: 'Frontend', subtitle: 'Vue.js, React', icon: 'mdi-language-javascript' },
            { title: 'Backend', subtitle: 'Node.js, Python', icon: 'mdi-nodejs' }
          ]
        },
        {
          title: 'Design',
          subtitle: '2 items',
          icon: 'mdi-palette',
          items: [
            { title: 'UI Design', subtitle: 'Figma files', icon: 'mdi-monitor' },
            { title: 'Graphics', subtitle: 'Illustrations', icon: 'mdi-image' }
          ]
        }
      ],
      tasks: [
        {
          title: 'Implement Login',
          description: 'Create login page with authentication',
          priority: 'High',
          completed: false
        },
        {
          title: 'Design Homepage',
          description: 'Create new homepage design',
          priority: 'Medium',
          completed: true
        },
        {
          title: 'Write Documentation',
          description: 'Document API endpoints',
          priority: 'Low',
          completed: false
        }
      ],
      taskActions: [
        { title: 'Edit', icon: 'mdi-pencil' },
        { title: 'Delete', icon: 'mdi-delete' },
        { title: 'Share', icon: 'mdi-share-variant' }
      ],
      navItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', value: 'dashboard', badge: '2', badgeColor: 'error' },
        { title: 'Messages', icon: 'mdi-message', value: 'messages', badge: '5', badgeColor: 'primary' },
        { title: 'Settings', icon: 'mdi-cog', value: 'settings' },
        { title: 'Help', icon: 'mdi-help-circle', value: 'help' }
      ],
      notifications: [
        {
          title: 'New Message',
          message: 'You have received a new message from John',
          time: '2 minutes ago',
          icon: 'mdi-email',
          color: 'primary',
          action: 'Read'
        },
        {
          title: 'Task Completed',
          message: 'Homepage design has been completed',
          time: '1 hour ago',
          icon: 'mdi-check-circle',
          color: 'success',
          action: 'View'
        },
        {
          title: 'System Update',
          message: 'New version available for download',
          time: '3 hours ago',
          icon: 'mdi-update',
          color: 'info',
          action: 'Update'
        }
      ]
    }
  },

  methods: {
    showMenu(item: any) {
      console.log('Show menu for:', item.title)
    },

    handleTaskAction(task: any, action: any) {
      console.log(`${action.title} task:`, task.title)
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
</style>