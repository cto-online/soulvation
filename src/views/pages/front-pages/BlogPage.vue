<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="hero py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">Our Blog</h1>
            <p class="text-body-1">
              Latest news, updates, and insights from our team
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Blog Content -->
    <section class="blog-content py-16">
      <v-container>
        <!-- Search and Filter -->
        <v-row class="mb-8">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search posts..."
              hide-details
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              label="Filter by category"
              hide-details
              variant="outlined"
              density="comfortable"
            ></v-select>
          </v-col>
        </v-row>

        <!-- Featured Post -->
        <v-row class="mb-12" v-if="featuredPost">
          <v-col cols="12">
            <v-card class="featured-post">
              <v-row>
                <v-col cols="12" md="6">
                  <v-img
                    :src="featuredPost.image"
                    height="400"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center">
                  <div class="pa-6">
                    <div class="d-flex align-center mb-4">
                      <v-chip color="primary" size="small">{{ featuredPost.category }}</v-chip>
                      <span class="text-caption ml-4">{{ featuredPost.date }}</span>
                    </div>
                    <h2 class="text-h3 font-weight-bold mb-4">
                      {{ featuredPost.title }}
                    </h2>
                    <p class="text-body-1 mb-6">
                      {{ featuredPost.excerpt }}
                    </p>
                    <v-btn color="primary" size="large">
                      Read More
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Blog Posts Grid -->
        <v-row>
          <v-col
            v-for="post in filteredPosts"
            :key="post.id"
            cols="12"
            md="4"
          >
            <v-card class="blog-card h-100">
              <v-img
                :src="post.image"
                height="200"
                cover
              ></v-img>
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-chip color="primary" size="small">{{ post.category }}</v-chip>
                  <span class="text-caption ml-4">{{ post.date }}</span>
                </div>
                <h3 class="text-h5 font-weight-bold mb-2">
                  {{ post.title }}
                </h3>
                <p class="text-body-2 mb-4">
                  {{ post.excerpt }}
                </p>
                <div class="d-flex align-center">
                  <v-avatar size="40" class="mr-4">
                    <v-img :src="post.author.avatar"></v-img>
                  </v-avatar>
                  <div>
                    <div class="text-subtitle-2 font-weight-medium">
                      {{ post.author.name }}
                    </div>
                    <div class="text-caption">
                      {{ post.author.role }}
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Pagination -->
        <v-row class="mt-12">
          <v-col cols="12" class="text-center">
            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="7"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter py-16 bg-surface">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" class="text-center">
            <h2 class="text-h4 font-weight-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p class="text-body-1 mb-6">
              Get the latest posts and updates directly in your inbox
            </p>
            <v-form @submit.prevent="subscribe">
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="email"
                    label="Email address"
                    type="email"
                    variant="outlined"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    type="submit"
                  >
                    Subscribe
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogPage',

  data() {
    return {
      search: '',
      selectedCategory: 'All',
      page: 1,
      email: '',
      categories: ['All', 'Technology', 'Design', 'Development', 'Business'],
      featuredPost: {
        id: 1,
        title: 'The Future of Web Development',
        category: 'Technology',
        date: 'Feb 8, 2024',
        excerpt: 'Explore the latest trends and technologies shaping the future of web development.',
        image: '@/assets/images/blog/featured.jpg',
        author: {
          name: 'John Smith',
          role: 'Tech Lead',
          avatar: '@/assets/images/avatars/1.jpg'
        }
      },
      posts: [
        {
          id: 2,
          title: 'Design Systems in 2024',
          category: 'Design',
          date: 'Feb 7, 2024',
          excerpt: 'Learn how design systems are evolving and why they matter more than ever.',
          image: '@/assets/images/blog/post1.jpg',
          author: {
            name: 'Sarah Johnson',
            role: 'UI/UX Designer',
            avatar: '@/assets/images/avatars/2.jpg'
          }
        },
        {
          id: 3,
          title: 'Building Scalable Applications',
          category: 'Development',
          date: 'Feb 6, 2024',
          excerpt: 'Best practices for building applications that can grow with your business.',
          image: '@/assets/images/blog/post2.jpg',
          author: {
            name: 'Michael Brown',
            role: 'Senior Developer',
            avatar: '@/assets/images/avatars/3.jpg'
          }
        },
        {
          id: 4,
          title: 'The Rise of AI in Business',
          category: 'Business',
          date: 'Feb 5, 2024',
          excerpt: 'How artificial intelligence is transforming modern business operations.',
          image: '@/assets/images/blog/post3.jpg',
          author: {
            name: 'Emily Davis',
            role: 'Business Analyst',
            avatar: '@/assets/images/avatars/4.jpg'
          }
        }
      ]
    }
  },

  computed: {
    filteredPosts() {
      let filtered = this.posts
      
      if (this.search) {
        const searchLower = this.search.toLowerCase()
        filtered = filtered.filter(post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower)
        )
      }

      if (this.selectedCategory !== 'All') {
        filtered = filtered.filter(post => post.category === this.selectedCategory)
      }

      return filtered
    },

    totalPages() {
      return Math.ceil(this.filteredPosts.length / 6)
    }
  },

  methods: {
    subscribe() {
      // Implement newsletter subscription logic
      console.log('Subscribe:', this.email)
    }
  }
})
</script>

<style lang="scss" scoped>
.blog-page {
  .hero {
    background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);
  }

  .featured-post {
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }
  }

  .blog-card {
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }
  }

  .newsletter {
    background: linear-gradient(135deg, var(--v-surface-variant) 0%, var(--v-background) 100%);
  }
}
</style>