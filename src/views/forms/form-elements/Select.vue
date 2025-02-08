<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Select -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Select</v-card-title>
          <v-card-text>
            <v-select
              v-model="basic.selected"
              :items="basic.items"
              label="Select an item"
              variant="outlined"
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
              v-model="multiple.selected"
              :items="multiple.items"
              label="Select multiple items"
              multiple
              chips
              variant="outlined"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Icons</v-card-title>
          <v-card-text>
            <v-select
              v-model="icons.selected"
              :items="icons.items"
              label="Select a social platform"
              item-title="text"
              item-value="value"
              variant="outlined"
            >
              <template v-slot:selection="{ item }">
                <v-icon :color="item.raw.color" start>
                  {{ item.raw.icon }}
                </v-icon>
                {{ item.raw.text }}
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-icon :color="item.raw.color">
                      {{ item.raw.icon }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ item.raw.text }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- With Validation -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>With Validation</v-card-title>
          <v-card-text>
            <v-form v-model="validation.valid">
              <v-select
                v-model="validation.selected"
                :items="validation.items"
                :rules="validation.rules"
                label="Required field"
                variant="outlined"
                required
              ></v-select>
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

      <!-- Custom Appearance -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Appearance</v-card-title>
          <v-card-text>
            <v-select
              v-model="custom.selected"
              :items="custom.items"
              label="Select a plan"
              item-title="name"
              item-value="id"
              variant="outlined"
            >
              <template v-slot:selection="{ item }">
                <v-chip
                  :color="item.raw.color"
                  label
                >
                  {{ item.raw.name }}
                  <span class="ml-2 text-caption">
                    ${{ item.raw.price }}
                  </span>
                </v-chip>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-icon :color="item.raw.color">
                      {{ item.raw.icon }}
                    </v-icon>
                  </template>
                  <v-list-item-title>{{ item.raw.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    ${{ item.raw.price }} / month
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Grouped Items -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Grouped Items</v-card-title>
          <v-card-text>
            <v-select
              v-model="grouped.selected"
              :items="grouped.items"
              label="Select a programming language"
              item-title="text"
              item-value="value"
              variant="outlined"
            >
              <template v-slot:item="{ props, item }">
                <v-list-group
                  v-if="item.raw.type === 'group'"
                  :value="item.raw.items"
                >
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-list-item v-bind="activatorProps">
                      <v-list-item-title>{{ item.raw.text }}</v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-list-item
                    v-for="child in item.raw.items"
                    :key="child.value"
                    :value="child.value"
                  >
                    <v-list-item-title>{{ child.text }}</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-else
                  v-bind="props"
                >
                  <v-list-item-title>{{ item.raw.text }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select',

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
      icons: {
        selected: null,
        items: [
          {
            text: 'Facebook',
            value: 'facebook',
            icon: 'mdi-facebook',
            color: 'blue'
          },
          {
            text: 'Twitter',
            value: 'twitter',
            icon: 'mdi-twitter',
            color: 'light-blue'
          },
          {
            text: 'Instagram',
            value: 'instagram',
            icon: 'mdi-instagram',
            color: 'purple'
          },
          {
            text: 'LinkedIn',
            value: 'linkedin',
            icon: 'mdi-linkedin',
            color: 'blue-darken-1'
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
      custom: {
        selected: null,
        items: [
          {
            id: 1,
            name: 'Basic',
            price: '9.99',
            color: 'primary',
            icon: 'mdi-star'
          },
          {
            id: 2,
            name: 'Pro',
            price: '19.99',
            color: 'success',
            icon: 'mdi-star-circle'
          },
          {
            id: 3,
            name: 'Enterprise',
            price: '49.99',
            color: 'error',
            icon: 'mdi-star-circle-outline'
          }
        ]
      },
      grouped: {
        selected: null,
        items: [
          {
            text: 'Frontend',
            type: 'group',
            items: [
              { text: 'Vue.js', value: 'vue' },
              { text: 'React', value: 'react' },
              { text: 'Angular', value: 'angular' }
            ]
          },
          {
            text: 'Backend',
            type: 'group',
            items: [
              { text: 'Node.js', value: 'node' },
              { text: 'Python', value: 'python' },
              { text: 'Java', value: 'java' }
            ]
          },
          {
            text: 'Database',
            type: 'group',
            items: [
              { text: 'MongoDB', value: 'mongodb' },
              { text: 'PostgreSQL', value: 'postgresql' },
              { text: 'MySQL', value: 'mysql' }
            ]
          }
        ]
      }
    }
  },

  methods: {
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