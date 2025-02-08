<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Footer -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Footer</v-card-title>
          <v-card-text>
            <v-footer
              class="bg-grey-lighten-1"
            >
              <v-row justify="center" no-gutters>
                <v-col
                  class="text-center mt-4"
                  cols="12"
                >
                  {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </v-col>
              </v-row>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Footer with Links -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Footer with Links</v-card-title>
          <v-card-text>
            <v-footer
              class="bg-indigo-lighten-1 text-center d-flex flex-column"
            >
              <div>
                <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4"
                  :icon="icon"
                  variant="text"
                ></v-btn>
              </div>

              <div class="pt-4">
                <v-btn
                  v-for="link in links"
                  :key="link"
                  variant="text"
                  class="mx-2"
                  rounded="xl"
                >
                  {{ link }}
                </v-btn>
              </div>

              <v-divider></v-divider>

              <div class="px-4 py-2 text-center w-100">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
              </div>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Company Footer -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Company Footer</v-card-title>
          <v-card-text>
            <v-footer
              class="bg-grey-lighten-2"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <div class="text-h6 mb-4">About Us</div>
                  <p class="text-body-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                  </p>
                  <div class="mt-4">
                    <v-btn
                      v-for="icon in socialIcons"
                      :key="icon.icon"
                      :icon="icon.icon"
                      variant="text"
                      color="primary"
                      class="me-2"
                    ></v-btn>
                  </div>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <div class="text-h6 mb-4">Quick Links</div>
                  <v-list density="compact" bg-color="transparent">
                    <v-list-item
                      v-for="(link, index) in quickLinks"
                      :key="index"
                      :title="link.title"
                      :prepend-icon="link.icon"
                      class="px-0"
                    ></v-list-item>
                  </v-list>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <div class="text-h6 mb-4">Newsletter</div>
                  <p class="text-body-2 mb-4">
                    Subscribe to our newsletter for updates and news.
                  </p>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    append-inner-icon="mdi-send"
                    variant="outlined"
                    density="compact"
                    @click:append-inner="subscribe"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-divider class="my-4"></v-divider>
                  <div class="text-center text-body-2">
                    © {{ new Date().getFullYear() }} Company Name. All rights reserved.
                  </div>
                </v-col>
              </v-row>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- E-commerce Footer -->
      <v-col cols="12">
        <v-card>
          <v-card-title>E-commerce Footer</v-card-title>
          <v-card-text>
            <v-footer class="bg-grey-darken-4 text-white">
              <v-row>
                <v-col cols="12" md="3">
                  <div class="text-h6 mb-4">Shop</div>
                  <v-list density="compact" bg-color="transparent" class="text-white">
                    <v-list-item
                      v-for="(item, index) in shopLinks"
                      :key="index"
                      :title="item"
                      class="px-0 text-white"
                    ></v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" md="3">
                  <div class="text-h6 mb-4">Help</div>
                  <v-list density="compact" bg-color="transparent" class="text-white">
                    <v-list-item
                      v-for="(item, index) in helpLinks"
                      :key="index"
                      :title="item"
                      class="px-0 text-white"
                    ></v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" md="3">
                  <div class="text-h6 mb-4">Contact</div>
                  <v-list density="compact" bg-color="transparent" class="text-white">
                    <v-list-item
                      v-for="(contact, index) in contactInfo"
                      :key="index"
                      :title="contact.text"
                      :prepend-icon="contact.icon"
                      class="px-0 text-white"
                    ></v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" md="3">
                  <div class="text-h6 mb-4">Download Our App</div>
                  <div class="d-flex flex-column gap-2">
                    <v-btn
                      prepend-icon="mdi-apple"
                      variant="outlined"
                      color="white"
                    >
                      App Store
                    </v-btn>
                    <v-btn
                      prepend-icon="mdi-google-play"
                      variant="outlined"
                      color="white"
                    >
                      Google Play
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-divider color="grey"></v-divider>
                  <div class="pt-4 d-flex flex-wrap justify-space-between align-center">
                    <div class="text-body-2">
                      © {{ new Date().getFullYear() }} E-commerce Store. All rights reserved.
                    </div>
                    <div>
                      <v-btn
                        v-for="(method, index) in paymentMethods"
                        :key="index"
                        :icon="method"
                        variant="text"
                        color="white"
                        size="small"
                      ></v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiFooter',

  data() {
    return {
      email: '',
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      links: [
        'Home',
        'About Us',
        'Services',
        'Blog',
        'Contact',
      ],
      socialIcons: [
        { icon: 'mdi-facebook' },
        { icon: 'mdi-twitter' },
        { icon: 'mdi-linkedin' },
        { icon: 'mdi-instagram' },
      ],
      quickLinks: [
        { title: 'About Us', icon: 'mdi-information' },
        { title: 'Services', icon: 'mdi-cog' },
        { title: 'Blog', icon: 'mdi-post' },
        { title: 'Contact', icon: 'mdi-phone' },
      ],
      shopLinks: [
        'New Arrivals',
        'Best Sellers',
        'Sale',
        'Collections',
        'Gift Cards',
      ],
      helpLinks: [
        'FAQs',
        'Shipping Info',
        'Returns',
        'Size Guide',
        'Contact Us',
      ],
      contactInfo: [
        { text: 'info@example.com', icon: 'mdi-email' },
        { text: '+1 234 567 890', icon: 'mdi-phone' },
        { text: '123 Street, City, Country', icon: 'mdi-map-marker' },
      ],
      paymentMethods: [
        'mdi-credit-card',
        'mdi-paypal',
        'mdi-apple-pay',
        'mdi-google-pay',
      ],
    }
  },

  methods: {
    subscribe() {
      // Handle newsletter subscription
      console.log('Subscribing email:', this.email)
      this.email = ''
    },
  },
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

.v-footer {
  border-radius: 4px;
}
</style>