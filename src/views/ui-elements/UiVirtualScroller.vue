<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Virtual Scroller -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Virtual Scroller</v-card-title>
          <v-card-text>
            <v-virtual-scroll
              :items="basicItems"
              height="400"
              item-height="64"
            >
              <template v-slot:default="{ item }">
                <v-list-item
                  :title="item.title"
                  :subtitle="item.subtitle"
                >
                  <template v-slot:prepend>
                    <v-avatar :color="item.color">
                      {{ item.initials }}
                    </v-avatar>
                  </template>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Virtual Scroller with Cards -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Virtual Scroller with Cards</v-card-title>
          <v-card-text>
            <v-virtual-scroll
              :items="cardItems"
              height="400"
              item-height="150"
            >
              <template v-slot:default="{ item }">
                <v-card
                  class="ma-2"
                  variant="outlined"
                >
                  <v-card-item>
                    <template v-slot:prepend>
                      <v-icon
                        :icon="item.icon"
                        :color="item.color"
                        size="large"
                      ></v-icon>
                    </template>
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-subtitle>{{ item.subtitle }}</v-card-subtitle>
                  </v-card-item>
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Virtual Scroller -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Interactive Virtual Scroller</span>
            <div class="d-flex gap-2">
              <v-text-field
                v-model="search"
                label="Search"
                density="compact"
                hide-details
                prepend-inner-icon="mdi-magnify"
                style="max-width: 200px"
              ></v-text-field>
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Sort by"
                density="compact"
                hide-details
                style="max-width: 150px"
              ></v-select>
            </div>
          </v-card-title>
          <v-card-text>
            <v-virtual-scroll
              :items="filteredAndSortedItems"
              height="500"
              item-height="80"
            >
              <template v-slot:default="{ item }">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-checkbox-btn
                      v-model="selected"
                      :value="item.id"
                    ></v-checkbox-btn>
                    <v-avatar :image="item.avatar"></v-avatar>
                  </template>

                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>

                  <template v-slot:append>
                    <v-chip
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="small"
                      class="me-2"
                    >
                      {{ item.status }}
                    </v-chip>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon="mdi-dots-vertical"
                          variant="text"
                          v-bind="props"
                        ></v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="action in itemActions"
                          :key="action.title"
                          :title="action.title"
                          :prepend-icon="action.icon"
                          @click="handleAction(item, action)"
                        ></v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                </v-list-item>
              </template>
            </v-virtual-scroll>

            <v-divider></v-divider>

            <div class="d-flex justify-space-between align-center pa-4">
              <div class="text-body-2">
                {{ selected.length }} items selected
              </div>
              <div class="d-flex gap-2">
                <v-btn
                  v-if="selected.length"
                  color="error"
                  prepend-icon="mdi-delete"
                  @click="deleteSelected"
                >
                  Delete Selected
                </v-btn>
                <v-btn
                  color="primary"
                  prepend-icon="mdi-plus"
                  @click="addItem"
                >
                  Add Item
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Infinite Scroll -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Infinite Scroll</v-card-title>
          <v-card-text>
            <v-virtual-scroll
              :items="infiniteItems"
              height="400"
              item-height="80"
              @update:modelValue="loadMore"
            >
              <template v-slot:default="{ item }">
                <v-list-item
                  :title="item.title"
                  :subtitle="item.timestamp"
                >
                  <template v-slot:prepend>
                    <v-avatar :color="item.color">
                      <v-icon :icon="item.icon" color="white"></v-icon>
                    </v-avatar>
                  </template>

                  <template v-slot:append>
                    <v-chip
                      :color="item.type === 'success' ? 'success' : 'error'"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </template>
                </v-list-item>
              </template>
            </v-virtual-scroll>

            <div
              v-if="loading"
              class="d-flex justify-center align-center pa-4"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add Item Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add New Item</v-card-title>
        <v-card-text>
          <v-form v-model="formValid" @submit.prevent="saveItem">
            <v-text-field
              v-model="newItem.name"
              label="Name"
              :rules="[v => !!v || 'Name is required']"
            ></v-text-field>

            <v-text-field
              v-model="newItem.email"
              label="Email"
              :rules="[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
              ]"
            ></v-text-field>

            <v-select
              v-model="newItem.status"
              :items="['Active', 'Inactive']"
              label="Status"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!formValid"
            @click="saveItem"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiVirtualScroller',

  data() {
    return {
      basicItems: Array.from({ length: 1000 }, (_, i) => ({
        title: `Item ${i + 1}`,
        subtitle: `Subtitle for item ${i + 1}`,
        initials: `I${i + 1}`,
        color: this.getRandomColor()
      })),
      cardItems: Array.from({ length: 100 }, (_, i) => ({
        title: `Card ${i + 1}`,
        subtitle: `Subtitle ${i + 1}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: this.getRandomIcon(),
        color: this.getRandomColor()
      })),
      search: '',
      sortBy: 'name',
      sortOptions: [
        { title: 'Name', value: 'name' },
        { title: 'Status', value: 'status' },
        { title: 'Email', value: 'email' }
      ],
      selected: [],
      itemActions: [
        { title: 'Edit', icon: 'mdi-pencil' },
        { title: 'Delete', icon: 'mdi-delete' },
        { title: 'Share', icon: 'mdi-share-variant' }
      ],
      dialog: false,
      formValid: true,
      newItem: {
        name: '',
        email: '',
        status: 'Active'
      },
      infiniteItems: [],
      loading: false,
      page: 1
    }
  },

  computed: {
    filteredAndSortedItems() {
      let items = this.basicItems.filter(item =>
        item.title.toLowerCase().includes(this.search.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(this.search.toLowerCase())
      )

      items.sort((a, b) => {
        if (this.sortBy === 'name') {
          return a.title.localeCompare(b.title)
        }
        return 0
      })

      return items
    }
  },

  methods: {
    getRandomColor() {
      const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
      return colors[Math.floor(Math.random() * colors.length)]
    },

    getRandomIcon() {
      const icons = ['mdi-star', 'mdi-heart', 'mdi-bell', 'mdi-bookmark', 'mdi-thumb-up']
      return icons[Math.floor(Math.random() * icons.length)]
    },

    handleAction(item: any, action: any) {
      console.log(`${action.title} action on:`, item.title)
    },

    deleteSelected() {
      // Handle delete selected items
      this.selected = []
    },

    addItem() {
      this.dialog = true
    },

    saveItem() {
      if (this.formValid) {
        // Handle save new item
        this.dialog = false
        this.newItem = {
          name: '',
          email: '',
          status: 'Active'
        }
      }
    },

    async loadMore() {
      if (this.loading) return

      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newItems = Array.from({ length: 20 }, (_, i) => ({
        title: `Log Entry ${this.page * 20 + i + 1}`,
        timestamp: new Date().toISOString(),
        icon: this.getRandomIcon(),
        color: this.getRandomColor(),
        type: Math.random() > 0.5 ? 'success' : 'error',
        status: Math.random() > 0.5 ? 'Completed' : 'Failed'
      }))

      this.infiniteItems.push(...newItems)
      this.page++
      this.loading = false
    }
  },

  created() {
    this.loadMore()
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

.gap-2 {
  gap: 0.5rem;
}
</style>