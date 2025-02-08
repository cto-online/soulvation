<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Expansion Panels -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Expansion Panels</v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item, i) in basicItems"
                :key="i"
              >
                <v-expansion-panel-title>{{ item.title }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ item.text }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Accordion -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Accordion</v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion">
              <v-expansion-panel
                v-for="(item, i) in accordionItems"
                :key="i"
              >
                <v-expansion-panel-title>
                  <v-icon
                    :icon="item.icon"
                    color="primary"
                    class="me-4"
                  ></v-icon>
                  {{ item.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ item.text }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Expansion Panels -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Expansion Panels</v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(item, i) in customItems"
                :key="i"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-avatar
                      :color="item.color"
                      size="32"
                      class="me-4"
                    >
                      <v-icon
                        :icon="item.icon"
                        color="white"
                      ></v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-subtitle-1">{{ item.title }}</div>
                      <div class="text-caption text-medium-emphasis">
                        {{ item.subtitle }}
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list>
                    <v-list-item
                      v-for="(subItem, index) in item.items"
                      :key="index"
                      :title="subItem.title"
                      :subtitle="subItem.subtitle"
                    >
                      <template v-slot:prepend>
                        <v-icon
                          :icon="subItem.icon"
                          :color="item.color"
                        ></v-icon>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Panels -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Interactive Panels</span>
            <v-btn-group>
              <v-btn
                :color="multiple ? 'primary' : undefined"
                @click="multiple = !multiple"
              >
                Multiple
              </v-btn>
              <v-btn
                :color="mandatory ? 'primary' : undefined"
                @click="mandatory = !mandatory"
              >
                Mandatory
              </v-btn>
            </v-btn-group>
          </v-card-title>
          <v-card-text>
            <v-expansion-panels
              v-model="panel"
              :multiple="multiple"
              :mandatory="mandatory"
            >
              <v-expansion-panel
                v-for="(task, i) in tasks"
                :key="i"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center justify-space-between flex-grow-1 me-4">
                    <div class="d-flex align-center">
                      <v-checkbox
                        v-model="task.completed"
                        :color="task.color"
                        @click.stop
                        hide-details
                        class="me-2"
                      ></v-checkbox>
                      <span :class="{ 'text-decoration-line-through': task.completed }">
                        {{ task.title }}
                      </span>
                    </div>
                    <v-chip
                      :color="task.color"
                      size="small"
                    >
                      {{ task.priority }}
                    </v-chip>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="mb-4">{{ task.description }}</div>
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-icon icon="mdi-calendar" class="me-2"></v-icon>
                      <span>Due {{ task.dueDate }}</span>
                    </div>
                    <div>
                      <v-btn
                        size="small"
                        :color="task.color"
                        variant="text"
                        prepend-icon="mdi-pencil"
                      >
                        Edit
                      </v-btn>
                      <v-btn
                        size="small"
                        color="error"
                        variant="text"
                        prepend-icon="mdi-delete"
                      >
                        Delete
                      </v-btn>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Nested Panels -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Nested Panels</v-card-title>
          <v-card-text>
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(category, i) in nestedItems"
                :key="i"
              >
                <v-expansion-panel-title>
                  {{ category.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(subCategory, j) in category.items"
                      :key="j"
                    >
                      <v-expansion-panel-title>
                        {{ subCategory.title }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-list>
                          <v-list-item
                            v-for="(item, k) in subCategory.items"
                            :key="k"
                            :title="item.title"
                            :subtitle="item.description"
                          ></v-list-item>
                        </v-list>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiExpansionPanel',

  data() {
    return {
      panel: [],
      multiple: false,
      mandatory: false,
      basicItems: [
        {
          title: 'Item 1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          title: 'Item 2',
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          title: 'Item 3',
          text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        }
      ],
      accordionItems: [
        {
          title: 'Getting Started',
          icon: 'mdi-rocket-launch',
          text: 'Learn how to get started with our platform.'
        },
        {
          title: 'Configuration',
          icon: 'mdi-cog',
          text: 'Configure your application settings.'
        },
        {
          title: 'Advanced Features',
          icon: 'mdi-star',
          text: 'Explore advanced features and capabilities.'
        }
      ],
      customItems: [
        {
          title: 'Development',
          subtitle: '3 active projects',
          color: 'primary',
          icon: 'mdi-code-braces',
          items: [
            {
              title: 'Website Redesign',
              subtitle: 'In Progress',
              icon: 'mdi-web'
            },
            {
              title: 'Mobile App',
              subtitle: 'Planning',
              icon: 'mdi-cellphone'
            },
            {
              title: 'API Integration',
              subtitle: 'Completed',
              icon: 'mdi-api'
            }
          ]
        },
        {
          title: 'Design',
          subtitle: '2 active projects',
          color: 'success',
          icon: 'mdi-palette',
          items: [
            {
              title: 'UI Kit',
              subtitle: 'In Progress',
              icon: 'mdi-palette-swatch'
            },
            {
              title: 'Icon Set',
              subtitle: 'Review',
              icon: 'mdi-shape'
            }
          ]
        }
      ],
      tasks: [
        {
          title: 'Implement Login',
          description: 'Create login page with authentication',
          priority: 'High',
          color: 'error',
          completed: false,
          dueDate: '2024-02-15'
        },
        {
          title: 'Design Homepage',
          description: 'Create new homepage design',
          priority: 'Medium',
          color: 'warning',
          completed: true,
          dueDate: '2024-02-20'
        },
        {
          title: 'Write Documentation',
          description: 'Document API endpoints',
          priority: 'Low',
          color: 'success',
          completed: false,
          dueDate: '2024-02-25'
        }
      ],
      nestedItems: [
        {
          title: 'Frontend Development',
          items: [
            {
              title: 'JavaScript',
              items: [
                {
                  title: 'Vue.js',
                  description: 'Progressive JavaScript Framework'
                },
                {
                  title: 'React',
                  description: 'JavaScript Library for UI'
                }
              ]
            },
            {
              title: 'CSS',
              items: [
                {
                  title: 'Sass',
                  description: 'CSS Preprocessor'
                },
                {
                  title: 'Tailwind',
                  description: 'Utility-first CSS Framework'
                }
              ]
            }
          ]
        },
        {
          title: 'Backend Development',
          items: [
            {
              title: 'Node.js',
              items: [
                {
                  title: 'Express',
                  description: 'Web Application Framework'
                },
                {
                  title: 'NestJS',
                  description: 'Progressive Node.js Framework'
                }
              ]
            }
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
</style>