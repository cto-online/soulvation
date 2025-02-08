<template>
  <div class="package-pricing">
    <v-container class="py-16">
      <!-- Header -->
      <v-row justify="center" class="mb-16">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h2 font-weight-bold mb-4">Choose Your Plan</h1>
          <p class="text-body-1">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>

          <!-- Billing Toggle -->
          <div class="d-flex align-center justify-center mt-6">
            <span :class="{ 'text-primary': !isAnnual }">Monthly</span>
            <v-switch
              v-model="isAnnual"
              class="mx-4"
              color="primary"
              hide-details
            ></v-switch>
            <span :class="{ 'text-primary': isAnnual }">
              Annual
              <v-chip
                color="primary"
                size="small"
                class="ml-2"
              >
                Save 20%
              </v-chip>
            </span>
          </div>
        </v-col>
      </v-row>

      <!-- Pricing Cards -->
      <v-row>
        <v-col
          v-for="plan in plans"
          :key="plan.name"
          cols="12"
          md="4"
        >
          <v-card
            :class="[
              'pricing-card h-100',
              { 'pricing-card--popular': plan.isPopular }
            ]"
            :elevation="plan.isPopular ? 10 : 2"
          >
            <v-card-text class="text-center pa-8">
              <!-- Popular Badge -->
              <v-chip
                v-if="plan.isPopular"
                color="primary"
                class="popular-badge mb-4"
              >
                Most Popular
              </v-chip>

              <div class="plan-icon mb-6">
                <v-icon
                  :color="plan.iconColor"
                  size="64"
                >
                  {{ plan.icon }}
                </v-icon>
              </div>

              <h2 class="text-h4 font-weight-bold mb-2">{{ plan.name }}</h2>
              <p class="text-body-2 mb-6">{{ plan.description }}</p>

              <div class="pricing mb-6">
                <span class="text-h3 font-weight-bold">
                  ${{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}
                </span>
                <span class="text-body-1">/month</span>
              </div>

              <v-btn
                block
                :color="plan.isPopular ? 'primary' : undefined"
                :variant="plan.isPopular ? 'flat' : 'outlined'"
                size="large"
                class="mb-8"
              >
                Get Started
              </v-btn>

              <v-divider class="mb-6"></v-divider>

              <div class="features text-left">
                <div
                  v-for="(feature, index) in plan.features"
                  :key="index"
                  class="d-flex align-center mb-4"
                >
                  <v-icon
                    :color="feature.included ? 'success' : 'error'"
                    size="20"
                    class="mr-2"
                  >
                    {{ feature.included ? 'mdi-check-circle' : 'mdi-close-circle' }}
                  </v-icon>
                  <span :class="{ 'text-disabled': !feature.included }">
                    {{ feature.text }}
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Enterprise Section -->
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="8">
          <v-card class="enterprise-card">
            <v-card-text class="pa-8">
              <v-row align="center">
                <v-col cols="12" md="8">
                  <h3 class="text-h4 font-weight-bold mb-2">Enterprise Plan</h3>
                  <p class="text-body-1 mb-4">
                    Need a custom solution? Let's create a plan that works for your business.
                  </p>
                  <div class="d-flex align-center">
                    <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
                    <span>Custom features</span>
                    <v-icon color="primary" class="mx-4">mdi-circle-small</v-icon>
                    <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
                    <span>Dedicated support</span>
                    <v-icon color="primary" class="mx-4">mdi-circle-small</v-icon>
                    <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
                    <span>Custom integrations</span>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="text-center text-md-right">
                  <v-btn
                    color="primary"
                    size="large"
                    variant="outlined"
                  >
                    Contact Sales
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PackagePricing',

  data() {
    return {
      isAnnual: false,
      plans: [
        {
          name: 'Basic',
          description: 'Perfect for small teams',
          icon: 'mdi-rocket-launch-outline',
          iconColor: 'primary',
          monthlyPrice: 29,
          annualPrice: 23,
          features: [
            { text: '5 Team Members', included: true },
            { text: '10GB Storage', included: true },
            { text: 'Basic Analytics', included: true },
            { text: 'Email Support', included: true },
            { text: 'API Access', included: false },
            { text: 'Custom Integrations', included: false }
          ]
        },
        {
          name: 'Pro',
          description: 'For growing businesses',
          icon: 'mdi-trophy-outline',
          iconColor: 'success',
          monthlyPrice: 79,
          annualPrice: 63,
          isPopular: true,
          features: [
            { text: '20 Team Members', included: true },
            { text: '50GB Storage', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Priority Support', included: true },
            { text: 'API Access', included: true },
            { text: 'Custom Integrations', included: false }
          ]
        },
        {
          name: 'Business',
          description: 'For large organizations',
          icon: 'mdi-diamond-outline',
          iconColor: 'info',
          monthlyPrice: 199,
          annualPrice: 159,
          features: [
            { text: 'Unlimited Members', included: true },
            { text: 'Unlimited Storage', included: true },
            { text: 'Custom Analytics', included: true },
            { text: '24/7 Support', included: true },
            { text: 'API Access', included: true },
            { text: 'Custom Integrations', included: true }
          ]
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.package-pricing {
  .pricing-card {
    position: relative;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }

    &--popular {
      border: 2px solid var(--v-primary-base);
    }
  }

  .popular-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }

  .enterprise-card {
    background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-surface-variant) 100%);
  }
}
</style>