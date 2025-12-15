<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Container -->
    <div class="container">
      <div class="legal-page" v-if="pageContent">
        <h1>{{ pageContent.title }}</h1>
        <p class="last-updated">Last Updated: {{ pageContent.lastUpdated }}</p>

        <div class="legal-content">
          <p class="intro">{{ pageContent.intro }}</p>

          <section v-for="(section, index) in pageContent.sections" :key="index" class="legal-section">
            <h2>{{ section.title }}</h2>
            <p v-if="section.content">{{ section.content }}</p>
            <ul v-if="section.list">
              <li v-for="(item, i) in section.list" :key="i">{{ item }}</li>
            </ul>
          </section>

          <section class="legal-section contact">
            <p>For questions, please contact: <a :href="'mailto:' + pageContent.contact">{{ pageContent.contact }}</a></p>
          </section>
        </div>
      </div>

      <div v-else class="legal-page">
        <h1>Page Not Found</h1>
        <p>The requested legal document could not be found.</p>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { legalContent } from '../config/footer.js';

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});

// Get page content based on type prop
const pageContent = computed(() => {
  return legalContent[props.type];
});
</script>

<style scoped>
.legal-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.legal-page h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
  line-height: 1.3;
}

.last-updated {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.legal-content {
  line-height: 1.8;
}

.intro {
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #1e88e5;
}

.legal-section {
  margin-bottom: 35px;
}

.legal-section h2 {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
  margin-top: 10px;
}

.legal-section p {
  font-size: 15px;
  color: #333;
  margin-bottom: 15px;
}

.legal-section ul {
  margin-left: 20px;
  margin-bottom: 15px;
}

.legal-section li {
  font-size: 15px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.7;
}

.contact {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.contact a {
  color: #1e88e5;
  text-decoration: none;
  font-weight: 600;
}

.contact a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .legal-page {
    padding: 30px 15px;
  }

  .legal-page h1 {
    font-size: 26px;
  }

  .legal-section h2 {
    font-size: 20px;
  }

  .legal-section p,
  .legal-section li {
    font-size: 14px;
  }
}
</style>
