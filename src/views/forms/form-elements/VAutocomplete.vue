<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Autocomplete -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Autocomplete</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="basic.selected"
              :items="basic.items"
              label="Select an item"
              variant="outlined"
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multiple Selection -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Multiple Selection</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="multiple.selected"
              :items="multiple.items"
              label="Select multiple items"
              multiple
              chips
              variant="outlined"
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Items -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Items</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="custom.selected"
              :items="custom.items"
              label="Select a user"
              item-title="name"
              item-value="id"
              variant="outlined"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-avatar size="32">
                      <v-img :src="item.raw.avatar"></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.raw.email }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Asynchronous Items -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Asynchronous Items</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="async.selected"
              :items="async.items"
              :loading="async.loading"
              label="Search users"
              item-title="name"
              item-value="id"
              variant="outlined"
              @update:search="searchUsers"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Search for a user
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dense Autocomplete -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Dense Autocomplete</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="dense.selected"
              :items="dense.items"
              label="Select an item"
              density="compact"
              variant="outlined"
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid" @submit.prevent>
              <v-autocomplete
                v-model="validation.selected"
                :items="validation.items"
                :rules="validation.rules"
                label="Required field"
                variant="outlined"
                required
              ></v-autocomplete>
              <v-btn
                color="primary"
                :disabled="!validation.valid"
                @click="submitValidation"
              >
                Submit
              </v-btn>
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
  name: 'VAutocomplete',

  data() {
    return {
      basic: {
        selected: null,
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
      },
      multiple: {
        selected: [],
        items: ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Node.js']
      },
      custom: {
        selected: null,
        items: [
          {
            id: 1,
            name: 'John Smith',
            email: 'john@example.com',
            avatar: '@/assets/images/avatars/1.jpg'
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            avatar: '@/assets/images/avatars/2.jpg'
          },
          {
            id: 3,
            name: 'Michael Brown',
            email: 'michael@example.com',
            avatar: '@/assets/images/avatars/3.jpg'
          }
        ]
      },
      async: {
        selected: null,
        items: [],
        loading: false,
        search: null
      },
      dense: {
        selected: null,
        items: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
      },
      validation: {
        valid: true,
        selected: null,
        items: ['Required Option 1', 'Required Option 2', 'Required Option 3'],
        rules: [
          (v: any) => !!v || 'This field is required'
        ]
      }
    }
  },

  methods: {
    async searchUsers(search: string) {
      if (!search) return

      this.async.loading = true

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      this.async.items = [
        {
          id: 1,
          name: `${search} Smith`,
          email: `${search.toLowerCase()}@example.com`
        },
        {
          id: 2,
          name: `${search} Johnson`,
          email: `${search.toLowerCase()}.j@example.com`
        },
        {
          id: 3,
          name: `${search} Williams`,
          email: `${search.toLowerCase()}.w@example.com`
        }
      ]

      this.async.loading = false
    },

    submitValidation() {
      console.log('Validation form submitted:', this.validation.selected)
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
</style>