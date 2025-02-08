<template>
  <v-container fluid class="py-8">
    <v-row>
      <!-- Basic Editor -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Basic Editor</v-card-title>
          <v-card-text>
            <div class="editor-container">
              <div class="editor-toolbar">
                <v-btn-group>
                  <v-btn
                    v-for="(action, index) in basicActions"
                    :key="index"
                    :icon="action.icon"
                    size="small"
                    variant="text"
                    @click="executeAction(action.command)"
                  ></v-btn>
                </v-btn-group>
              </div>
              <div
                ref="basicEditor"
                class="editor-content"
                contenteditable="true"
                @input="handleBasicInput"
              ></div>
            </div>
            <div class="mt-4">
              <v-btn
                color="primary"
                @click="saveBasicContent"
                :loading="basic.loading"
              >
                Save Content
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Advanced Editor -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Advanced Editor</v-card-title>
          <v-card-text>
            <div class="editor-container">
              <div class="editor-toolbar">
                <v-row>
                  <v-col cols="12">
                    <v-btn-group class="mb-2">
                      <v-btn
                        v-for="(action, index) in formatActions"
                        :key="index"
                        :icon="action.icon"
                        size="small"
                        variant="text"
                        @click="executeAction(action.command)"
                      ></v-btn>
                    </v-btn-group>
                  </v-col>
                  <v-col cols="12">
                    <v-btn-group>
                      <v-select
                        v-model="advanced.fontSize"
                        :items="fontSizes"
                        label="Size"
                        density="compact"
                        hide-details
                        class="font-select"
                        @update:model-value="changeFontSize"
                      ></v-select>
                      <v-select
                        v-model="advanced.fontFamily"
                        :items="fontFamilies"
                        label="Font"
                        density="compact"
                        hide-details
                        class="font-select"
                        @update:model-value="changeFontFamily"
                      ></v-select>
                      <v-color-picker
                        v-model="advanced.color"
                        mode="hex"
                        hide-inputs
                        hide-canvas
                        @update:model-value="changeColor"
                      ></v-color-picker>
                    </v-btn-group>
                  </v-col>
                </v-row>
              </div>
              <div
                ref="advancedEditor"
                class="editor-content"
                contenteditable="true"
                @input="handleAdvancedInput"
              ></div>
            </div>
            <div class="mt-4 d-flex gap-4">
              <v-btn
                color="primary"
                @click="saveAdvancedContent"
                :loading="advanced.loading"
              >
                Save Content
              </v-btn>
              <v-btn
                color="secondary"
                variant="outlined"
                @click="clearAdvancedContent"
              >
                Clear
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- HTML Preview -->
      <v-col cols="12">
        <v-card>
          <v-card-title>HTML Preview</v-card-title>
          <v-card-text>
            <v-tabs v-model="preview.tab">
              <v-tab value="basic">Basic Editor</v-tab>
              <v-tab value="advanced">Advanced Editor</v-tab>
            </v-tabs>
            <v-window v-model="preview.tab">
              <v-window-item value="basic">
                <pre class="preview-code">{{ basic.html }}</pre>
              </v-window-item>
              <v-window-item value="advanced">
                <pre class="preview-code">{{ advanced.html }}</pre>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Editor',

  data() {
    return {
      basicActions: [
        { icon: 'mdi-format-bold', command: 'bold' },
        { icon: 'mdi-format-italic', command: 'italic' },
        { icon: 'mdi-format-underline', command: 'underline' },
        { icon: 'mdi-format-list-bulleted', command: 'insertUnorderedList' },
        { icon: 'mdi-format-list-numbered', command: 'insertOrderedList' }
      ],
      formatActions: [
        { icon: 'mdi-format-bold', command: 'bold' },
        { icon: 'mdi-format-italic', command: 'italic' },
        { icon: 'mdi-format-underline', command: 'underline' },
        { icon: 'mdi-format-list-bulleted', command: 'insertUnorderedList' },
        { icon: 'mdi-format-list-numbered', command: 'insertOrderedList' },
        { icon: 'mdi-format-align-left', command: 'justifyLeft' },
        { icon: 'mdi-format-align-center', command: 'justifyCenter' },
        { icon: 'mdi-format-align-right', command: 'justifyRight' },
        { icon: 'mdi-link', command: 'createLink' }
      ],
      fontSizes: ['8pt', '10pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt'],
      fontFamilies: ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'],
      basic: {
        html: '',
        loading: false
      },
      advanced: {
        html: '',
        loading: false,
        fontSize: '12pt',
        fontFamily: 'Arial',
        color: '#000000'
      },
      preview: {
        tab: 'basic'
      }
    }
  },

  methods: {
    executeAction(command: string) {
      if (command === 'createLink') {
        const url = prompt('Enter URL:')
        if (url) {
          document.execCommand(command, false, url)
        }
      } else {
        document.execCommand(command, false)
      }
    },

    handleBasicInput(event: Event) {
      const target = event.target as HTMLDivElement
      this.basic.html = target.innerHTML
    },

    handleAdvancedInput(event: Event) {
      const target = event.target as HTMLDivElement
      this.advanced.html = target.innerHTML
    },

    changeFontSize() {
      document.execCommand('fontSize', false, '7')
      const selection = window.getSelection()
      if (selection && selection.focusNode) {
        const span = (selection.focusNode.parentElement as HTMLElement)
        if (span) {
          span.style.fontSize = this.advanced.fontSize
        }
      }
    },

    changeFontFamily() {
      document.execCommand('fontName', false, this.advanced.fontFamily)
    },

    changeColor() {
      document.execCommand('foreColor', false, this.advanced.color)
    },

    async saveBasicContent() {
      this.basic.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Basic content saved:', this.basic.html)
      } finally {
        this.basic.loading = false
      }
    },

    async saveAdvancedContent() {
      this.advanced.loading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Advanced content saved:', this.advanced.html)
      } finally {
        this.advanced.loading = false
      }
    },

    clearAdvancedContent() {
      if (this.$refs.advancedEditor) {
        (this.$refs.advancedEditor as HTMLDivElement).innerHTML = ''
        this.advanced.html = ''
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-container {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.editor-toolbar {
  padding: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #f5f5f5;

  .font-select {
    width: 120px;
    margin-right: 8px;
  }
}

.editor-content {
  min-height: 200px;
  padding: 1rem;
  outline: none;
  overflow-y: auto;
}

.preview-code {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.gap-4 {
  gap: 1rem;
}
</style>