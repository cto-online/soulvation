<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Pagination -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Basic Pagination</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column align-center">
              <v-pagination
                v-model="page"
                :length="10"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Pagination Variants -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Pagination Variants</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Default</div>
                <v-pagination
                  v-model="variants.default"
                  :length="5"
                ></v-pagination>
              </div>

              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Rounded</div>
                <v-pagination
                  v-model="variants.rounded"
                  :length="5"
                  rounded="circle"
                ></v-pagination>
              </div>

              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Text</div>
                <v-pagination
                  v-model="variants.text"
                  :length="5"
                  variant="text"
                ></v-pagination>
              </div>

              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Outlined</div>
                <v-pagination
                  v-model="variants.outlined"
                  :length="5"
                  variant="outlined"
                ></v-pagination>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Pagination Colors -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Pagination Colors</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <div
                v-for="(color, index) in colors"
                :key="index"
                class="d-flex flex-column align-center"
              >
                <div class="text-subtitle-1 mb-2">{{ color }}</div>
                <v-pagination
                  v-model="colorPages[color]"
                  :length="5"
                  :color="color"
                ></v-pagination>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Pagination with Items -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Pagination with Items</span>
            <v-select
              v-model="itemsPerPage"
              :items="[5, 10, 15, 20]"
              label="Items per page"
              density="compact"
              hide-details
              style="max-width: 150px"
            ></v-select>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in paginatedItems"
                  :key="item.id"
                >
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <v-chip
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <div class="d-flex justify-center mt-4">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="7"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Pagination -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Pagination</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column gap-4">
              <!-- Circle Pagination -->
              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Circle Style</div>
                <div class="d-flex align-center">
                  <v-btn
                    icon="mdi-chevron-left"
                    variant="text"
                    :disabled="circlePage === 1"
                    @click="circlePage--"
                  ></v-btn>

                  <div class="pagination-circles">
                    <div
                      v-for="n in 5"
                      :key="n"
                      class="pagination-circle"
                      :class="{ active: circlePage === n }"
                      @click="circlePage = n"
                    ></div>
                  </div>

                  <v-btn
                    icon="mdi-chevron-right"
                    variant="text"
                    :disabled="circlePage === 5"
                    @click="circlePage++"
                  ></v-btn>
                </div>
              </div>

              <!-- Progress Pagination -->
              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Progress Style</div>
                <div class="d-flex align-center w-100" style="max-width: 400px">
                  <v-btn
                    icon="mdi-chevron-left"
                    variant="text"
                    :disabled="progressPage === 1"
                    @click="progressPage--"
                  ></v-btn>

                  <div class="flex-grow-1 mx-4">
                    <v-progress-linear
                      :model-value="(progressPage - 1) * 25"
                      color="primary"
                      height="8"
                      rounded
                    ></v-progress-linear>
                    <div class="text-center mt-1">
                      Step {{ progressPage }} of 4
                    </div>
                  </div>

                  <v-btn
                    icon="mdi-chevron-right"
                    variant="text"
                    :disabled="progressPage === 4"
                    @click="progressPage++"
                  ></v-btn>
                </div>
              </div>

              <!-- Slider Pagination -->
              <div class="d-flex flex-column align-center">
                <div class="text-subtitle-1 mb-2">Slider Style</div>
                <div style="width: 300px">
                  <v-slider
                    v-model="sliderPage"
                    :min="1"
                    :max="5"
                    :step="1"
                    show-ticks="always"
                    thumb-label
                    :ticks="[1,2,3,4,5]"
                  >
                    <template v-slot:thumb-label="{ modelValue }">
                      Page {{ modelValue }}
                    </template>
                  </v-slider>
                </div>
              </div>
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
  name: 'UiPagination',

  data() {
    return {
      page: 1,
      variants: {
        default: 1,
        rounded: 1,
        text: 1,
        outlined: 1
      },
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      colorPages: {
        primary: 1,
        secondary: 1,
        success: 1,
        info: 1,
        warning: 1,
        error: 1
      },
      currentPage: 1,
      itemsPerPage: 5,
      circlePage: 1,
      progressPage: 1,
      sliderPage: 1,
      items: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: Math.random() > 0.3 ? 'Active' : 'Inactive'
      }))
    }
  },

  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.items.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
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

.pagination-circles {
  display: flex;
  gap: 0.5rem;
  margin: 0 1rem;
}

.pagination-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-on-surface), 0.12);
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background-color: rgb(var(--v-theme-primary));
    transform: scale(1.2);
  }

  &:hover:not(.active) {
    background-color: rgba(var(--v-theme-on-surface), 0.24);
  }
}
</style>