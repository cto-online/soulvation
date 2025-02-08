<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Custom Text Input -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Text Input</v-card-title>
          <v-card-text>
            <div class="custom-input mb-4">
              <label class="custom-input__label">Username</label>
              <div class="custom-input__wrapper">
                <v-icon start>mdi-account</v-icon>
                <input
                  v-model="customText.value"
                  type="text"
                  placeholder="Enter username"
                  class="custom-input__field"
                >
              </div>
              <span class="custom-input__helper">Enter your unique username</span>
            </div>

            <div class="custom-input">
              <label class="custom-input__label">Website</label>
              <div class="custom-input__wrapper">
                <span class="prefix">https://</span>
                <input
                  v-model="customText.website"
                  type="text"
                  placeholder="example.com"
                  class="custom-input__field"
                >
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Select -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Select</v-card-title>
          <v-card-text>
            <div class="custom-select mb-4">
              <label class="custom-select__label">Country</label>
              <div
                class="custom-select__wrapper"
                @click="customSelect.isOpen = !customSelect.isOpen"
              >
                <div class="d-flex align-center justify-space-between">
                  <span :class="{ 'text-medium-emphasis': !customSelect.selected }">
                    {{ customSelect.selected || 'Select country' }}
                  </span>
                  <v-icon>{{ customSelect.isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </div>
              </div>
              <div v-show="customSelect.isOpen" class="custom-select__options">
                <div
                  v-for="option in customSelect.options"
                  :key="option"
                  class="custom-select__option"
                  :class="{ 'custom-select__option--selected': option === customSelect.selected }"
                  @click="selectOption(option)"
                >
                  {{ option }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Radio -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Radio</v-card-title>
          <v-card-text>
            <div class="custom-radio-group">
              <label class="custom-radio-group__label">Notification Preference</label>
              <div
                v-for="option in customRadio.options"
                :key="option.value"
                class="custom-radio"
                :class="{ 'custom-radio--selected': customRadio.selected === option.value }"
                @click="customRadio.selected = option.value"
              >
                <div class="custom-radio__check"></div>
                <div class="custom-radio__content">
                  <div class="custom-radio__title">{{ option.label }}</div>
                  <div class="custom-radio__description text-medium-emphasis">
                    {{ option.description }}
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Custom Checkbox -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Checkbox</v-card-title>
          <v-card-text>
            <div class="custom-checkbox-group">
              <label class="custom-checkbox-group__label">Features</label>
              <div
                v-for="option in customCheckbox.options"
                :key="option.value"
                class="custom-checkbox"
                :class="{ 'custom-checkbox--checked': customCheckbox.selected.includes(option.value) }"
                @click="toggleCheckbox(option.value)"
              >
                <div class="custom-checkbox__box">
                  <v-icon v-if="customCheckbox.selected.includes(option.value)">
                    mdi-check
                  </v-icon>
                </div>
                <div class="custom-checkbox__content">
                  <div class="custom-checkbox__title">{{ option.label }}</div>
                  <div class="custom-checkbox__description text-medium-emphasis">
                    {{ option.description }}
                  </div>
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
  name: 'CustomInputs',

  data() {
    return {
      customText: {
        value: '',
        website: ''
      },
      customSelect: {
        isOpen: false,
        selected: '',
        options: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France']
      },
      customRadio: {
        selected: 'email',
        options: [
          {
            value: 'email',
            label: 'Email Notifications',
            description: 'Receive notifications via email'
          },
          {
            value: 'push',
            label: 'Push Notifications',
            description: 'Receive notifications on your device'
          },
          {
            value: 'sms',
            label: 'SMS Notifications',
            description: 'Receive notifications via SMS'
          }
        ]
      },
      customCheckbox: {
        selected: [] as string[],
        options: [
          {
            value: 'analytics',
            label: 'Analytics',
            description: 'Get detailed analytics and reports'
          },
          {
            value: 'api',
            label: 'API Access',
            description: 'Full access to our API endpoints'
          },
          {
            value: 'support',
            label: 'Priority Support',
            description: '24/7 priority customer support'
          }
        ]
      }
    }
  },

  methods: {
    selectOption(option: string) {
      this.customSelect.selected = option
      this.customSelect.isOpen = false
    },

    toggleCheckbox(value: string) {
      const index = this.customCheckbox.selected.indexOf(value)
      if (index === -1) {
        this.customCheckbox.selected.push(value)
      } else {
        this.customCheckbox.selected.splice(index, 1)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-input {
  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    border: 1px solid var(--v-border-color);
    border-radius: 4px;
    padding: 0 12px;
    transition: border-color 0.3s ease;

    &:focus-within {
      border-color: var(--v-primary-base);
    }

    .v-icon {
      color: var(--v-medium-emphasis);
      margin-right: 8px;
    }

    .prefix {
      color: var(--v-medium-emphasis);
      margin-right: 4px;
    }
  }

  &__field {
    width: 100%;
    height: 40px;
    border: none;
    background: none;
    outline: none;
    font-size: 1rem;

    &::placeholder {
      color: var(--v-medium-emphasis);
    }
  }

  &__helper {
    display: block;
    font-size: 0.75rem;
    color: var(--v-medium-emphasis);
    margin-top: 0.25rem;
  }
}

.custom-select {
  position: relative;

  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__wrapper {
    border: 1px solid var(--v-border-color);
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: var(--v-primary-base);
    }
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 4px;
    background: var(--v-surface);
    border: 1px solid var(--v-border-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  &__option {
    padding: 8px 12px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: var(--v-surface-variant);
    }

    &--selected {
      background: var(--v-primary-lighten5);
      color: var(--v-primary-base);
    }
  }
}

.custom-radio-group {
  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
}

.custom-radio {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid var(--v-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  &:hover {
    border-color: var(--v-primary-base);
  }

  &--selected {
    border-color: var(--v-primary-base);
    background: var(--v-primary-lighten5);
  }

  &__check {
    width: 20px;
    height: 20px;
    border: 2px solid var(--v-border-color);
    border-radius: 50%;
    margin-right: 1rem;
    position: relative;
    flex-shrink: 0;

    &::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--v-primary-base);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }

  &--selected &__check {
    border-color: var(--v-primary-base);

    &::after {
      opacity: 1;
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  &__description {
    font-size: 0.875rem;
  }
}

.custom-checkbox-group {
  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
}

.custom-checkbox {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid var(--v-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;

  &:hover {
    border-color: var(--v-primary-base);
  }

  &--checked {
    border-color: var(--v-primary-base);
    background: var(--v-primary-lighten5);
  }

  &__box {
    width: 20px;
    height: 20px;
    border: 2px solid var(--v-border-color);
    border-radius: 4px;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .v-icon {
      font-size: 16px;
      color: var(--v-primary-base);
    }
  }

  &--checked &__box {
    border-color: var(--v-primary-base);
    background: var(--v-primary-base);

    .v-icon {
      color: white;
    }
  }

  &__content {
    flex-grow: 1;
  }

  &__title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  &__description {
    font-size: 0.875rem;
  }
}
</style>