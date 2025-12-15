<template>
  <footer class="footer">
    <div class="footer-content">
      <div
        v-for="(section, index) in footerConfig.sections"
        :key="index"
        class="footer-section"
      >
        <h3>{{ section.title }}</h3>

        <!-- Text content -->
        <p v-if="section.type === 'text'">{{ section.content }}</p>

        <!-- Links -->
        <ul v-if="section.type === 'links'" class="footer-links">
          <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
            <a :href="link.url">{{ link.text }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>{{ footerConfig.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { footerConfig } from '../config/footer.js';
</script>

<style scoped>
/* Footer styles are in ranking-page.css */
</style>
