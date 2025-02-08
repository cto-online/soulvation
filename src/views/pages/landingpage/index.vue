<template>
  <div class="landing-page">
    <div class="container">
      <header class="header">
        <h1>Welcome to Our Application</h1>
        <p class="subtitle">A modern Vue.js application with Vuetify</p>
      </header>

      <section class="features">
        <div class="feature">
          <v-icon size="48" color="primary">mdi-shield-check</v-icon>
          <h3>Secure</h3>
          <p>Built with security in mind</p>
        </div>
        <div class="feature">
          <v-icon size="48" color="primary">mdi-responsive</v-icon>
          <h3>Responsive</h3>
          <p>Works on all devices</p>
        </div>
        <div class="feature">
          <v-icon size="48" color="primary">mdi-rocket-launch</v-icon>
          <h3>Fast</h3>
          <p>Optimized for performance</p>
        </div>
      </section>

      <section class="cta">
        <router-link to="/auth/login" class="v-btn v-btn--primary">
          Get Started
        </router-link>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LandingPage'
})
</script>

<style lang="scss" scoped>
.landing-page {
  min-height: 100vh;
  padding: 40px 0;
  background: linear-gradient(135deg, var(--v-primary-lighten5) 0%, var(--v-primary-lighten4) 100%);

  .header {
    text-align: center;
    margin-bottom: 60px;

    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      color: var(--v-primary-darken1);
    }

    .subtitle {
      font-size: 1.5rem;
      color: var(--v-primary-darken2);
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 60px;

    .feature {
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h3 {
        margin: 20px 0 10px;
        color: var(--v-primary-base);
      }

      p {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .cta {
    text-align: center;

    .v-btn {
      padding: 12px 36px;
      font-size: 1.2rem;
    }
  }
}
</style>