<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  userName?: string;
  budget?: number;
  expense?: number;
}

const props = withDefaults(defineProps<Props>(), {
  userName: 'David',
  budget: 98450,
  expense: 2440
})

const formattedBudget = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(props.budget)

const formattedExpense = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(props.expense)
</script>

<template>
  <v-card
    elevation="10"
    class="welcome-card"
    color="primary"
    :aria-label="`Welcome card for ${props.userName}`"
  >
    <v-card-item>
      <v-row no-gutters>
        <v-col cols="12" md="7">
          <!-- Welcome Header -->
          <div class="d-flex align-center gap-3">
            <v-avatar
              size="48"
              class="rounded-md bg-surface"
              aria-hidden="true"
            >
              <Icon
                icon="solar:course-up-outline"
                class="text-textPrimary opacity-80"
                :height="25"
              />
            </v-avatar>
            <h1 class="text-h4 text-surface font-weight-bold">
              Welcome Back {{ props.userName }}
            </h1>
          </div>

          <!-- Stats Section -->
          <div class="mt-8 mt-md-16">
            <v-row no-gutters class="stats-container">
              <!-- Budget Stats -->
              <v-col cols="5">
                <div class="pa-2">
                  <p class="text-surface text-body-1 opacity-80 mb-1">
                    Budget
                  </p>
                  <p class="text-h4 text-surface font-weight-bold">
                    {{ formattedBudget }}
                  </p>
                </div>
              </v-col>

              <!-- Divider -->
              <v-col cols="2" class="d-flex justify-center">
                <v-divider vertical class="opacity-20"></v-divider>
              </v-col>

              <!-- Expense Stats -->
              <v-col cols="5">
                <div class="pa-2">
                  <p class="text-surface text-body-1 opacity-80 mb-1">
                    Expense
                  </p>
                  <p class="text-h4 text-surface font-weight-bold">
                    {{ formattedExpense }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- Welcome Image -->
        <v-col cols="12" md="5" class="d-flex justify-center justify-md-end">
          <v-img
            src="@/assets/images/backgrounds/welcome-bg.png"
            alt=""
            class="welcome-img"
            cover
            :width="300"
            :height="200"
            aria-hidden="true"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="surface"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<style lang="scss" scoped>
.welcome-card {
  overflow: hidden;
  border-radius: 16px;

  :deep(.v-card-item) {
    padding: 24px;
  }
}

.stats-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

// Responsive adjustments
@media (max-width: 960px) {
  .welcome-card {
    :deep(.v-card-item) {
      padding: 16px;
    }
  }

  .welcome-img {
    margin-top: 24px;
    max-width: 250px;
  }
}

@media (max-width: 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }
}
</style>
