<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';

interface ProjectLead {
  id: string;
  name: string;
  designation: string;
  avatar: string;
}

interface Project {
  id: string;
  lead: ProjectLead;
  name: string;
  status: {
    text: string;
    color: string;
  };
  budget: number;
}

interface Tab {
  value: string;
  label: string;
  icon: string;
}

interface Props {
  projects?: Project[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  projects: () => [
    {
      id: '1',
      lead: {
        id: 'l1',
        name: 'John Smith',
        designation: 'Senior Developer',
        avatar: '/avatars/1.jpg'
      },
      name: 'Mobile App Development',
      status: {
        text: 'High',
        color: 'error'
      },
      budget: 24500
    }
  ],
  loading: false
});

const currentMonth = ref('Sept 2024');
const months = computed(() => {
  const now = new Date();
  return Array.from({ length: 3 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() + i);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  });
});

const tabs = ref<Tab[]>([
  { value: 'App', label: 'App', icon: 'solar:widget-linear' },
  { value: 'Mobile', label: 'Mobile', icon: 'solar:smartphone-line-duotone' },
  { value: 'Sass', label: 'SaaS', icon: 'solar:calculator-linear' },
  { value: 'Others', label: 'Others', icon: 'solar:folder-open-outline' }
]);

const currentTab = ref<string>('App');

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/avatars/default.jpg';
};
</script>

<template>
  <v-card
    elevation="10"
    class="revenue-products"
    :loading="props.loading"
    :aria-label="`Revenue by product for ${currentMonth}`"
  >
    <v-card-item>
      <!-- Header -->
      <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between gap-4 mb-6">
        <h2 class="text-h5">Revenue by Product</h2>
        <v-select
          v-model="currentMonth"
          :items="months"
          variant="outlined"
          density="compact"
          hide-details
          class="month-select"
        />
      </div>

      <!-- Tabs -->
      <v-tabs
        v-model="currentTab"
        bg-color="transparent"
        class="mb-4"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          class="tab-button"
          :aria-label="tab.label"
        >
          <Icon
            :icon="tab.icon"
            class="me-2"
            :height="16"
            aria-hidden="true"
          />
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <!-- Tab Content -->
      <v-window v-model="currentTab">
        <v-window-item
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
        >
          <v-table class="revenue-table">
            <thead>
              <tr>
                <th scope="col">Assigned</th>
                <th scope="col">Progress</th>
                <th scope="col">Priority</th>
                <th scope="col" class="text-right">Budget</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in props.projects"
                :key="project.id"
                class="project-row"
              >
                <td>
                  <div class="d-flex align-center gap-3">
                    <v-avatar
                      size="48"
                      rounded="md"
                      class="flex-shrink-0"
                    >
                      <v-img
                        :src="project.lead.avatar"
                        :alt="`Avatar of ${project.lead.name}`"
                        @error="handleImageError"
                        cover
                      />
                    </v-avatar>
                    <div class="min-width-0">
                      <div class="text-subtitle-1 font-weight-medium text-truncate">
                        {{ project.lead.name }}
                      </div>
                      <div class="text-body-2 text-medium-emphasis text-truncate">
                        {{ project.lead.designation }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="text-body-2 text-medium-emphasis text-truncate">
                    {{ project.name }}
                  </div>
                </td>
                <td>
                  <v-chip
                    :color="project.status.color"
                    size="small"
                    label
                    class="font-weight-medium"
                  >
                    {{ project.status.text }}
                  </v-chip>
                </td>
                <td class="text-right">
                  <span class="text-body-1 font-weight-medium">
                    {{ currencyFormatter.format(project.budget) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
      </v-window>
    </v-card-item>

    <!-- Loading Overlay -->
    <template v-slot:loader>
      <v-progress-linear
        color="primary"
        height="3"
        indeterminate
      ></v-progress-linear>
    </template>
  </v-card>
</template>

<style lang="scss" scoped>
.revenue-products {
  border-radius: 12px;
  
  :deep(.v-card-item) {
    padding: 24px;
  }

  .month-select {
    max-width: 200px;
  }

  .tab-button {
    text-transform: none;
    font-weight: 500;
    border-radius: 6px;
    min-width: 100px;
  }

  .revenue-table {
    border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px;
    
    :deep(thead) {
      background: rgb(var(--v-theme-surface));
    }

    :deep(th) {
      text-transform: none;
      font-weight: 600;
      white-space: nowrap;
      color: rgb(var(--v-theme-on-surface));
      border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
      padding: 12px 16px;
    }

    :deep(td) {
      border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
      padding: 12px 16px;
    }

    .project-row {
      &:last-child td {
        border-bottom: none;
      }

      &:hover {
        background: rgba(var(--v-theme-on-surface), 0.04);
      }
    }
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .revenue-products {
    :deep(.v-card-item) {
      padding: 16px;
    }
    
    .text-h5 {
      font-size: 1.25rem !important;
    }

    .revenue-table {
      :deep(th), :deep(td) {
        padding: 8px 12px;
      }
    }
  }
}
</style>
