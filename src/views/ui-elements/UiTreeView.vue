<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Tree View -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Tree View</v-card-title>
          <v-card-text>
            <v-treeview
              v-model:selected="selected"
              :items="items"
              selectable
              return-object
              open-all
            ></v-treeview>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Tree View with Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Tree View with Icons</v-card-title>
          <v-card-text>
            <v-treeview
              v-model:selected="selectedWithIcons"
              :items="itemsWithIcons"
              item-children="children"
              selectable
              return-object
            >
              <template v-slot:prepend="{ item }">
                <v-icon :icon="item.icon" :color="item.color"></v-icon>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- File Explorer -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>File Explorer</span>
            <div class="d-flex gap-2">
              <v-text-field
                v-model="search"
                label="Search files"
                density="compact"
                hide-details
                prepend-inner-icon="mdi-magnify"
                style="max-width: 200px"
              ></v-text-field>
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="addNewFolder"
              >
                New Folder
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-treeview
                  v-model:selected="selectedFiles"
                  :items="files"
                  :search="search"
                  item-children="children"
                  selectable
                  return-object
                  open-on-click
                  activatable
                >
                  <template v-slot:prepend="{ item }">
                    <v-icon :icon="getFileIcon(item)" :color="getFileColor(item)"></v-icon>
                  </template>

                  <template v-slot:append="{ item }">
                    <div class="d-flex align-center">
                      <v-chip
                        v-if="item.size"
                        size="x-small"
                        class="me-2"
                      >
                        {{ item.size }}
                      </v-chip>
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn
                            icon="mdi-dots-vertical"
                            variant="text"
                            size="small"
                            v-bind="props"
                          ></v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="action in fileActions"
                            :key="action.title"
                            :title="action.title"
                            :prepend-icon="action.icon"
                            @click="handleFileAction(item, action)"
                          ></v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </template>
                </v-treeview>
              </v-col>

              <v-col cols="12" md="8">
                <v-card variant="outlined" class="file-preview">
                  <template v-if="selectedFiles.length === 1">
                    <v-card-item>
                      <template v-slot:prepend>
                        <v-icon
                          :icon="getFileIcon(selectedFiles[0])"
                          :color="getFileColor(selectedFiles[0])"
                          size="large"
                        ></v-icon>
                      </template>
                      <v-card-title>{{ selectedFiles[0].name }}</v-card-title>
                      <v-card-subtitle>
                        {{ selectedFiles[0].type || 'Folder' }} • {{ selectedFiles[0].size || '--' }}
                      </v-card-subtitle>
                    </v-card-item>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-list>
                        <v-list-item>
                          <template v-slot:prepend>
                            <v-icon icon="mdi-calendar"></v-icon>
                          </template>
                          <v-list-item-title>Created</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedFiles[0].created }}</v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item>
                          <template v-slot:prepend>
                            <v-icon icon="mdi-clock"></v-icon>
                          </template>
                          <v-list-item-title>Modified</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedFiles[0].modified }}</v-list-item-subtitle>
                        </v-list-item>

                        <v-list-item v-if="selectedFiles[0].shared">
                          <template v-slot:prepend>
                            <v-icon icon="mdi-account-group"></v-icon>
                          </template>
                          <v-list-item-title>Shared with</v-list-item-title>
                          <v-list-item-subtitle>
                            <v-avatar-group max="3">
                              <v-avatar
                                v-for="user in selectedFiles[0].shared"
                                :key="user.id"
                                :image="user.avatar"
                                size="32"
                              >
                                <v-tooltip activator="parent" location="top">
                                  {{ user.name }}
                                </v-tooltip>
                              </v-avatar>
                            </v-avatar-group>
                          </v-list-item-subtitle>
                        </v-list-item>
                      </v-list>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        prepend-icon="mdi-download"
                        color="primary"
                        variant="tonal"
                      >
                        Download
                      </v-btn>
                      <v-btn
                        prepend-icon="mdi-share-variant"
                        color="secondary"
                        variant="tonal"
                      >
                        Share
                      </v-btn>
                    </v-card-actions>
                  </template>
                  <template v-else-if="selectedFiles.length > 1">
                    <v-card-text class="text-center pa-12">
                      <v-icon
                        icon="mdi-file-multiple"
                        size="64"
                        color="primary"
                        class="mb-4"
                      ></v-icon>
                      <div class="text-h6">{{ selectedFiles.length }} items selected</div>
                      <div class="text-body-2">Select a single item to view details</div>
                    </v-card-text>
                  </template>
                  <template v-else>
                    <v-card-text class="text-center pa-12">
                      <v-icon
                        icon="mdi-file-search"
                        size="64"
                        color="grey"
                        class="mb-4"
                      ></v-icon>
                      <div class="text-h6">No file selected</div>
                      <div class="text-body-2">Select a file to view details</div>
                    </v-card-text>
                  </template>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Organization Tree -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Organization Tree</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-treeview
                  v-model:selected="selectedOrg"
                  :items="organization"
                  item-children="children"
                  selectable
                  return-object
                  open-all
                >
                  <template v-slot:prepend="{ item }">
                    <v-avatar :image="item.avatar" size="32"></v-avatar>
                  </template>

                  <template v-slot:label="{ item }">
                    <div>
                      <div class="text-subtitle-2">{{ item.name }}</div>
                      <div class="text-caption">{{ item.role }}</div>
                    </div>
                  </template>

                  <template v-slot:append="{ item }">
                    <v-chip
                      :color="item.status === 'Active' ? 'success' : 'error'"
                      size="x-small"
                    >
                      {{ item.status }}
                    </v-chip>
                  </template>
                </v-treeview>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined">
                  <v-card-text>
                    <div class="d-flex justify-space-between mb-4">
                      <div class="text-h6">Department Statistics</div>
                      <v-btn-toggle
                        v-model="statsPeriod"
                        mandatory
                        density="comfortable"
                      >
                        <v-btn value="week">Week</v-btn>
                        <v-btn value="month">Month</v-btn>
                        <v-btn value="year">Year</v-btn>
                      </v-btn-toggle>
                    </div>

                    <v-list>
                      <v-list-item
                        v-for="(stat, index) in departmentStats"
                        :key="index"
                      >
                        <template v-slot:prepend>
                          <v-icon :icon="stat.icon" :color="stat.color"></v-icon>
                        </template>

                        <v-list-item-title>{{ stat.label }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-sparkline
                            :value="stat.data"
                            :color="stat.color"
                            :line-width="2"
                            :height="30"
                            padding="4"
                          ></v-sparkline>
                        </v-list-item-subtitle>

                        <template v-slot:append>
                          <div class="text-right">
                            <div class="text-h6">{{ stat.value }}</div>
                            <div
                              :class="[
                                'text-caption',
                                stat.trend > 0 ? 'text-success' : 'text-error'
                              ]"
                            >
                              {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                            </div>
                          </div>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- New Folder Dialog -->
    <v-dialog v-model="folderDialog" max-width="500px">
      <v-card>
        <v-card-title>New Folder</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newFolderName"
            label="Folder Name"
            :rules="[v => !!v || 'Name is required']"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="folderDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="createFolder"
            :disabled="!newFolderName"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiTreeView',

  data() {
    return {
      selected: [],
      selectedWithIcons: [],
      selectedFiles: [],
      selectedOrg: [],
      search: '',
      folderDialog: false,
      newFolderName: '',
      statsPeriod: 'month',
      items: [
        {
          id: 1,
          name: 'Applications',
          children: [
            { id: 2, name: 'Calendar' },
            { id: 3, name: 'Chrome' },
            { id: 4, name: 'Webstorm' }
          ]
        },
        {
          id: 5,
          name: 'Documents',
          children: [
            { id: 6, name: 'vuetify' },
            { id: 7, name: 'material' },
            { id: 8, name: 'components' }
          ]
        }
      ],
      itemsWithIcons: [
        {
          id: 1,
          name: 'Projects',
          icon: 'mdi-folder',
          color: 'warning',
          children: [
            {
              id: 2,
              name: 'Frontend',
              icon: 'mdi-language-javascript',
              color: 'primary'
            },
            {
              id: 3,
              name: 'Backend',
              icon: 'mdi-database',
              color: 'success'
            }
          ]
        }
      ],
      files: [
        {
          id: 1,
          name: 'Projects',
          type: 'folder',
          modified: '2024-02-08',
          created: '2024-01-01',
          children: [
            {
              id: 2,
              name: 'report.pdf',
              type: 'pdf',
              size: '2.5 MB',
              modified: '2024-02-07',
              created: '2024-02-07',
              shared: [
                { id: 1, name: 'John Doe', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
                { id: 2, name: 'Jane Smith', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' }
              ]
            }
          ]
        }
      ],
      fileActions: [
        { title: 'Download', icon: 'mdi-download' },
        { title: 'Share', icon: 'mdi-share-variant' },
        { title: 'Delete', icon: 'mdi-delete' }
      ],
      organization: [
        {
          id: 1,
          name: 'John Doe',
          role: 'CEO',
          status: 'Active',
          avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
          children: [
            {
              id: 2,
              name: 'Jane Smith',
              role: 'CTO',
              status: 'Active',
              avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
            }
          ]
        }
      ],
      departmentStats: [
        {
          label: 'Productivity',
          icon: 'mdi-chart-line',
          color: 'primary',
          value: '87%',
          trend: 12,
          data: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
        },
        {
          label: 'Efficiency',
          icon: 'mdi-clock-fast',
          color: 'success',
          value: '92%',
          trend: 8,
          data: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
        }
      ]
    }
  },

  methods: {
    getFileIcon(item: any): string {
      if (item.type === 'folder') return 'mdi-folder'
      if (item.type === 'pdf') return 'mdi-file-pdf'
      return 'mdi-file'
    },

    getFileColor(item: any): string {
      if (item.type === 'folder') return 'warning'
      if (item.type === 'pdf') return 'error'
      return 'primary'
    },

    handleFileAction(item: any, action: any) {
      console.log(`${action.title} action on:`, item.name)
    },

    addNewFolder() {
      this.folderDialog = true
    },

    createFolder() {
      if (this.newFolderName) {
        const newFolder = {
          id: Date.now(),
          name: this.newFolderName,
          type: 'folder',
          modified: new Date().toISOString().split('T')[0],
          created: new Date().toISOString().split('T')[0],
          children: []
        }
        this.files.push(newFolder)
        this.folderDialog = false
        this.newFolderName = ''
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

.gap-2 {
  gap: 0.5rem;
}

.file-preview {
  height: 100%;
  min-height: 400px;
}
</style>