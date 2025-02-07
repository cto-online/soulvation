<script setup lang="ts">
import { ref } from 'vue';

const snackbar = ref(true);
const timeout = ref(2000);
</script>

<template>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="success"
        location="top"
    >
        Welcome to your dashboard!
    </v-snackbar>
</template>