<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Cards -->
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200"
            cover
          ></v-img>
          <v-card-title>Top western road trips</v-card-title>
          <v-card-subtitle>1,000 miles of wonder</v-card-subtitle>
          <v-card-text>
            Hit the road and explore the western United States and Canada with these scenic routes.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">Explore</v-btn>
            <v-btn color="secondary">Share</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card with Hover -->
      <v-col cols="12" md="6" lg="4">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 12 : 2"
            :class="{ 'on-hover': isHovering }"
          >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              height="200"
              cover
            >
              <v-overlay
                v-if="isHovering"
                contained
                class="align-center justify-center"
              >
                <v-btn
                  color="white"
                  variant="text"
                >
                  View Details
                </v-btn>
              </v-overlay>
            </v-img>
            <v-card-title>Modern Home</v-card-title>
            <v-card-subtitle>$2,500,000</v-card-subtitle>
            <v-card-text>
              Luxurious modern home with stunning views and premium finishes.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-icon icon="mdi-bed"></v-icon>
              <span class="me-4">4</span>
              <v-icon icon="mdi-shower"></v-icon>
              <span class="me-4">3</span>
              <v-icon icon="mdi-car"></v-icon>
              <span>2</span>
              <v-spacer></v-spacer>
              <v-btn
                icon="mdi-heart"
                variant="text"
                :color="liked ? 'error' : undefined"
                @click="liked = !liked"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>

      <!-- Loading Card -->
      <v-col cols="12" md="6" lg="4">
        <v-card :loading="loading">
          <template v-slot:loader>
            <v-progress-linear
              indeterminate
              color="primary"
            ></v-progress-linear>
          </template>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            height="200"
            cover
          ></v-img>
          <v-card-title>Recipe of the Day</v-card-title>
          <v-card-subtitle>{{ recipe.title }}</v-card-subtitle>
          <v-card-text>
            <div class="mb-4">{{ recipe.description }}</div>
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-clock-outline" class="me-2"></v-icon>
              <span>{{ recipe.time }} mins</span>
            </div>
            <div class="d-flex align-center">
              <v-icon icon="mdi-fire" class="me-2"></v-icon>
              <span>{{ recipe.calories }} calories</span>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="refreshRecipe"
            >
              Refresh Recipe
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card with Tabs -->
      <v-col cols="12" md="6">
        <v-card>
          <v-tabs
            v-model="activeTab"
            color="primary"
          >
            <v-tab value="details">Details</v-tab>
            <v-tab value="specs">Specifications</v-tab>
            <v-tab value="reviews">Reviews</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="activeTab">
              <v-window-item value="details">
                <div class="text-h6 mb-2">Product Details</div>
                <p>{{ productDetails.description }}</p>
                <v-list>
                  <v-list-item
                    v-for="(feature, index) in productDetails.features"
                    :key="index"
                    :title="feature"
                    :prepend-icon="'mdi-check'"
                  ></v-list-item>
                </v-list>
              </v-window-item>

              <v-window-item value="specs">
                <div class="text-h6 mb-2">Technical Specifications</div>
                <v-list>
                  <v-list-item
                    v-for="(spec, key) in productDetails.specs"
                    :key="key"
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-information"></v-icon>
                    </template>
                    <v-list-item-title>{{ key }}</v-list-item-title>
                    <v-list-item-subtitle>{{ spec }}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-window-item>

              <v-window-item value="reviews">
                <div class="text-h6 mb-2">Customer Reviews</div>
                <v-list>
                  <v-list-item
                    v-for="review in productDetails.reviews"
                    :key="review.id"
                  >
                    <template v-slot:prepend>
                      <v-avatar color="primary">
                        {{ review.author.charAt(0) }}
                      </v-avatar>
                    </template>
                    <v-list-item-title>{{ review.author }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-rating
                        :model-value="review.rating"
                        color="warning"
                        density="compact"
                        readonly
                        half-increments
                      ></v-rating>
                    </v-list-item-subtitle>
                    <v-list-item-text>{{ review.comment }}</v-list-item-text>
                  </v-list-item>
                </v-list>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Card -->
      <v-col cols="12" md="6">
        <v-card>
          <v-toolbar
            color="primary"
            :title="project.name"
          >
            <template v-slot:append>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    v-bind="props"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(action, index) in projectActions"
                    :key="index"
                    :value="index"
                    @click="handleProjectAction(action)"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="action.icon"></v-icon>
                    </template>
                    <v-list-item-title>{{ action.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-toolbar>

          <v-card-text>
            <div class="mb-4">{{ project.description }}</div>
            <v-progress-linear
              :model-value="project.progress"
              color="primary"
              height="8"
              rounded
              class="mb-2"
            ></v-progress-linear>
            <div class="d-flex justify-space-between mb-4">
              <span class="text-caption">Progress</span>
              <span class="text-caption">{{ project.progress }}%</span>
            </div>

            <v-divider class="mb-4"></v-divider>

            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-calendar" class="me-2"></v-icon>
                <span>Due {{ project.dueDate }}</span>
              </div>
              <v-avatar-group max="3">
                <v-avatar
                  v-for="member in project.team"
                  :key="member.id"
                  :color="member.color"
                  size="32"
                >
                  {{ member.initials }}
                </v-avatar>
              </v-avatar-group>
            </div>

            <v-expansion-panels variant="accordion">
              <v-expansion-panel
                v-for="(task, index) in project.tasks"
                :key="index"
              >
                <v-expansion-panel-title>
                  <v-checkbox
                    v-model="task.completed"
                    :label="task.title"
                    hide-details
                    @click.stop
                  ></v-checkbox>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ task.description }}
                  <div class="d-flex align-center mt-2">
                    <v-chip
                      size="small"
                      :color="task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'"
                    >
                      {{ task.priority }}
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn
                      size="small"
                      variant="text"
                      prepend-icon="mdi-pencil"
                    >
                      Edit
                    </v-btn>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              prepend-icon="mdi-plus"
              variant="text"
            >
              Add Task
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              prepend-icon="mdi-check"
            >
              Complete Project
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiCard',

  data() {
    return {
      liked: false,
      loading: false,
      activeTab: 'details',
      recipe: {
        title: 'Pasta Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
        time: 30,
        calories: 650
      },
      productDetails: {
        description: 'Premium laptop designed for professionals and creatives.',
        features: [
          'High-performance processor',
          'Dedicated graphics card',
          'Long battery life',
          'Premium build quality'
        ],
        specs: {
          'Processor': 'Intel Core i7',
          'RAM': '16GB DDR4',
          'Storage': '512GB SSD',
          'Display': '15.6" 4K OLED'
        },
        reviews: [
          {
            id: 1,
            author: 'John Doe',
            rating: 4.5,
            comment: 'Great laptop for professional work.'
          },
          {
            id: 2,
            author: 'Jane Smith',
            rating: 5,
            comment: 'Perfect for my design work.'
          }
        ]
      },
      project: {
        name: 'Website Redesign',
        description: 'Complete overhaul of company website with modern design and improved functionality.',
        progress: 65,
        dueDate: '2024-03-15',
        team: [
          { id: 1, initials: 'JD', color: 'primary' },
          { id: 2, initials: 'JS', color: 'success' },
          { id: 3, initials: 'BW', color: 'warning' }
        ],
        tasks: [
          {
            title: 'Design Homepage',
            description: 'Create new homepage design with improved user experience.',
            completed: true,
            priority: 'High'
          },
          {
            title: 'Implement Backend API',
            description: 'Develop RESTful API for the website.',
            completed: false,
            priority: 'Medium'
          },
          {
            title: 'Content Migration',
            description: 'Migrate existing content to new platform.',
            completed: false,
            priority: 'Low'
          }
        ]
      },
      projectActions: [
        { title: 'Edit Project', icon: 'mdi-pencil' },
        { title: 'Share Project', icon: 'mdi-share-variant' },
        { title: 'Archive Project', icon: 'mdi-archive' },
        { title: 'Delete Project', icon: 'mdi-delete' }
      ]
    }
  },

  methods: {
    refreshRecipe() {
      this.loading = true
      setTimeout(() => {
        this.recipe = {
          title: 'Grilled Salmon',
          description: 'Fresh salmon fillet with herbs and lemon.',
          time: 25,
          calories: 450
        }
        this.loading = false
      }, 2000)
    },

    handleProjectAction(action: { title: string }) {
      console.log(`${action.title} clicked`)
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card {
  height: 100%;
}

.on-hover {
  transition: all 0.3s ease-in-out;
}

.v-card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.v-card-subtitle {
  opacity: 0.8;
}

.v-expansion-panel-title {
  padding: 16px;
}

.v-expansion-panel-text {
  padding: 0 16px 16px;
}
</style>