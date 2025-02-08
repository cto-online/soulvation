<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Combobox -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Combobox</v-card-title>
          <v-card-text>
            <v-combobox
              v-model="basic.selected"
              :items="basic.items"
              label="Select or create an item"
              variant="outlined"
            ></v-combobox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multiple Selection -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Multiple Selection</v-card-title>
          <v-card-text>
            <v-combobox
              v-model="multiple.selected"
              :items="multiple.items"
              label="Select or create multiple items"
              multiple
              chips
              variant="outlined"
            ></v-combobox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Items -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Items</v-card-title>
          <v-card-text>
            <v-combobox
              v-model="custom.selected"
              :items="custom.items"
              label="Select or create a skill"
              item-title="name"
              item-value="id"
              variant="outlined"
              multiple
              chips
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :color="item.raw.color"
                >
                  <v-icon start>{{ item.raw.icon }}</v-icon>
                  {{ item.raw.name }}
                </v-chip>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-icon :color="item.raw.color">{{ item.raw.icon }}</v-icon>
                  </template>
                  <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-combobox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid" @submit.prevent>
              <v-combobox
                v-model="validation.selected"
                :items="validation.items"
                :rules="validation.rules"
                label="Required field"
                variant="outlined"
                required
              ></v-combobox>
              <v-btn
                color="primary"
                class="mt-4"
                :disabled="!validation.valid"
                @click="submitValidation"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dense Combobox -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Dense Combobox</v-card-title>
          <v-card-text>
            <v-combobox
              v-model="dense.selected"
              :items="dense.items"
              label="Select or create an item"
              density="compact"
              variant="outlined"
            ></v-combobox>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Search -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Search</v-card-title>
          <v-card-text>
            <v-combobox
              v-model="search.selected"
              :items="search.items"
              :loading="search.loading"
              label="Search and select or create"
              variant="outlined"
              @update:search="onSearch"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Type to search or create a new item
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-combobox>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Combobox',

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
        selected: [],
        items: [
          {
            id: 1,
            name: 'Vue.js',
            icon: 'mdi-vuejs',
            color: 'success'
          },
          {
            id: 2,
            name: 'React',
            icon: 'mdi-react',
            color: 'info'
          },
          {
            id: 3,
            name: 'Angular',
            icon: 'mdi-angular',
            color: 'error'
          }
        ]
      },
      validation: {
        valid: true,
        selected: null,
        items: ['Required Option 1', 'Required Option 2', 'Required Option 3'],
        rules: [
          (v: any) => !!v || 'This field is required'
        ]
      },
      dense: {
        selected: null,
        items: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
      },
      search: {
        selected: null,
        items: [],
        loading: false,
        search: null
      }
    }
  },

  methods: {
    async onSearch(search: string) {
      if (!search) return

      this.search.loading = true

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      this.search.items = [
        `Result 1 for "${search}"`,
        `Result 2 for "${search}"`,
        `Result 3 for "${search}"`
      ]

      this.search.loading = false
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