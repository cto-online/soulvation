<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">About Us</h1>
            <p class="text-body-1">
              We're on a mission to transform how businesses manage their data and make decisions.
              Our platform combines powerful analytics with intuitive design to help organizations thrive.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Our Story -->
    <section class="our-story py-16">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <h2 class="text-h3 font-weight-bold mb-4">Our Story</h2>
            <p class="text-body-1 mb-4">
              Founded in 2020, we started with a simple idea: make data analytics accessible to everyone.
              What began as a small team of passionate developers has grown into a global platform
              serving thousands of businesses worldwide.
            </p>
            <p class="text-body-1">
              Today, we're proud to help organizations of all sizes harness the power of their data
              to make better decisions and drive growth.
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              src="@/assets/images/front-pages/about-story.jpg"
              class="rounded-lg"
              height="400"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Our Values -->
    <section class="our-values py-16 bg-surface">
      <v-container>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">Our Values</h2>
            <p class="text-body-1">
              The principles that guide everything we do
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="value in values" :key="value.title" cols="12" md="4">
            <v-card class="value-card h-100">
              <v-card-text class="text-center">
                <v-icon :color="value.color" size="48" class="mb-4">
                  {{ value.icon }}
                </v-icon>
                <h3 class="text-h5 font-weight-bold mb-2">
                  {{ value.title }}
                </h3>
                <p class="text-body-2">
                  {{ value.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Team Section -->
    <section class="team py-16">
      <v-container>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">Our Team</h2>
            <p class="text-body-1">
              Meet the people behind our success
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="member in team" :key="member.name" cols="12" sm="6" md="3">
            <v-card class="team-card">
              <v-img
                :src="member.avatar"
                height="300"
                cover
              ></v-img>
              <v-card-text class="text-center">
                <h3 class="text-h6 font-weight-bold mb-1">
                  {{ member.name }}
                </h3>
                <p class="text-caption mb-2">{{ member.position }}</p>
                <div class="d-flex justify-center gap-2">
                  <v-btn
                    v-for="social in member.socials"
                    :key="social.icon"
                    :href="social.link"
                    icon
                    variant="text"
                    size="small"
                  >
                    <v-icon>{{ social.icon }}</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Aboutpage',
  
  data() {
    return {
      values: [
        {
          icon: 'mdi-lightbulb',
          color: 'warning',
          title: 'Innovation',
          description: 'We constantly push boundaries to deliver cutting-edge solutions.'
        },
        {
          icon: 'mdi-account-group',
          color: 'primary',
          title: 'Collaboration',
          description: 'We believe in the power of teamwork and shared success.'
        },
        {
          icon: 'mdi-shield-check',
          color: 'success',
          title: 'Integrity',
          description: 'We maintain the highest standards of trust and transparency.'
        }
      ],
      team: [
        {
          name: 'Alex Thompson',
          position: 'CEO & Founder',
          avatar: '@/assets/images/team/1.jpg',
          socials: [
            { icon: 'mdi-linkedin', link: '#' },
            { icon: 'mdi-twitter', link: '#' }
          ]
        },
        {
          name: 'Sarah Chen',
          position: 'CTO',
          avatar: '@/assets/images/team/2.jpg',
          socials: [
            { icon: 'mdi-linkedin', link: '#' },
            { icon: 'mdi-github', link: '#' }
          ]
        },
        {
          name: 'Michael Rodriguez',
          position: 'Head of Design',
          avatar: '@/assets/images/team/3.jpg',
          socials: [
            { icon: 'mdi-linkedin', link: '#' },
            { icon: 'mdi-dribbble', link: '#' }
          ]
        },
        {
          name: 'Emily Parker',
          position: 'Product Manager',
          avatar: '@/assets/images/team/4.jpg',
          socials: [
            { icon: 'mdi-linkedin', link: '#' },
            { icon: 'mdi-twitter', link: '#' }
          ]
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.about-page {
  .hero {
    background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);
  }

  .value-card, .team-card {
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }
  }

  .team-card {
    .v-img {
      transition: transform 0.3s ease;
    }

    &:hover {
      .v-img {
        transform: scale(1.05);
      }
    }
  }
}
</style>