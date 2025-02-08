<template>
  <v-container fluid class="py-8">
    <!-- Basic Cards -->
    <v-row>
      <v-col cols="12" class="mb-6">
        <h2 class="text-h4 mb-6">Basic Cards</h2>
        <v-row>
          <v-col v-for="card in basicCards" :key="card.title" cols="12" md="4">
            <v-card>
              <v-img
                :src="card.image"
                height="200"
                cover
              ></v-img>
              <v-card-title>{{ card.title }}</v-card-title>
              <v-card-text>{{ card.text }}</v-card-text>
              <v-card-actions>
                <v-btn color="primary">Read More</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Stat Cards -->
    <v-row>
      <v-col cols="12" class="mb-6">
        <h2 class="text-h4 mb-6">Stat Cards</h2>
        <v-row>
          <v-col v-for="stat in statCards" :key="stat.title" cols="12" sm="6" lg="3">
            <v-card>
              <v-card-text>
                <div class="d-flex align-center justify-space-between mb-4">
                  <v-icon :color="stat.color" size="48">{{ stat.icon }}</v-icon>
                  <span :class="`text-${stat.trend}`">
                    <v-icon small>{{ stat.trend === 'success' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    {{ stat.percentage }}%
                  </span>
                </div>
                <h3 class="text-h4 mb-1">{{ stat.value }}</h3>
                <p class="text-caption">{{ stat.title }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Action Cards -->
    <v-row>
      <v-col cols="12" class="mb-6">
        <h2 class="text-h4 mb-6">Action Cards</h2>
        <v-row>
          <v-col v-for="action in actionCards" :key="action.title" cols="12" md="6">
            <v-card :color="action.color" class="action-card">
              <v-card-text class="d-flex align-center">
                <div class="flex-grow-1">
                  <h3 class="text-h5 font-weight-bold text-white mb-2">{{ action.title }}</h3>
                  <p class="text-body-1 text-white mb-0">{{ action.text }}</p>
                </div>
                <v-btn
                  :color="action.buttonColor"
                  size="large"
                >
                  {{ action.buttonText }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Profile Cards -->
    <v-row>
      <v-col cols="12" class="mb-6">
        <h2 class="text-h4 mb-6">Profile Cards</h2>
        <v-row>
          <v-col v-for="profile in profileCards" :key="profile.name" cols="12" sm="6" md="3">
            <v-card class="profile-card">
              <div class="text-center pa-4">
                <v-avatar size="100" class="mb-4">
                  <v-img :src="profile.avatar" cover></v-img>
                </v-avatar>
                <h3 class="text-h6 font-weight-bold mb-1">{{ profile.name }}</h3>
                <p class="text-caption mb-4">{{ profile.position }}</p>
                <div class="d-flex justify-center gap-2">
                  <v-btn
                    v-for="social in profile.socials"
                    :key="social.icon"
                    :icon="social.icon"
                    variant="text"
                    size="small"
                  ></v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Interactive Cards -->
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 mb-6">Interactive Cards</h2>
        <v-row>
          <v-col v-for="card in interactiveCards" :key="card.title" cols="12" md="6">
            <v-card class="interactive-card">
              <v-card-text>
                <v-row align="center">
                  <v-col cols="8">
                    <h3 class="text-h5 font-weight-bold mb-2">{{ card.title }}</h3>
                    <p class="text-body-2 mb-0">{{ card.text }}</p>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-btn-toggle
                      v-model="card.toggle"
                      mandatory
                      rounded="lg"
                      color="primary"
                    >
                      <v-btn value="on">On</v-btn>
                      <v-btn value="off">Off</v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cards',

  data() {
    return {
      basicCards: [
        {
          title: 'Card Title 1',
          text: 'This is a basic card example with an image and some text content.',
          image: '@/assets/images/cards/card1.jpg'
        },
        {
          title: 'Card Title 2',
          text: 'Another basic card showing different types of content presentation.',
          image: '@/assets/images/cards/card2.jpg'
        },
        {
          title: 'Card Title 3',
          text: 'Cards can be used to display various types of information clearly.',
          image: '@/assets/images/cards/card3.jpg'
        }
      ],
      statCards: [
        {
          title: 'Total Sales',
          value: '$12,456',
          icon: 'mdi-currency-usd',
          color: 'primary',
          percentage: 12,
          trend: 'success'
        },
        {
          title: 'New Users',
          value: '2,345',
          icon: 'mdi-account-multiple',
          color: 'success',
          percentage: 8,
          trend: 'success'
        },
        {
          title: 'Orders',
          value: '678',
          icon: 'mdi-shopping',
          color: 'warning',
          percentage: 5,
          trend: 'error'
        },
        {
          title: 'Revenue',
          value: '$45,678',
          icon: 'mdi-chart-line',
          color: 'info',
          percentage: 15,
          trend: 'success'
        }
      ],
      actionCards: [
        {
          title: 'Upgrade Your Plan',
          text: 'Get access to premium features and priority support.',
          color: 'primary',
          buttonColor: 'white',
          buttonText: 'Upgrade Now'
        },
        {
          title: 'Complete Your Profile',
          text: 'Add more information to get personalized recommendations.',
          color: 'success',
          buttonColor: 'white',
          buttonText: 'Complete'
        }
      ],
      profileCards: [
        {
          name: 'John Smith',
          position: 'Senior Developer',
          avatar: '@/assets/images/avatars/1.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-github' }
          ]
        },
        {
          name: 'Sarah Johnson',
          position: 'UI/UX Designer',
          avatar: '@/assets/images/avatars/2.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-dribbble' }
          ]
        },
        {
          name: 'Michael Brown',
          position: 'Product Manager',
          avatar: '@/assets/images/avatars/3.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' }
          ]
        },
        {
          name: 'Emily Davis',
          position: 'Marketing Lead',
          avatar: '@/assets/images/avatars/4.jpg',
          socials: [
            { icon: 'mdi-linkedin' },
            { icon: 'mdi-twitter' },
            { icon: 'mdi-instagram' }
          ]
        }
      ],
      interactiveCards: [
        {
          title: 'Notifications',
          text: 'Enable or disable push notifications',
          toggle: 'on'
        },
        {
          title: 'Dark Mode',
          text: 'Switch between light and dark theme',
          toggle: 'off'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.action-card {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.profile-card {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.interactive-card {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}
</style>