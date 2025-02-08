<template>
  <v-container fluid class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
            <span>Project Management</span>
            <div class="d-flex gap-4">
              <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                density="compact"
                style="max-width: 300px"
              ></v-text-field>
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="openDialog()"
              >
                Add Project
              </v-btn>
            </div>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="projects"
              :search="search"
              :loading="loading"
              class="elevation-1"
            >
              <template v-slot:item.team="{ item }">
                <v-avatar-group max="3">
                  <v-avatar
                    v-for="member in item.team"
                    :key="member.id"
                    :color="member.color"
                    size="32"
                  >
                    {{ member.initials }}
                  </v-avatar>
                </v-avatar-group>
              </template>

              <template v-slot:item.budget="{ item }">
                ${{ item.budget.toLocaleString() }}
              </template>

              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.progress="{ item }">
                <div>
                  <div class="d-flex justify-space-between mb-1">
                    <span class="text-caption">Progress</span>
                    <span class="text-caption">{{ item.progress }}%</span>
                  </div>
                  <v-progress-linear
                    :model-value="item.progress"
                    :color="getProgressColor(item.progress)"
                    height="6"
                    rounded
                  ></v-progress-linear>
                </div>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  size="small"
                  color="primary"
                  class="mr-2"
                  @click="openDialog(item)"
                ></v-btn>
                <v-btn
                  icon="mdi-delete"
                  variant="text"
                  size="small"
                  color="error"
                  @click="confirmDelete(item)"
                ></v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedIndex === -1 ? 'New Project' : 'Edit Project' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.name"
                  label="Project Name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="editedItem.client"
                  label="Client"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model.number="editedItem.budget"
                  label="Budget"
                  type="number"
                  prefix="$"
                  :rules="[rules.required, rules.positive]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="editedItem.status"
                  :items="statusOptions"
                  label="Status"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="editedItem.team"
                  :items="teamMembers"
                  label="Team Members"
                  multiple
                  chips
                  :rules="[rules.required]"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip
                      :color="item.raw.color"
                      label
                      small
                    >
                      {{ item.raw.name }} ({{ item.raw.initials }})
                    </v-chip>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-slider
                  v-model="editedItem.progress"
                  label="Progress"
                  thumb-label
                  :min="0"
                  :max="100"
                  :step="5"
                ></v-slider>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Description"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            variant="text"
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="save"
            :disabled="!valid"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Delete Project</v-card-title>
        <v-card-text>
          Are you sure you want to delete this project? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="text"
            @click="deleteItemConfirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CrudTable',

  data() {
    return {
      search: '',
      dialog: false,
      deleteDialog: false,
      loading: false,
      valid: true,
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        client: '',
        team: [],
        budget: 0,
        status: '',
        progress: 0,
        description: ''
      },
      defaultItem: {
        id: 0,
        name: '',
        client: '',
        team: [],
        budget: 0,
        status: 'Planning',
        progress: 0,
        description: ''
      },
      headers: [
        { title: 'Project', key: 'name', sortable: true },
        { title: 'Client', key: 'client', sortable: true },
        { title: 'Team', key: 'team', sortable: false },
        { title: 'Budget', key: 'budget', sortable: true },
        { title: 'Status', key: 'status', sortable: true },
        { title: 'Progress', key: 'progress', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      projects: [
        {
          id: 1,
          name: 'Website Redesign',
          client: 'Tech Corp',
          team: [
            { id: 1, name: 'John Doe', initials: 'JD', color: 'primary' },
            { id: 2, name: 'Jane Smith', initials: 'JS', color: 'success' }
          ],
          budget: 15000,
          status: 'In Progress',
          progress: 65,
          description: 'Complete redesign of corporate website with modern UI/UX principles.'
        },
        {
          id: 2,
          name: 'Mobile App',
          client: 'StartUp Inc',
          team: [
            { id: 2, name: 'Jane Smith', initials: 'JS', color: 'success' },
            { id: 3, name: 'Bob Wilson', initials: 'BW', color: 'warning' }
          ],
          budget: 25000,
          status: 'Planning',
          progress: 15,
          description: 'Development of native mobile application for iOS and Android platforms.'
        }
      ],
      rules: {
        required: (v: any) => !!v || 'This field is required',
        positive: (v: number) => v > 0 || 'Value must be greater than 0'
      },
      statusOptions: ['Planning', 'In Progress', 'On Hold', 'Completed'],
      teamMembers: [
        { id: 1, name: 'John Doe', initials: 'JD', color: 'primary' },
        { id: 2, name: 'Jane Smith', initials: 'JS', color: 'success' },
        { id: 3, name: 'Bob Wilson', initials: 'BW', color: 'warning' },
        { id: 4, name: 'Alice Brown', initials: 'AB', color: 'error' }
      ]
    }
  },

  methods: {
    getStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'success'
        case 'in progress':
          return 'info'
        case 'on hold':
          return 'warning'
        case 'planning':
          return 'grey'
        default:
          return 'default'
      }
    },

    getProgressColor(progress: number): string {
      if (progress === 100) return 'success'
      if (progress >= 70) return 'info'
      if (progress >= 30) return 'warning'
      return 'error'
    },

    openDialog(item?: any) {
      this.editedIndex = item ? this.projects.indexOf(item) : -1
      this.editedItem = item ? { ...item } : { ...this.defaultItem }
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    confirmDelete(item: any) {
      this.editedIndex = this.projects.indexOf(item)
      this.editedItem = { ...item }
      this.deleteDialog = true
    },

    async deleteItemConfirm() {
      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.projects.splice(this.editedIndex, 1)
      } finally {
        this.loading = false
        this.deleteDialog = false
      }
    },

    async save() {
      if (!this.valid) return

      this.loading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (this.editedIndex > -1) {
          Object.assign(this.projects[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.id = Math.max(...this.projects.map(p => p.id)) + 1
          this.projects.push(this.editedItem)
        }
      } finally {
        this.loading = false
        this.closeDialog()
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