<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Badges -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Badges</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-badge
                content="1"
                color="primary"
              >
                <v-icon size="32">mdi-email</v-icon>
              </v-badge>

              <v-badge
                content="2"
                color="success"
              >
                <v-icon size="32">mdi-message</v-icon>
              </v-badge>

              <v-badge
                content="3"
                color="info"
              >
                <v-icon size="32">mdi-bell</v-icon>
              </v-badge>

              <v-badge
                content="99+"
                color="error"
              >
                <v-icon size="32">mdi-cart</v-icon>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Badge Positions -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Badge Positions</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8 mb-8">
              <v-badge
                dot
                color="success"
                location="top start"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>

              <v-badge
                dot
                color="success"
                location="top end"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>

              <v-badge
                dot
                color="success"
                location="bottom start"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>

              <v-badge
                dot
                color="success"
                location="bottom end"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>
            </div>

            <div class="d-flex align-center gap-8">
              <v-badge
                content="1"
                color="primary"
                location="top start"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>

              <v-badge
                content="2"
                color="primary"
                location="top end"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>

              <v-badge
                content="3"
                color="primary"
                location="bottom start"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>

              <v-badge
                content="4"
                color="primary"
                location="bottom end"
              >
                <v-icon size="32">mdi-account</v-icon>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Badge Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Badge Colors</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-badge
                v-for="color in colors"
                :key="color"
                :content="'1'"
                :color="color"
              >
                <v-btn
                  :color="color"
                  icon
                >
                  <v-icon>mdi-bell</v-icon>
                </v-btn>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dynamic Badges -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Dynamic Badges</span>
            <div class="d-flex gap-4">
              <v-btn
                color="error"
                @click="count = 0"
              >
                Clear
              </v-btn>
              <v-btn
                color="primary"
                @click="count++"
              >
                Increment
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-badge
                :content="count.toString()"
                :color="getBadgeColor(count)"
                :model-value="count > 0"
              >
                <v-btn
                  :color="getBadgeColor(count)"
                  icon
                >
                  <v-icon>mdi-bell</v-icon>
                </v-btn>
              </v-badge>

              <v-badge
                :content="formatCount(count)"
                :color="getBadgeColor(count)"
                :model-value="count > 0"
              >
                <v-btn
                  :color="getBadgeColor(count)"
                  icon
                >
                  <v-icon>mdi-email</v-icon>
                </v-btn>
              </v-badge>

              <v-badge
                dot
                :color="getBadgeColor(count)"
                :model-value="count > 0"
              >
                <v-btn
                  :color="getBadgeColor(count)"
                  icon
                >
                  <v-icon>mdi-message</v-icon>
                </v-btn>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Content -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Content</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-badge
                icon="mdi-lock"
                color="warning"
              >
                <v-avatar color="primary" size="48">
                  <span class="text-white">JD</span>
                </v-avatar>
              </v-badge>

              <v-badge
                icon="mdi-check"
                color="success"
              >
                <v-avatar color="info" size="48">
                  <span class="text-white">VIP</span>
                </v-avatar>
              </v-badge>

              <v-badge>
                <template v-slot:badge>
                  <v-icon>mdi-crown</v-icon>
                </template>
                <v-avatar color="warning" size="48">
                  <span class="text-white">PRO</span>
                </v-avatar>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Badges -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Badges</v-card-title>
          <v-card-text>
            <div class="d-flex align-center gap-8">
              <v-badge
                :content="notifications.length.toString()"
                color="error"
                :model-value="notifications.length > 0"
              >
                <v-btn
                  icon
                  @click="showNotifications = !showNotifications"
                >
                  <v-icon>mdi-bell</v-icon>
                </v-btn>

                <v-menu
                  v-model="showNotifications"
                  :close-on-content-click="false"
                  location="bottom end"
                >
                  <v-card min-width="300">
                    <v-list>
                      <v-list-subheader>Notifications</v-list-subheader>
                      <v-list-item
                        v-for="notification in notifications"
                        :key="notification.id"
                        :title="notification.title"
                        :subtitle="notification.text"
                      >
                        <template v-slot:prepend>
                          <v-avatar :color="notification.color">
                            <v-icon color="white">{{ notification.icon }}</v-icon>
                          </v-avatar>
                        </template>
                        <template v-slot:append>
                          <v-btn
                            icon="mdi-close"
                            variant="text"
                            size="small"
                            @click="removeNotification(notification.id)"
                          ></v-btn>
                        </template>
                      </v-list-item>
                      <v-list-item v-if="notifications.length === 0">
                        <v-list-item-title class="text-center">
                          No notifications
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </v-badge>

              <v-badge
                :content="messages.toString()"
                color="primary"
                :model-value="messages > 0"
              >
                <v-btn
                  icon
                  @click="messages = Math.max(0, messages - 1)"
                >
                  <v-icon>mdi-message</v-icon>
                </v-btn>
              </v-badge>

              <v-badge
                :content="cart.toString()"
                color="success"
                :model-value="cart > 0"
              >
                <v-btn
                  icon
                  @click="cart++"
                >
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-badge>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiBadge',

  data() {
    return {
      count: 0,
      messages: 5,
      cart: 3,
      showNotifications: false,
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      notifications: [
        {
          id: 1,
          title: 'New Message',
          text: 'You have a new message from John',
          icon: 'mdi-email',
          color: 'primary'
        },
        {
          id: 2,
          title: 'Payment Success',
          text: 'Your payment was successful',
          icon: 'mdi-check-circle',
          color: 'success'
        },
        {
          id: 3,
          title: 'Storage Warning',
          text: 'You are running low on storage',
          icon: 'mdi-alert',
          color: 'warning'
        }
      ]
    }
  },

  methods: {
    getBadgeColor(count: number): string {
      if (count === 0) return 'grey'
      if (count < 5) return 'success'
      if (count < 10) return 'warning'
      return 'error'
    },

    formatCount(count: number): string {
      return count > 99 ? '99+' : count.toString()
    },

    removeNotification(id: number) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    }
  }
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

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}
</style>