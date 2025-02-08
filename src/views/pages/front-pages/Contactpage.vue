<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h2 font-weight-bold mb-4">Contact Us</h1>
            <p class="text-body-1">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-form py-16">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="pa-6">
              <h2 class="text-h4 mb-6">Send us a Message</h2>
              <v-form @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.firstName"
                      label="First Name"
                      required
                      :rules="[v => !!v || 'First name is required']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.lastName"
                      label="Last Name"
                      required
                      :rules="[v => !!v || 'Last name is required']"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      type="email"
                      required
                      :rules="[
                        v => !!v || 'Email is required',
                        v => /.+@.+\..+/.test(v) || 'Email must be valid'
                      ]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="form.subject"
                      :items="subjects"
                      label="Subject"
                      required
                    ></v-select>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="form.message"
                      label="Message"
                      required
                      rows="4"
                      :rules="[v => !!v || 'Message is required']"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <v-btn
                      color="primary"
                      size="large"
                      block
                      type="submit"
                      :loading="loading"
                    >
                      Send Message
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <div class="contact-info">
              <h2 class="text-h4 mb-6">Get in Touch</h2>

              <div class="contact-methods">
                <div v-for="(method, index) in contactMethods" :key="index" class="mb-8">
                  <div class="d-flex align-center mb-4">
                    <v-icon :color="method.color" size="32" class="mr-4">
                      {{ method.icon }}
                    </v-icon>
                    <div>
                      <h3 class="text-h6">{{ method.title }}</h3>
                      <p class="text-body-1">{{ method.value }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <v-divider class="my-6"></v-divider>

              <h3 class="text-h5 mb-4">Follow Us</h3>
              <div class="social-links d-flex gap-4">
                <v-btn
                  v-for="social in socialLinks"
                  :key="social.icon"
                  :href="social.link"
                  icon
                  variant="outlined"
                  :color="social.color"
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <div class="map-placeholder" style="height: 400px;">
                <!-- Map component would go here -->
                <div class="d-flex align-center justify-center h-100">
                  Map Component Placeholder
                </div>
              </div>
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
  name: 'Contactpage',

  data() {
    return {
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      },
      subjects: [
        'General Inquiry',
        'Technical Support',
        'Sales',
        'Partnership',
        'Other'
      ],
      contactMethods: [
        {
          icon: 'mdi-map-marker',
          title: 'Visit Us',
          value: '123 Business Street, Suite 100, San Francisco, CA 94111',
          color: 'primary'
        },
        {
          icon: 'mdi-phone',
          title: 'Call Us',
          value: '+1 (555) 123-4567',
          color: 'success'
        },
        {
          icon: 'mdi-email',
          title: 'Email Us',
          value: 'support@example.com',
          color: 'info'
        }
      ],
      socialLinks: [
        { icon: 'mdi-facebook', link: '#', color: 'blue' },
        { icon: 'mdi-twitter', link: '#', color: 'light-blue' },
        { icon: 'mdi-linkedin', link: '#', color: 'blue-darken-1' },
        { icon: 'mdi-instagram', link: '#', color: 'deep-purple' }
      ]
    }
  },

  methods: {
    async submitForm() {
      this.loading = true
      try {
        // Implement form submission logic here
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Form submitted:', this.form)
        // Show success message
      } catch (error) {
        console.error('Error submitting form:', error)
        // Show error message
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.contact-page {
  .hero {
    background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);
  }

  .contact-info {
    height: 100%;
    padding: 2rem;
    background: var(--v-surface-variant);
    border-radius: 8px;
  }

  .map-placeholder {
    background: var(--v-background);
    border: 1px dashed var(--v-border-color);
    border-radius: 8px;
  }
}
</style>