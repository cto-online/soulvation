<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Inline Editable Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Inline Editable Table</span>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="addNewRow"
            >
              Add Row
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key="item.id">
                  <td>
                    <v-text-field
                      v-if="editingIndex === index"
                      v-model="item.name"
                      density="compact"
                      variant="outlined"
                      hide-details
                    ></v-text-field>
                    <span v-else>{{ item.name }}</span>
                  </td>
                  <td>
                    <v-text-field
                      v-if="editingIndex === index"
                      v-model="item.email"
                      density="compact"
                      variant="outlined"
                      hide-details
                    ></v-text-field>
                    <span v-else>{{ item.email }}</span>
                  </td>
                  <td>
                    <v-select
                      v-if="editingIndex === index"
                      v-model="item.role"
                      :items="roles"
                      density="compact"
                      variant="outlined"
                      hide-details
                    ></v-select>
                    <span v-else>{{ item.role }}</span>
                  </td>
                  <td>
                    <v-select
                      v-if="editingIndex === index"
                      v-model="item.status"
                      :items="['Active', 'Inactive']"
                      density="compact"
                      variant="outlined"
                      hide-details
                    ></v-select>
                    <v-chip
                      v-else
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>
                    <div class="d-flex gap-2">
                      <template v-if="editingIndex === index">
                        <v-btn
                          icon="mdi-check"
                          variant="text"
                          size="small"
                          color="success"
                          @click="saveRow(index)"
                        ></v-btn>
                        <v-btn
                          icon="mdi-close"
                          variant="text"
                          size="small"
                          color="error"
                          @click="cancelEdit"
                        ></v-btn>
                      </template>
                      <template v-else>
                        <v-btn
                          icon="mdi-pencil"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="editRow(index)"
                        ></v-btn>
                        <v-btn
                          icon="mdi-delete"
                          variant="text"
                          size="small"
                          color="error"
                          @click="deleteRow(index)"
                        ></v-btn>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Dialog Editable Table -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Dialog Editable Table</span>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="openDialog()"
            >
              Add Project
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Project</th>
                  <th class="text-left">Client</th>
                  <th class="text-left">Budget</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Progress</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in projectData" :key="item.id">
                  <td>{{ item.project }}</td>
                  <td>{{ item.client }}</td>
                  <td>${{ item.budget }}</td>
                  <td>
                    <v-chip
                      :color="getStatusColor(item.status)"
                      size="small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td style="width: 200px">
                    <v-progress-linear
                      :model-value="item.progress"
                      :color="getProgressColor(item.progress)"
                      height="4"
                      rounded
                    ></v-progress-linear>
                  </td>
                  <td>
                    <div class="d-flex gap-2">
                      <v-btn
                        icon="mdi-pencil"
                        variant="text"
                        size="small"
                        color="primary"
                        @click="openDialog(index)"
                      ></v-btn>
                      <v-btn
                        icon="mdi-delete"
                        variant="text"
                        size="small"
                        color="error"
                        @click="deleteProject(index)"
                      ></v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit Project Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editedIndex === -1 ? 'New Project' : 'Edit Project' }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.project"
              label="Project Name"
              :rules="[v => !!v || 'Project name is required']"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="editedItem.client"
              label="Client Name"
              :rules="[v => !!v || 'Client name is required']"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model.number="editedItem.budget"
              label="Budget"
              type="number"
              prefix="$"
              :rules="[
                v => !!v || 'Budget is required',
                v => v > 0 || 'Budget must be greater than 0'
              ]"
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="editedItem.status"
              :items="['Pending', 'In Progress', 'Completed']"
              label="Status"
              :rules="[v => !!v || 'Status is required']"
              class="mb-4"
            ></v-select>

            <v-slider
              v-model="editedItem.progress"
              label="Progress"
              thumb-label
              :min="0"
              :max="100"
              :step="5"
            ></v-slider>
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
            @click="saveDialog"
            :disabled="!valid"
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
  name: 'TableEditable',

  data() {
    return {
      editingIndex: -1,
      roles: ['Admin', 'Editor', 'User'],
      tableData: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Editor',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Bob Wilson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive'
        }
      ],
      projectData: [
        {
          id: 1,
          project: 'Website Redesign',
          client: 'Tech Corp',
          budget: 15000,
          status: 'In Progress',
          progress: 65
        },
        {
          id: 2,
          project: 'Mobile App',
          client: 'Design Studio',
          budget: 25000,
          status: 'Completed',
          progress: 100
        },
        {
          id: 3,
          project: 'Database Migration',
          client: 'Data Inc',
          budget: 8000,
          status: 'Pending',
          progress: 35
        }
      ],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: 0,
        project: '',
        client: '',
        budget: 0,
        status: '',
        progress: 0
      },
      defaultItem: {
        id: 0,
        project: '',
        client: '',
        budget: 0,
        status: 'Pending',
        progress: 0
      },
      valid: true
    }
  },

  methods: {
    editRow(index: number) {
      this.editingIndex = index
    },

    saveRow(index: number) {
      // Validate the data before saving
      if (!this.tableData[index].name || !this.tableData[index].email) {
        return
      }
      this.editingIndex = -1
    },

    cancelEdit() {
      this.editingIndex = -1
    },

    deleteRow(index: number) {
      this.tableData.splice(index, 1)
    },

    addNewRow() {
      const newId = Math.max(...this.tableData.map(item => item.id)) + 1
      this.tableData.push({
        id: newId,
        name: '',
        email: '',
        role: 'User',
        status: 'Active'
      })
      this.editingIndex = this.tableData.length - 1
    },

    openDialog(index = -1) {
      this.editedIndex = index
      if (index === -1) {
        const newId = Math.max(...this.projectData.map(item => item.id)) + 1
        this.editedItem = { ...this.defaultItem, id: newId }
      } else {
        this.editedItem = { ...this.projectData[index] }
      }
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    saveDialog() {
      if (this.editedIndex > -1) {
        Object.assign(this.projectData[this.editedIndex], this.editedItem)
      } else {
        this.projectData.push(this.editedItem)
      }
      this.closeDialog()
    },

    deleteProject(index: number) {
      this.projectData.splice(index, 1)
    },

    getStatusColor(status: string): string {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'success'
        case 'in progress':
          return 'info'
        case 'pending':
          return 'warning'
        default:
          return 'default'
      }
    },

    getProgressColor(progress: number): string {
      if (progress === 100) return 'success'
      if (progress >= 70) return 'info'
      if (progress >= 30) return 'warning'
      return 'error'
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

.gap-2 {
  gap: 0.5rem;
}
</style>