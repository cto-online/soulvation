<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Rating -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Rating</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-rating
                v-model="rating"
              ></v-rating>

              <v-rating
                v-model="rating"
                color="primary"
              ></v-rating>

              <v-rating
                v-model="rating"
                color="warning"
                half-increments
              ></v-rating>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Rating Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Rating Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-rating
                v-for="(color, index) in colors"
                :key="index"
                v-model="colorRatings[color]"
                :color="color"
              ></v-rating>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Rating Sizes -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Rating Sizes</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-rating
                v-model="rating"
                color="warning"
                size="x-small"
              ></v-rating>

              <v-rating
                v-model="rating"
                color="warning"
                size="small"
              ></v-rating>

              <v-rating
                v-model="rating"
                color="warning"
              ></v-rating>

              <v-rating
                v-model="rating"
                color="warning"
                size="large"
              ></v-rating>

              <v-rating
                v-model="rating"
                color="warning"
                size="x-large"
              ></v-rating>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Rating Icons -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Rating Icons</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <v-rating
                v-model="customRating1"
                color="success"
                half-increments
              >
                <template v-slot:item="props">
                  <v-icon
                    :icon="props.isFilled ? 'mdi-heart' : 'mdi-heart-outline'"
                    :color="props.isFilled ? 'error' : undefined"
                    @click="props.click"
                  ></v-icon>
                </template>
              </v-rating>

              <v-rating
                v-model="customRating2"
                color="primary"
              >
                <template v-slot:item="props">
                  <v-icon
                    :icon="props.isFilled ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
                    :color="props.isFilled ? 'primary' : undefined"
                    @click="props.click"
                  ></v-icon>
                </template>
              </v-rating>

              <v-rating
                v-model="customRating3"
                color="warning"
              >
                <template v-slot:item="props">
                  <v-icon
                    :icon="props.isFilled ? 'mdi-crown' : 'mdi-crown-outline'"
                    :color="props.isFilled ? 'warning' : undefined"
                    @click="props.click"
                  ></v-icon>
                </template>
              </v-rating>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Rating -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Rating</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="(item, index) in products"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card variant="outlined">
                  <v-img
                    :src="item.image"
                    height="200"
                    cover
                  ></v-img>
                  <v-card-item>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>${{ item.price }}</v-card-subtitle>
                  </v-card-item>
                  <v-card-text>
                    <div class="d-flex align-center mb-2">
                      <v-rating
                        v-model="item.rating"
                        color="warning"
                        half-increments
                        density="compact"
                      ></v-rating>
                      <span class="ms-2 text-body-2">
                        {{ item.rating }} ({{ item.reviews }} reviews)
                      </span>
                    </div>
                    <p class="text-body-2">{{ item.description }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Review Form -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Review Form</v-card-title>
          <v-card-text>
            <v-form v-model="formValid">
              <v-row>
                <v-col cols="12">
                  <div class="text-center">
                    <div class="text-h6 mb-2">Rate your experience</div>
                    <v-rating
                      v-model="review.rating"
                      color="warning"
                      size="large"
                      half-increments
                    ></v-rating>
                    <div class="text-body-2 mt-2">
                      {{ getRatingText(review.rating) }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="review.title"
                    label="Review Title"
                    :rules="[v => !!v || 'Title is required']"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="review.comment"
                    label="Your Review"
                    :rules="[v => !!v || 'Review is required']"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="text-center">
                  <v-btn
                    color="primary"
                    :disabled="!formValid"
                    @click="submitReview"
                  >
                    Submit Review
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiRating',

  data() {
    return {
      rating: 3,
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorRatings: {
        primary: 4,
        secondary: 3,
        success: 5,
        info: 2,
        warning: 4,
        error: 3
      },
      customRating1: 4.5,
      customRating2: 3,
      customRating3: 4,
      formValid: false,
      review: {
        rating: 0,
        title: '',
        comment: ''
      },
      products: [
        {
          name: 'Wireless Headphones',
          price: 199.99,
          rating: 4.5,
          reviews: 128,
          description: 'High-quality wireless headphones with noise cancellation.',
          image: 'https://cdn.vuetifyjs.com/images/cards/headphones.jpg'
        },
        {
          name: 'Smart Watch',
          price: 299.99,
          rating: 4.2,
          reviews: 85,
          description: 'Feature-rich smartwatch with health tracking capabilities.',
          image: 'https://cdn.vuetifyjs.com/images/cards/watch.jpg'
        },
        {
          name: 'Bluetooth Speaker',
          price: 149.99,
          rating: 4.7,
          reviews: 246,
          description: 'Portable speaker with exceptional sound quality.',
          image: 'https://cdn.vuetifyjs.com/images/cards/speaker.jpg'
        }
      ]
    }
  },

  methods: {
    getRatingText(rating: number): string {
      if (rating >= 4.5) return 'Excellent'
      if (rating >= 4) return 'Very Good'
      if (rating >= 3) return 'Good'
      if (rating >= 2) return 'Fair'
      if (rating > 0) return 'Poor'
      return 'Not Rated'
    },

    submitReview() {
      // Handle review submission
      console.log('Review submitted:', this.review)
      // Reset form
      this.review = {
        rating: 0,
        title: '',
        comment: ''
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
</style>