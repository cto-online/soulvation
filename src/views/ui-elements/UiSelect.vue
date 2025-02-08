<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Select -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Select</v-card-title>
          <v-card-text>
            <v-select
              v-model="selected"
              :items="items"
              label="Select an option"
            ></v-select>

            <v-select
              v-model="selected"
              :items="items"
              label="With hint"
              hint="Select your preferred option"
              persistent-hint
            ></v-select>

            <v-select
              v-model="selected"
              :items="items"
              label="With rules"
              :rules="[v => !!v || 'Item is required']"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Select Variants -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Select Variants</v-card-title>
          <v-card-text>
            <v-select
              v-for="variant in variants"
              :key="variant"
              v-model="variantSelections[variant]"
              :items="items"
              :label="variant"
              :variant="variant"
              class="mb-4"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Multiple Select -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Multiple Select</v-card-title>
          <v-card-text>
            <v-select
              v-model="multipleSelected"
              :items="items"
              label="Multiple selection"
              multiple
              chips
            ></v-select>

            <v-select
              v-model="multipleSelected"
              :items="items"
              label="With counter"
              multiple
              counter
            ></v-select>

            <v-select
              v-model="multipleSelected"
              :items="items"
              label="Closable chips"
              multiple
              chips
              closable-chips
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Select -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Select</v-card-title>
          <v-card-text>
            <v-select
              v-model="customSelected"
              :items="users"
              label="Select User"
              item-title="name"
              item-value="id"
            >
              <template v-slot:selection="{ item }">
                <v-chip>
                  <v-avatar start>
                    <v-img :src="item.raw.avatar"></v-img>
                  </v-avatar>
                  {{ item.raw.name }}
                </v-chip>
              </template>

              <template v-slot:item="{ item, props }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
                  :subtitle="item.raw.email"
                >
                  <template v-slot:prepend>
                    <v-avatar>
                      <v-img :src="item.raw.avatar"></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Select with Groups -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Select with Groups</v-card-title>
          <v-card-text>
            <v-select
              v-model="groupSelected"
              :items="groupedItems"
              label="Select Category"
              item-title="name"
              item-value="id"
              item-children="items"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Select -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Interactive Select</v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedProducts"
              :items="products"
              label="Select Products"
              item-title="name"
              item-value="id"
              multiple
              chips
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :prepend-icon="item.raw.icon"
                  :color="item.raw.color"
                >
                  {{ item.raw.name }}
                  <span class="ms-2">${{ item.raw.price }}</span>
                </v-chip>
              </template>

              <template v-slot:item="{ item, props }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
                  :subtitle="`$${item.raw.price}`"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :icon="item.raw.icon"
                      :color="item.raw.color"
                    ></v-icon>
                  </template>
                  <template v-slot:append>
                    <v-chip
                      :color="item.raw.color"
                      size="small"
                    >
                      {{ item.raw.category }}
                    </v-chip>
                  </template>
                </v-list-item>
              </template>
            </v-select>

            <div v-if="selectedProducts.length" class="mt-4">
              <div class="text-h6 mb-2">Selected Products</div>
              <v-list>
                <v-list-item
                  v-for="id in selectedProducts"
                  :key="id"
                  :title="getProduct(id).name"
                  :subtitle="`$${getProduct(id).price}`"
                >
                  <template v-slot:prepend>
                    <v-icon
                      :icon="getProduct(id).icon"
                      :color="getProduct(id).color"
                    ></v-icon>
                  </template>
                </v-list-item>
              </v-list>
              <div class="d-flex justify-space-between align-center mt-4">
                <div class="text-h6">Total:</div>
                <div class="text-h6">${{ calculateTotal }}</div>
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
  name: 'UiSelect',

  data() {
    return {
      selected: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
      variants: ['filled', 'outlined', 'solo', 'underlined', 'plain'],
      variantSelections: {
        filled: null,
        outlined: null,
        solo: null,
        underlined: null,
        plain: null
      },
      multipleSelected: [],
      customSelected: null,
      groupSelected: null,
      selectedProducts: [],
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          id: 3,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        }
      ],
      groupedItems: [
        {
          name: 'Electronics',
          id: 'electronics',
          items: [
            { name: 'Laptops', id: 'laptops' },
            { name: 'Smartphones', id: 'smartphones' },
            { name: 'Tablets', id: 'tablets' }
          ]
        },
        {
          name: 'Clothing',
          id: 'clothing',
          items: [
            { name: 'Shirts', id: 'shirts' },
            { name: 'Pants', id: 'pants' },
            { name: 'Shoes', id: 'shoes' }
          ]
        }
      ],
      products: [
        {
          id: 1,
          name: 'Laptop Pro',
          price: 1299.99,
          category: 'Electronics',
          icon: 'mdi-laptop',
          color: 'primary'
        },
        {
          id: 2,
          name: 'Smart Watch',
          price: 299.99,
          category: 'Accessories',
          icon: 'mdi-watch',
          color: 'success'
        },
        {
          id: 3,
          name: 'Wireless Earbuds',
          price: 159.99,
          category: 'Audio',
          icon: 'mdi-earbuds',
          color: 'info'
        },
        {
          id: 4,
          name: 'Tablet Air',
          price: 499.99,
          category: 'Electronics',
          icon: 'mdi-tablet',
          color: 'warning'
        }
      ]
    }
  },

  computed: {
    calculateTotal(): number {
      return this.selectedProducts.reduce((total, id) => {
        const product = this.getProduct(id)
        return total + product.price
      }, 0)
    }
  },

  methods: {
    getProduct(id: number) {
      return this.products.find(p => p.id === id) || {
        name: '',
        price: 0,
        icon: '',
        color: ''
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

.mb-4 {
  margin-bottom: 1rem;
}
</style>