<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Timeline -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Timeline</v-card-title>
          <v-card-text>
            <v-timeline>
              <v-timeline-item
                v-for="(item, i) in basicItems"
                :key="i"
                :dot-color="item.color"
                size="small"
              >
                <div class="mb-4">
                  <div class="text-h6">{{ item.title }}</div>
                  <div>{{ item.text }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Timeline with Icons -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Timeline with Icons</v-card-title>
          <v-card-text>
            <v-timeline align="start">
              <v-timeline-item
                v-for="(item, i) in iconItems"
                :key="i"
                :dot-color="item.color"
                :icon="item.icon"
                size="small"
              >
                <template v-slot:opposite>
                  <div class="text-caption">{{ item.time }}</div>
                </template>
                <div class="mb-4">
                  <div class="text-h6">{{ item.title }}</div>
                  <div>{{ item.text }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Interactive Timeline -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Interactive Timeline</span>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="addEvent"
            >
              Add Event
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-timeline side="end">
              <v-timeline-item
                v-for="(event, index) in events"
                :key="index"
                :dot-color="event.color"
                :icon="event.icon"
                :size="event.size"
                :fill-dot="event.fillDot"
              >
                <template v-slot:opposite>
                  <div class="text-caption">{{ event.date }}</div>
                </template>

                <v-card>
                  <v-card-title class="text-h6">
                    {{ event.title }}
                    <v-spacer></v-spacer>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      @click="editEvent(index)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      variant="text"
                      size="small"
                      color="error"
                      @click="deleteEvent(index)"
                    ></v-btn>
                  </v-card-title>

                  <v-card-text>
                    <div>{{ event.content }}</div>
                    <div class="d-flex align-center mt-4">
                      <v-avatar
                        v-if="event.user"
                        :image="event.user.avatar"
                        size="32"
                        class="me-2"
                      ></v-avatar>
                      <div>
                        <div class="text-subtitle-2">{{ event.user?.name }}</div>
                        <div class="text-caption">{{ event.user?.role }}</div>
                      </div>
                      <v-spacer></v-spacer>
                      <v-chip
                        :color="event.color"
                        size="small"
                      >
                        {{ event.category }}
                      </v-chip>
                    </div>
                  </v-card-text>

                  <v-expand-transition>
                    <div v-if="event.hasAttachments">
                      <v-divider></v-divider>
                      <v-card-text>
                        <div class="d-flex gap-2">
                          <v-chip
                            v-for="(file, fileIndex) in event.attachments"
                            :key="fileIndex"
                            prepend-icon="mdi-file"
                            closable
                            @click:close="removeAttachment(index, fileIndex)"
                          >
                            {{ file.name }}
                          </v-chip>
                        </div>
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Project Timeline -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Project Timeline</v-card-title>
          <v-card-text>
            <v-timeline align="start">
              <v-timeline-item
                v-for="(phase, index) in projectPhases"
                :key="index"
                :dot-color="phase.color"
                :icon="phase.icon"
                :size="phase.isActive ? 'large' : 'small'"
                :fill-dot="phase.isActive"
              >
                <template v-slot:opposite>
                  <div class="text-caption">{{ phase.date }}</div>
                  <div class="text-caption">{{ phase.duration }}</div>
                </template>

                <v-card>
                  <v-card-title class="text-h6">
                    {{ phase.title }}
                    <v-spacer></v-spacer>
                    <v-chip
                      :color="phase.statusColor"
                      size="small"
                    >
                      {{ phase.status }}
                    </v-chip>
                  </v-card-title>

                  <v-card-text>
                    <div class="mb-4">{{ phase.description }}</div>
                    <v-progress-linear
                      v-if="phase.progress !== undefined"
                      :model-value="phase.progress"
                      :color="phase.color"
                      height="8"
                      rounded
                    >
                      <template v-slot:default="{ value }">
                        <strong>{{ Math.ceil(value) }}%</strong>
                      </template>
                    </v-progress-linear>

                    <div class="mt-4">
                      <div class="d-flex align-center mb-2">
                        <div class="text-subtitle-2">Team Members</div>
                        <v-spacer></v-spacer>
                        <v-btn
                          variant="text"
                          size="small"
                          prepend-icon="mdi-account-plus"
                        >
                          Add
                        </v-btn>
                      </div>
                      <v-avatar-group max="4">
                        <v-avatar
                          v-for="(member, memberIndex) in phase.team"
                          :key="memberIndex"
                          :image="member.avatar"
                          size="32"
                        >
                          <v-tooltip activator="parent" location="top">
                            {{ member.name }}
                          </v-tooltip>
                        </v-avatar>
                      </v-avatar-group>
                    </div>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Event Dialog -->
    <v-dialog v-model="eventDialog" max-width="500px">
      <v-card>
        <v-card-title>{{ editIndex === -1 ? 'New Event' : 'Edit Event' }}</v-card-title>
        <v-card-text>
          <v-form v-model="eventFormValid" @submit.prevent="saveEvent">
            <v-text-field
              v-model="editedEvent.title"
              label="Title"
              :rules="[v => !!v || 'Title is required']"
            ></v-text-field>

            <v-textarea
              v-model="editedEvent.content"
              label="Content"
              :rules="[v => !!v || 'Content is required']"
            ></v-textarea>

            <v-select
              v-model="editedEvent.category"
              :items="categories"
              label="Category"
            ></v-select>

            <v-select
              v-model="editedEvent.color"
              :items="colors"
              label="Color"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="eventDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!eventFormValid"
            @click="saveEvent"
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
  name: 'UiTimeline',

  data() {
    return {
      basicItems: [
        {
          title: 'Step 1',
          text: 'Lorem ipsum dolor sit amet',
          color: 'primary'
        },
        {
          title: 'Step 2',
          text: 'Consectetur adipiscing elit',
          color: 'success'
        },
        {
          title: 'Step 3',
          text: 'Sed do eiusmod tempor incididunt',
          color: 'info'
        }
      ],
      iconItems: [
        {
          title: 'Meeting',
          text: 'Team meeting to discuss project goals',
          time: '09:00 AM',
          color: 'primary',
          icon: 'mdi-account-group'
        },
        {
          title: 'Design Review',
          text: 'Review new design proposals',
          time: '11:30 AM',
          color: 'success',
          icon: 'mdi-palette'
        },
        {
          title: 'Development',
          text: 'Start development phase',
          time: '02:00 PM',
          color: 'info',
          icon: 'mdi-code-braces'
        }
      ],
      events: [
        {
          title: 'Project Kickoff',
          content: 'Initial meeting with stakeholders',
          date: '2024-02-08',
          category: 'Meeting',
          color: 'primary',
          icon: 'mdi-flag',
          size: 'large',
          fillDot: true,
          user: {
            name: 'John Doe',
            role: 'Project Manager',
            avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
          },
          hasAttachments: true,
          attachments: [
            { name: 'presentation.pdf', size: '2.5MB' },
            { name: 'schedule.xlsx', size: '1.2MB' }
          ]
        }
      ],
      projectPhases: [
        {
          title: 'Planning',
          description: 'Define project scope and requirements',
          date: '2024-02-01',
          duration: '2 weeks',
          status: 'Completed',
          statusColor: 'success',
          progress: 100,
          color: 'primary',
          icon: 'mdi-clipboard-check',
          isActive: false,
          team: [
            { name: 'John Doe', avatar: 'https://cdn.vuetifyjs.com/images/john.jpg' },
            { name: 'Jane Smith', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' }
          ]
        },
        {
          title: 'Development',
          description: 'Implementation of core features',
          date: '2024-02-15',
          duration: '4 weeks',
          status: 'In Progress',
          statusColor: 'warning',
          progress: 65,
          color: 'info',
          icon: 'mdi-code-braces',
          isActive: true,
          team: [
            { name: 'Bob Wilson', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
            { name: 'Alice Brown', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
            { name: 'Charlie Davis', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' }
          ]
        }
      ],
      eventDialog: false,
      eventFormValid: true,
      editIndex: -1,
      editedEvent: {
        title: '',
        content: '',
        category: '',
        color: 'primary'
      },
      categories: ['Meeting', 'Task', 'Milestone', 'Review'],
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
    }
  },

  methods: {
    addEvent() {
      this.editIndex = -1
      this.editedEvent = {
        title: '',
        content: '',
        category: 'Task',
        color: 'primary'
      }
      this.eventDialog = true
    },

    editEvent(index: number) {
      this.editIndex = index
      this.editedEvent = { ...this.events[index] }
      this.eventDialog = true
    },

    deleteEvent(index: number) {
      this.events.splice(index, 1)
    },

    saveEvent() {
      if (this.eventFormValid) {
        const event = {
          ...this.editedEvent,
          date: new Date().toISOString().split('T')[0],
          icon: 'mdi-calendar',
          size: 'small',
          fillDot: false,
          user: {
            name: 'John Doe',
            role: 'Project Manager',
            avatar: 'https://cdn.vuetifyjs.com/images/john.jpg'
          }
        }

        if (this.editIndex === -1) {
          this.events.push(event)
        } else {
          Object.assign(this.events[this.editIndex], event)
        }

        this.eventDialog = false
      }
    },

    removeAttachment(eventIndex: number, attachmentIndex: number) {
      this.events[eventIndex].attachments.splice(attachmentIndex, 1)
      if (this.events[eventIndex].attachments.length === 0) {
        this.events[eventIndex].hasAttachments = false
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
</style>