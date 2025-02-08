<template>
  <div class="error-page">
    <div class="container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <router-link to="/" class="back-link">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorPage'
})
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 6rem;
    margin: 0;
    color: var(--v-primary-base);
  }

  h2 {
    font-size: 2rem;
    margin: 20px 0;
  }

  p {
    margin: 20px 0;
    color: rgba(0, 0, 0, 0.6);
  }

  .back-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--v-primary-base);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--v-primary-darken1);
    }
  }
}
</style>