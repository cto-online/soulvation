<template>
  <div class="pricing-page">
    <v-container class="py-16">
      <!-- Header -->
      <v-row justify="center" class="mb-16">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h2 font-weight-bold mb-4">Simple, Transparent Pricing</h1>
          <p class="text-body-1">
            Choose the plan that's right for your business
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

              <div class="features">
                <div
                  v-for="(feature, index) in plan.features"
                  :key="index"
                  class="d-flex align-center mb-4"
                >
                  <v-icon
                    :color="plan.isPopular ? 'primary' : undefined"
                    class="mr-2"
                  >
                    mdi-check-circle
                  </v-icon>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- FAQ Section -->
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="8">
          <h2 class="text-h3 font-weight-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(faq, index) in faqs"
              :key="index"
            >
              <v-expansion-panel-title>
                {{ faq.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                {{ faq.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pricing',
  
  data() {
    return {
      isAnnual: false,
      plans: [
        {
          name: 'Starter',
          description: 'Perfect for small teams and startups',
          monthlyPrice: 29,
          annualPrice: 23,
          features: [
            'Up to 5 team members',
            '5GB storage',
            'Basic analytics',
            'Email support'
          ]
        },
        {
          name: 'Professional',
          description: 'For growing businesses',
          monthlyPrice: 79,
          annualPrice: 63,
          isPopular: true,
          features: [
            'Up to 20 team members',
            '50GB storage',
            'Advanced analytics',
            'Priority support',
            'Custom integrations'
          ]
        },
        {
          name: 'Enterprise',
          description: 'For large organizations',
          monthlyPrice: 199,
          annualPrice: 159,
          features: [
            'Unlimited team members',
            'Unlimited storage',
            'Custom analytics',
            '24/7 support',
            'Custom integrations',
            'Dedicated account manager'
          ]
        }
      ],
      faqs: [
        {
          question: 'Can I change my plan later?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers.'
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes, we offer a 14-day free trial on all plans. No credit card required.'
        },
        {
          question: 'What happens after my trial ends?',
          answer: 'After your trial ends, you can choose to subscribe to any of our plans or your account will be automatically downgraded to the free tier.'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.pricing-page {
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

  .pricing {
    .text-body-1 {
      color: rgba(var(--v-theme-on-surface), 0.6);
    }
  }

  .features {
    text-align: left;
  }
}
</style>