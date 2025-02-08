<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Tabs -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Tabs</v-card-title>
          <v-card-text>
            <v-tabs v-model="tab">
              <v-tab value="one">Tab 1</v-tab>
              <v-tab value="two">Tab 2</v-tab>
              <v-tab value="three">Tab 3</v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item value="one">
                <div class="pa-4">
                  <div class="text-h6 mb-2">Tab 1 Content</div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </v-window-item>

              <v-window-item value="two">
                <div class="pa-4">
                  <div class="text-h6 mb-2">Tab 2 Content</div>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </v-window-item>

              <v-window-item value="three">
                <div class="pa-4">
                  <div class="text-h6 mb-2">Tab 3 Content</div>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Tab Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Tab Colors</v-card-title>
          <v-card-text>
            <v-tabs
              v-model="colorTab"
              :color="colors[selectedColorIndex]"
              align-tabs="center"
            >
              <v-tab
                v-for="color in colors"
                :key="color"
                :value="color"
                @click="selectedColorIndex = colors.indexOf(color)"
              >
                {{ color }}
              </v-tab>
            </v-tabs>

            <v-window v-model="colorTab">
              <v-window-item
                v-for="color in colors"
                :key="color"
                :value="color"
              >
                <div class="pa-4">
                  <v-sheet
                    :color="color"
                    class="pa-4 rounded"
                  >
                    <div class="text-h6 text-white mb-2">{{ color }} Theme</div>
                    <p class="text-white">This is an example of {{ color }} themed content.</p>
                  </v-sheet>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Icon Tabs -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Icon Tabs</v-card-title>
          <v-card-text>
            <v-tabs
              v-model="iconTab"
              grow
            >
              <v-tab
                v-for="item in iconItems"
                :key="item.value"
                :value="item.value"
              >
                <v-icon start>{{ item.icon }}</v-icon>
                {{ item.text }}
              </v-tab>
            </v-tabs>

            <v-window v-model="iconTab">
              <v-window-item
                v-for="item in iconItems"
                :key="item.value"
                :value="item.value"
              >
                <div class="pa-4">
                  <div class="d-flex align-center mb-4">
                    <v-icon
                      :icon="item.icon"
                      size="32"
                      :color="item.color"
                      class="me-4"
                    ></v-icon>
                    <div class="text-h6">{{ item.text }}</div>
                  </div>
                  <p>{{ item.content }}</p>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Tabs -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Tabs</v-card-title>
          <v-card-text>
            <v-tabs
              v-model="interactiveTab"
              show-arrows
            >
              <v-tab
                v-for="(project, index) in projects"
                :key="index"
                :value="index"
              >
                <v-badge
                  :content="project.tasks.length"
                  :color="project.color"
                  offset-x="-12"
                  offset-y="-8"
                >
                  {{ project.name }}
                </v-badge>
              </v-tab>
            </v-tabs>

            <v-window v-model="interactiveTab">
              <v-window-item
                v-for="(project, index) in projects"
                :key="index"
                :value="index"
              >
                <div class="pa-4">
                  <div class="d-flex justify-space-between align-center mb-4">
                    <div class="text-h6">{{ project.name }}</div>
                    <v-btn
                      :color="project.color"
                      size="small"
                      prepend-icon="mdi-plus"
                      @click="addTask(index)"
                    >
                      Add Task
                    </v-btn>
                  </div>

                  <v-list>
                    <v-list-item
                      v-for="(task, taskIndex) in project.tasks"
                      :key="taskIndex"
                      :title="task.title"
                      :subtitle="task.date"
                    >
                      <template v-slot:prepend>
                        <v-checkbox-btn
                          v-model="task.completed"
                          :color="project.color"
                        ></v-checkbox-btn>
                      </template>

                      <template v-slot:append>
                        <v-btn
                          icon="mdi-delete"
                          variant="text"
                          size="small"
                          color="error"
                          @click="removeTask(index, taskIndex)"
                        ></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>

                  <div class="mt-4">
                    <v-progress-linear
                      :model-value="getProjectProgress(project)"
                      :color="project.color"
                      height="8"
                      rounded
                    >
                      <template v-slot:default="{ value }">
                        <strong>{{ Math.ceil(value) }}%</strong>
                      </template>
                    </v-progress-linear>
                  </div>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiTabs',

  data() {
    return {
      tab: 'one',
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorTab: 'primary',
      selectedColorIndex: 0,
      iconTab: 'profile',
      iconItems: [
        {
          value: 'profile',
          text: 'Profile',
          icon: 'mdi-account',
          color: 'primary',
          content: 'View and edit your profile information.'
        },
        {
          value: 'settings',
          text: 'Settings',
          icon: 'mdi-cog',
          color: 'success',
          content: 'Manage your application settings.'
        },
        {
          value: 'notifications',
          text: 'Notifications',
          icon: 'mdi-bell',
          color: 'warning',
          content: 'View and manage your notifications.'
        }
      ],
      interactiveTab: 0,
      projects: [
        {
          name: 'Development',
          color: 'primary',
          tasks: [
            { title: 'Setup Project', date: '2024-02-08', completed: true },
            { title: 'Create Components', date: '2024-02-09', completed: false },
            { title: 'Write Tests', date: '2024-02-10', completed: false }
          ]
        },
        {
          name: 'Design',
          color: 'success',
          tasks: [
            { title: 'Create Mockups', date: '2024-02-08', completed: true },
            { title: 'Design System', date: '2024-02-09', completed: true }
          ]
        },
        {
          name: 'Marketing',
          color: 'warning',
          tasks: [
            { title: 'Social Media Plan', date: '2024-02-08', completed: false },
            { title: 'Content Strategy', date: '2024-02-09', completed: false }
          ]
        }
      ]
    }
  },

  methods: {
    addTask(projectIndex: number) {
      const newTask = {
        title: `New Task ${this.projects[projectIndex].tasks.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        completed: false
      }
      this.projects[projectIndex].tasks.push(newTask)
    },

    removeTask(projectIndex: number, taskIndex: number) {
      this.projects[projectIndex].tasks.splice(taskIndex, 1)
    },

    getProjectProgress(project: any): number {
      if (project.tasks.length === 0) return 0
      const completedTasks = project.tasks.filter((task: any) => task.completed).length
      return (completedTasks / project.tasks.length) * 100
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