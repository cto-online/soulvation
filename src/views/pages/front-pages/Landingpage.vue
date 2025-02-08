<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <v-container>
        <v-row align="center" class="min-vh-100">
          <v-col cols="12" md="6">
            <h1 class="text-h2 font-weight-bold mb-4">
              Transform Your Business with Our Solutions
            </h1>
            <p class="text-body-1 mb-6">
              Empower your organization with our cutting-edge dashboard and analytics platform. 
              Make data-driven decisions and stay ahead of the competition.
            </p>
            <div class="d-flex gap-4">
              <v-btn size="x-large" color="primary">
                Get Started
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn size="x-large" variant="outlined">
                Learn More
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-img
              src="@/assets/images/front-pages/hero-image.png"
              max-width="500"
              class="hero-image"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Features Section -->
    <section class="features py-16">
      <v-container>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">
              Powerful Features
            </h2>
            <p class="text-body-1">
              Everything you need to manage and grow your business efficiently
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
            <v-card class="feature-card h-100">
              <v-card-text>
                <v-icon :color="feature.color" size="48" class="mb-4">
                  {{ feature.icon }}
                </v-icon>
                <h3 class="text-h5 font-weight-bold mb-2">
                  {{ feature.title }}
                </h3>
                <p class="text-body-2">
                  {{ feature.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials py-16 bg-surface">
      <v-container>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">
              What Our Clients Say
            </h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="testimonial in testimonials" :key="testimonial.name" cols="12" md="4">
            <v-card class="testimonial-card h-100">
              <v-card-text>
                <div class="d-flex align-center mb-4">
                  <v-avatar size="48" class="mr-4">
                    <v-img :src="testimonial.avatar"></v-img>
                  </v-avatar>
                  <div>
                    <div class="text-h6">{{ testimonial.name }}</div>
                    <div class="text-caption">{{ testimonial.position }}</div>
                  </div>
                </div>
                <p class="text-body-2">
                  "{{ testimonial.quote }}"
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">
              Ready to Get Started?
            </h2>
            <p class="text-body-1 mb-6">
              Join thousands of satisfied customers who trust our platform
            </p>
            <v-btn size="x-large" color="primary" class="px-8">
              Start Free Trial
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Landingpage',
  
  data() {
    return {
      features: [
        {
          icon: 'mdi-chart-bar',
          color: 'primary',
          title: 'Advanced Analytics',
          description: 'Get deep insights into your business performance with our powerful analytics tools.'
        },
        {
          icon: 'mdi-security',
          color: 'success',
          title: 'Enterprise Security',
          description: 'Your data is protected with enterprise-grade security and compliance measures.'
        },
        {
          icon: 'mdi-account-group',
          color: 'info',
          title: 'Team Collaboration',
          description: 'Work seamlessly with your team using our collaborative features and tools.'
        }
      ],
      testimonials: [
        {
          name: 'John Smith',
          position: 'CEO at TechCorp',
          avatar: '@/assets/images/avatars/1.jpg',
          quote: 'This platform has transformed how we handle our business analytics. Highly recommended!'
        },
        {
          name: 'Sarah Johnson',
          position: 'CTO at InnovateCo',
          avatar: '@/assets/images/avatars/2.jpg',
          quote: 'The security features and ease of use make this platform stand out from the competition.'
        },
        {
          name: 'Michael Brown',
          position: 'Director at DataFlow',
          avatar: '@/assets/images/avatars/3.jpg',
          quote: 'Outstanding support team and regular updates keep our business running smoothly.'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.landing-page {
  .hero {
    background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .hero-image {
    animation: float 6s ease-in-out infinite;
  }

  .feature-card, .testimonial-card {
    height: 100%;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }
  }

  .cta {
    background: var(--v-primary-lighten5);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

.min-vh-100 {
  min-height: 100vh;
}
</style>