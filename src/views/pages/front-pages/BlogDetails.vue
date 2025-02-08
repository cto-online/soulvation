<template>
  <div class="blog-details">
    <!-- Hero Section -->
    <section class="hero">
      <v-img
        :src="post.coverImage"
        height="500"
        class="hero-image"
      >
        <div class="hero-overlay">
          <v-container class="fill-height">
            <v-row align="end">
              <v-col cols="12" md="8" class="pb-16">
                <div class="d-flex align-center mb-4">
                  <v-chip color="primary" size="small">{{ post.category }}</v-chip>
                  <span class="text-caption ml-4 text-white">{{ post.date }}</span>
                </div>
                <h1 class="text-h2 font-weight-bold text-white mb-4">
                  {{ post.title }}
                </h1>
                <div class="d-flex align-center">
                  <v-avatar size="48" class="mr-4">
                    <v-img :src="post.author.avatar"></v-img>
                  </v-avatar>
                  <div class="text-white">
                    <div class="text-h6 font-weight-medium">
                      {{ post.author.name }}
                    </div>
                    <div class="text-caption">
                      {{ post.author.role }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-img>
    </section>

    <!-- Content Section -->
    <section class="content py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <!-- Article Content -->
            <article class="blog-content mb-12">
              <p class="text-body-1 mb-6">
                {{ post.introduction }}
              </p>

              <h2 class="text-h4 font-weight-bold mb-4">{{ post.sections[0].title }}</h2>
              <p class="text-body-1 mb-6">
                {{ post.sections[0].content }}
              </p>

              <v-img
                :src="post.sections[0].image"
                height="400"
                class="rounded-lg mb-6"
              ></v-img>

              <h2 class="text-h4 font-weight-bold mb-4">{{ post.sections[1].title }}</h2>
              <p class="text-body-1 mb-6">
                {{ post.sections[1].content }}
              </p>

              <!-- Quote -->
              <blockquote class="blockquote my-8 pa-6">
                <p class="text-h5 font-weight-medium font-italic mb-4">
                  {{ post.quote.text }}
                </p>
                <footer class="text-body-2">
                  — {{ post.quote.author }}, <cite>{{ post.quote.source }}</cite>
                </footer>
              </blockquote>

              <h2 class="text-h4 font-weight-bold mb-4">{{ post.sections[2].title }}</h2>
              <p class="text-body-1 mb-6">
                {{ post.sections[2].content }}
              </p>
            </article>

            <!-- Tags -->
            <div class="tags mb-12">
              <v-chip
                v-for="tag in post.tags"
                :key="tag"
                class="mr-2 mb-2"
                variant="outlined"
              >
                {{ tag }}
              </v-chip>
            </div>

            <!-- Share -->
            <v-divider class="mb-8"></v-divider>
            <div class="share mb-12">
              <h3 class="text-h6 mb-4">Share this post</h3>
              <div class="d-flex gap-2">
                <v-btn
                  v-for="social in shareLinks"
                  :key="social.icon"
                  :color="social.color"
                  icon
                  variant="flat"
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </div>
            </div>

            <!-- Author Bio -->
            <v-card class="author-bio mb-12">
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-avatar size="80" class="mr-6">
                    <v-img :src="post.author.avatar"></v-img>
                  </v-avatar>
                  <div>
                    <h3 class="text-h5 font-weight-bold mb-1">
                      {{ post.author.name }}
                    </h3>
                    <p class="text-body-2">{{ post.author.bio }}</p>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <v-btn
                    v-for="social in post.author.socials"
                    :key="social.icon"
                    :href="social.link"
                    icon
                    variant="text"
                    target="_blank"
                  >
                    <v-icon>{{ social.icon }}</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>

            <!-- Comments -->
            <div class="comments">
              <h3 class="text-h5 font-weight-bold mb-6">Comments ({{ comments.length }})</h3>
              <div class="comment-list">
                <v-card
                  v-for="comment in comments"
                  :key="comment.id"
                  class="mb-4"
                  variant="outlined"
                >
                  <v-card-text class="pa-4">
                    <div class="d-flex">
                      <v-avatar size="40" class="mr-4">
                        <v-img :src="comment.avatar"></v-img>
                      </v-avatar>
                      <div class="flex-grow-1">
                        <div class="d-flex justify-space-between align-center mb-2">
                          <h4 class="text-subtitle-1 font-weight-bold">
                            {{ comment.name }}
                          </h4>
                          <span class="text-caption">{{ comment.date }}</span>
                        </div>
                        <p class="text-body-2">{{ comment.content }}</p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>

              <!-- Comment Form -->
              <v-card class="mt-6">
                <v-card-text class="pa-6">
                  <h4 class="text-h6 mb-4">Leave a Comment</h4>
                  <v-form @submit.prevent="submitComment">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="commentForm.name"
                          label="Name"
                          required
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="commentForm.email"
                          label="Email"
                          type="email"
                          required
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="commentForm.content"
                          label="Comment"
                          required
                          variant="outlined"
                          rows="4"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-btn
                          color="primary"
                          size="large"
                          type="submit"
                          :loading="commentForm.loading"
                        >
                          Post Comment
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlogDetails',

  data() {
    return {
      post: {
        title: 'The Future of Web Development: Trends to Watch in 2024',
        category: 'Technology',
        date: 'Feb 8, 2024',
        coverImage: '@/assets/images/blog/post-cover.jpg',
        introduction: 'The web development landscape is constantly evolving, bringing new technologies and methodologies that shape how we build digital experiences.',
        sections: [
          {
            title: 'The Rise of AI-Powered Development',
            content: 'Artificial Intelligence is revolutionizing how we approach web development, from automated testing to intelligent code completion.',
            image: '@/assets/images/blog/section1.jpg'
          },
          {
            title: 'Web Performance Optimization',
            content: 'As web applications become more complex, optimizing performance becomes increasingly critical for user experience and SEO.'
          },
          {
            title: 'The Future of Frontend Frameworks',
            content: 'Modern frontend frameworks continue to evolve, with a focus on better developer experience and improved performance.'
          }
        ],
        quote: {
          text: 'The future of web development lies in creating seamless, performant experiences that adapt to users' needs.',
          author: 'John Smith',
          source: 'Web Development Summit 2024'
        },
        tags: ['Web Development', 'Technology', 'AI', 'Performance', 'Frontend'],
        author: {
          name: 'Sarah Johnson',
          role: 'Senior Developer',
          avatar: '@/assets/images/avatars/2.jpg',
          bio: 'Sarah is a senior developer with over 10 years of experience in web development and a passion for emerging technologies.',
          socials: [
            { icon: 'mdi-twitter', link: '#' },
            { icon: 'mdi-linkedin', link: '#' },
            { icon: 'mdi-github', link: '#' }
          ]
        }
      },
      shareLinks: [
        { icon: 'mdi-facebook', color: 'blue' },
        { icon: 'mdi-twitter', color: 'light-blue' },
        { icon: 'mdi-linkedin', color: 'blue-darken-1' },
        { icon: 'mdi-email', color: 'red' }
      ],
      comments: [
        {
          id: 1,
          name: 'Michael Brown',
          date: '2 hours ago',
          avatar: '@/assets/images/avatars/3.jpg',
          content: 'Great insights on the future of web development! The AI integration possibilities are particularly exciting.'
        },
        {
          id: 2,
          name: 'Emily Davis',
          date: '5 hours ago',
          avatar: '@/assets/images/avatars/4.jpg',
          content: 'The section about web performance optimization really resonated with me. It's becoming increasingly important in modern web development.'
        }
      ],
      commentForm: {
        name: '',
        email: '',
        content: '',
        loading: false
      }
    }
  },

  methods: {
    async submitComment() {
      this.commentForm.loading = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add comment to list (in real app, this would be handled by backend)
      this.comments.unshift({
        id: this.comments.length + 1,
        name: this.commentForm.name,
        date: 'Just now',
        avatar: '@/assets/images/avatars/default.jpg',
        content: this.commentForm.content
      })

      // Reset form
      this.commentForm.name = ''
      this.commentForm.email = ''
      this.commentForm.content = ''
      this.commentForm.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.blog-details {
  .hero {
    position: relative;

    .hero-overlay {
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .blog-content {
    font-size: 1.125rem;
    line-height: 1.8;

    h2 {
      margin-top: 2rem;
    }
  }

  .blockquote {
    border-left: 4px solid var(--v-primary-base);
    background: var(--v-surface-variant);
  }

  .author-bio {
    background: var(--v-surface-variant);
  }
}
</style>