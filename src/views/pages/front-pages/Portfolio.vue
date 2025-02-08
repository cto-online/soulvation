<template>
  <div class="portfolio-page">
    <!-- Hero Section -->
    <section class="hero py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">Our Portfolio</h1>
            <p class="text-body-1">
              Explore our latest work and successful projects
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Portfolio Filter -->
    <section class="portfolio-filter">
      <v-container>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8">
            <v-chip-group
              v-model="selectedCategory"
              selected-class="primary"
              class="justify-center"
            >
              <v-chip
                v-for="category in categories"
                :key="category"
                :value="category"
                filter
              >
                {{ category }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <!-- Portfolio Grid -->
        <v-row>
          <v-col
            v-for="project in filteredProjects"
            :key="project.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="portfolio-card"
              @click="openProject(project)"
            >
              <v-img
                :src="project.image"
                height="250"
                cover
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>

              <v-overlay
                class="portfolio-overlay"
                contained
                scrim="primary"
                :model-value="false"
                absolute
              >
                <div class="d-flex flex-column align-center justify-center h-100">
                  <h3 class="text-h5 font-weight-bold text-white mb-2">
                    {{ project.title }}
                  </h3>
                  <p class="text-body-2 text-white mb-4">
                    {{ project.category }}
                  </p>
                  <v-btn
                    color="white"
                    variant="outlined"
                  >
                    View Details
                  </v-btn>
                </div>
              </v-overlay>

              <v-card-text class="pa-4">
                <h3 class="text-h6 font-weight-bold mb-1">
                  {{ project.title }}
                </h3>
                <p class="text-caption text-medium-emphasis mb-2">
                  {{ project.category }}
                </p>
                <p class="text-body-2">
                  {{ project.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Project Dialog -->
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card v-if="selectedProject">
        <v-img
          :src="selectedProject.image"
          height="400"
          cover
        ></v-img>
        <v-card-text class="pa-6">
          <h2 class="text-h4 font-weight-bold mb-4">
            {{ selectedProject.title }}
          </h2>
          <p class="text-body-1 mb-4">
            {{ selectedProject.description }}
          </p>
          <v-divider class="mb-4"></v-divider>
          <div class="project-details">
            <div class="mb-4">
              <h4 class="text-h6 font-weight-bold mb-2">Project Details</h4>
              <v-row>
                <v-col cols="6" md="3">
                  <p class="text-caption font-weight-medium mb-1">Client</p>
                  <p class="text-body-2">{{ selectedProject.client }}</p>
                </v-col>
                <v-col cols="6" md="3">
                  <p class="text-caption font-weight-medium mb-1">Date</p>
                  <p class="text-body-2">{{ selectedProject.date }}</p>
                </v-col>
                <v-col cols="6" md="3">
                  <p class="text-caption font-weight-medium mb-1">Category</p>
                  <p class="text-body-2">{{ selectedProject.category }}</p>
                </v-col>
                <v-col cols="6" md="3">
                  <p class="text-caption font-weight-medium mb-1">Technologies</p>
                  <p class="text-body-2">{{ selectedProject.technologies }}</p>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="outlined"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            :href="selectedProject.link"
            target="_blank"
          >
            Visit Project
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Portfolio',

  data() {
    return {
      selectedCategory: 'All',
      dialog: false,
      selectedProject: null,
      categories: ['All', 'Web Design', 'Mobile Apps', 'Branding', 'UI/UX'],
      projects: [
        {
          id: 1,
          title: 'E-commerce Platform',
          category: 'Web Design',
          description: 'Modern e-commerce platform with advanced features and seamless user experience.',
          image: '@/assets/images/portfolio/project1.jpg',
          client: 'TechStore Inc.',
          date: 'January 2024',
          technologies: 'Vue.js, Node.js',
          link: '#'
        },
        {
          id: 2,
          title: 'Fitness App',
          category: 'Mobile Apps',
          description: 'Mobile fitness application with workout tracking and nutrition planning.',
          image: '@/assets/images/portfolio/project2.jpg',
          client: 'FitLife',
          date: 'December 2023',
          technologies: 'React Native',
          link: '#'
        },
        {
          id: 3,
          title: 'Brand Identity',
          category: 'Branding',
          description: 'Complete brand identity design including logo, colors, and guidelines.',
          image: '@/assets/images/portfolio/project3.jpg',
          client: 'StartUp Co.',
          date: 'November 2023',
          technologies: 'Adobe Creative Suite',
          link: '#'
        },
        {
          id: 4,
          title: 'Dashboard Design',
          category: 'UI/UX',
          description: 'Intuitive dashboard interface for data visualization and analytics.',
          image: '@/assets/images/portfolio/project4.jpg',
          client: 'DataViz Corp',
          date: 'October 2023',
          technologies: 'Figma, Vuetify',
          link: '#'
        }
      ]
    }
  },

  computed: {
    filteredProjects() {
      if (this.selectedCategory === 'All') {
        return this.projects
      }
      return this.projects.filter(project => project.category === this.selectedCategory)
    }
  },

  methods: {
    openProject(project) {
      this.selectedProject = project
      this.dialog = true
    }
  }
})
</script>

<style lang="scss" scoped>
.portfolio-page {
  .hero {
    background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);
  }

  .portfolio-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);

      .portfolio-overlay {
        opacity: 1;
      }
    }

    .portfolio-overlay {
      opacity: 0;
      transition: opacity 0.3s ease;
      background: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>