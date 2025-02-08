ç<template>
  <div class="faq-page">
    <v-container class="py-16">
      <!-- Header -->
      <v-row justify="center" class="mb-16">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="text-h2 font-weight-bold mb-4">Frequently Asked Questions</h1>
          <p class="text-body-1">
            Find answers to common questions about our platform and services.
          </p>

          <!-- Search -->
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search questions..."
            class="mt-8"
            hide-details
            variant="outlined"
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- FAQ Categories -->
      <v-row justify="center" class="mb-8">
        <v-col cols="12" md="8">
          <v-chip-group
            v-model="selectedCategory"
            selected-class="primary"
          >
            <v-chip
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
              filter
            >
              <v-icon start>{{ category.icon }}</v-icon>
              {{ category.label }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- FAQ Content -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(faq, index) in filteredFaqs"
              :key="index"
              class="mb-2"
            >
              <v-expansion-panel-title>
                {{ faq.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div v-html="faq.answer"></div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <!-- Still Have Questions -->
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="8">
          <v-card class="text-center pa-8">
            <h2 class="text-h4 font-weight-bold mb-4">Still Have Questions?</h2>
            <p class="text-body-1 mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <v-btn
              color="primary"
              size="large"
              prepend-icon="mdi-message"
              to="/contact"
            >
              Get in Touch
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Faq',

  data() {
    return {
      search: '',
      selectedCategory: 'all',
      categories: [
        { label: 'All', value: 'all', icon: 'mdi-view-grid' },
        { label: 'Getting Started', value: 'getting-started', icon: 'mdi-rocket-launch' },
        { label: 'Pricing', value: 'pricing', icon: 'mdi-currency-usd' },
        { label: 'Account', value: 'account', icon: 'mdi-account' },
        { label: 'Security', value: 'security', icon: 'mdi-shield-check' }
      ],
      faqs: [
        {
          category: 'getting-started',
          question: 'How do I get started with the platform?',
          answer: 'Getting started is easy! Simply sign up for an account, choose your plan, and follow our quick setup guide. Our onboarding process will walk you through all the essential features.'
        },
        {
          category: 'getting-started',
          question: 'What are the system requirements?',
          answer: 'Our platform is cloud-based and works in any modern web browser. We recommend using the latest version of Chrome, Firefox, Safari, or Edge for the best experience.'
        },
        {
          category: 'pricing',
          question: 'Can I change my plan later?',
          answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
        },
        {
          category: 'pricing',
          question: 'Do you offer refunds?',
          answer: "We offer a 30-day money-back guarantee for all our plans. If you're not satisfied, contact our support team within 30 days of purchase."
        },
        {
          category: 'account',
          question: 'How do I reset my password?',
          answer: 'Click the "Forgot Password" link on the login page, enter your email address, and follow the instructions sent to your inbox.'
        },
        {
          category: 'account',
          question: 'Can I have multiple users on one account?',
          answer: 'Yes! Depending on your plan, you can add multiple team members to your account with different roles and permissions.'
        },
        {
          category: 'security',
          question: 'How secure is my data?',
          answer: 'We use industry-standard encryption and security measures to protect your data. All data is encrypted in transit and at rest.'
        },
        {
          category: 'security',
          question: 'Do you offer two-factor authentication?',
          answer: 'Yes, we strongly recommend enabling two-factor authentication (2FA) for additional account security. You can set this up in your account settings.'
        }
      ]
    }
  },

  computed: {
    filteredFaqs() {
      return this.faqs.filter(faq => {
        const matchesCategory = this.selectedCategory === 'all' || faq.category === this.selectedCategory
        const matchesSearch = !this.search || 
          faq.question.toLowerCase().includes(this.search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(this.search.toLowerCase())
        return matchesCategory && matchesSearch
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.faq-page {
  .v-expansion-panel {
    &:hover {
      background: var(--v-surface-variant);
    }
  }

  .v-expansion-panel-title {
    font-weight: 500;
  }
}
</style>