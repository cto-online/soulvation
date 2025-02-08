<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Simple Banner -->
      <v-col cols="12" class="mb-4">
        <v-card class="banner banner--simple">
          <v-card-text class="pa-6">
            <v-row align="center">
              <v-col cols="12" md="8">
                <h2 class="text-h4 font-weight-bold mb-2">Welcome to Dashboard</h2>
                <p class="text-body-1 mb-0">
                  Get started with our new admin dashboard template
                </p>
              </v-col>
              <v-col cols="12" md="4" class="text-center text-md-right">
                <v-btn color="primary" size="large">
                  Get Started
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Gradient Banner -->
      <v-col cols="12" class="mb-4">
        <v-card class="banner banner--gradient">
          <v-card-text class="pa-6">
            <v-row align="center">
              <v-col cols="12" md="6">
                <h2 class="text-h4 font-weight-bold text-white mb-2">
                  Upgrade to Pro
                </h2>
                <p class="text-body-1 text-white mb-0">
                  Get access to all premium features and priority support
                </p>
              </v-col>
              <v-col cols="12" md="6" class="text-center text-md-right">
                <v-btn
                  variant="outlined"
                  color="white"
                  size="large"
                  class="mr-4"
                >
                  Learn More
                </v-btn>
                <v-btn
                  color="secondary"
                  size="large"
                >
                  Upgrade Now
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Image Banner -->
      <v-col cols="12" class="mb-4">
        <v-card class="banner banner--image">
          <v-img
            src="@/assets/images/backgrounds/banner-bg.jpg"
            height="200"
            cover
          >
            <v-card-text class="fill-height d-flex align-center">
              <div class="banner-content">
                <h2 class="text-h4 font-weight-bold text-white mb-2">
                  New Features Available
                </h2>
                <p class="text-body-1 text-white mb-4">
                  Check out our latest updates and improvements
                </p>
                <v-btn
                  color="primary"
                  size="large"
                >
                  Explore Now
                </v-btn>
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </v-col>

      <!-- Alert Banners -->
      <v-col cols="12" md="6" class="mb-4">
        <v-alert
          color="success"
          icon="mdi-check-circle"
          title="Success Banner"
          text="Your changes have been successfully saved."
          class="mb-4"
        ></v-alert>

        <v-alert
          color="warning"
          icon="mdi-alert"
          title="Warning Banner"
          text="Your subscription will expire in 3 days."
          class="mb-4"
        ></v-alert>
      </v-col>

      <v-col cols="12" md="6" class="mb-4">
        <v-alert
          color="error"
          icon="mdi-alert-circle"
          title="Error Banner"
          text="There was an error processing your request."
          class="mb-4"
        ></v-alert>

        <v-alert
          color="info"
          icon="mdi-information"
          title="Info Banner"
          text="System maintenance scheduled for tomorrow."
          class="mb-4"
        ></v-alert>
      </v-col>

      <!-- Promotional Banner -->
      <v-col cols="12">
        <v-card class="banner banner--promo">
          <v-card-text class="pa-6">
            <v-row align="center">
              <v-col cols="12" md="2" class="text-center">
                <v-icon
                  color="primary"
                  size="64"
                >
                  mdi-gift
                </v-icon>
              </v-col>
              <v-col cols="12" md="7">
                <h2 class="text-h4 font-weight-bold mb-2">
                  Special Offer!
                </h2>
                <p class="text-body-1 mb-0">
                  Get 50% off on annual subscriptions. Limited time offer.
                </p>
              </v-col>
              <v-col cols="12" md="3" class="text-center text-md-right">
                <v-btn
                  color="primary"
                  size="large"
                >
                  Claim Offer
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Banners'
})
</script>

<style lang="scss" scoped>
.banner {
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  &--gradient {
    background: linear-gradient(135deg, var(--v-primary-base) 0%, var(--v-primary-darken2) 100%);
  }

  &--image {
    .banner-content {
      position: relative;
      z-index: 1;
      background: rgba(0, 0, 0, 0.5);
      padding: 2rem;
      border-radius: 8px;
    }
  }

  &--promo {
    border: 2px dashed var(--v-primary-base);
    background: var(--v-primary-lighten5);
  }
}
</style>