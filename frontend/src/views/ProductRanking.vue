<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Breadcrumb Navigation -->
    <Breadcrumb :categoryId="props.category" />

    <!-- Main Container -->
    <div class="container">
      <!-- Page Header -->
      <div class="page-header" v-if="pageData">
        <h1>{{ pageData.heading }}</h1>
        <p class="subtitle">{{ pageData.subtitle }}</p>
        <p class="last-updated">Last Updated: {{ pageData.lastUpdated }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" style="text-align: center; padding: 40px;">
        <p>Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" style="text-align: center; padding: 40px; color: #f44336;">
        <p>Error: {{ error }}</p>
      </div>

      <!-- Products Listing -->
      <div class="rankings-section" v-else>
        <div v-if="products.length === 0" style="text-align: center; padding: 40px;">
          <p>No products found. Debug info:</p>
          <p>Loading: {{ loading }}</p>
          <p>Error: {{ error }}</p>
          <p>Products count: {{ products.length }}</p>
          <p>Page data: {{ pageData ? 'exists' : 'null' }}</p>
        </div>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Comparison Table -->
      <div class="comparison-section" v-if="pageData?.comparisonTable">
        <h2>{{ pageData.comparisonTable.title }}</h2>
        <table class="comparison-table">
          <thead>
            <tr>
              <th v-for="header in pageData.comparisonTable.headers" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in pageData.comparisonTable.rows" :key="index">
              <td>{{ row.product }}</td>
              <td>{{ row.peakAmps }}</td>
              <td>{{ row.batteryCapacity }}</td>
              <td>{{ row.airCompressor }}</td>
              <td>{{ row.fastCharge }}</td>
              <td>{{ row.price }}</td>
              <td>{{ row.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Buying Guide Section -->
      <div class="guide-section" v-if="pageData?.buyingGuide">
        <h2>{{ pageData.buyingGuide.title }}</h2>
        <div v-for="(section, index) in pageData.buyingGuide.sections" :key="index">
          <h3>{{ section.title }}</h3>
          <p>{{ section.content }}</p>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section" v-if="pageData?.faqs">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-item" v-for="(faq, index) in pageData.faqs" :key="index" :class="{ active: activeFaq === index }">
          <div class="faq-question" @click="toggleFaq(index)">
            <span>{{ faq.question }}</span>
            <span class="faq-toggle">{{ activeFaq === index ? '−' : '+' }}</span>
          </div>
          <div class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <!-- Compare Bar -->
      <CompareBar />
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>About TopReviews</h3>
          <p>We provide honest, expert reviews and buying guides to help you make informed purchasing decisions.</p>
        </div>
        <div class="footer-section">
          <h3>Legal</h3>
          <ul class="footer-links">
            <li><a href="#terms">Terms and Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#ccpa">CCPA Privacy Notice</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Support</h3>
          <ul class="footer-links">
            <li><a href="#data-request">Data Subject Request Form</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 TopReviews. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';
import ProductCard from '../components/ProductCard.vue';
import CompareBar from '../components/CompareBar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import { useProducts } from '../composables/useProducts.js';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const { products, pageData, loading, error, fetchProducts } = useProducts(props.category);
const activeFaq = ref(null);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
@import '../assets/css/ranking-page.css';
</style>
