<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Breadcrumb Navigation -->
    <Breadcrumb :categoryId="props.category" />

    <!-- Promotion Modal -->
    <ProductPromotionModal
      v-if="showModal && products.length > 0"
      :product="products[0]"
      :show="showModal"
      @close="showModal = false"
    />

    <!-- Trust Sidebar (Fixed on Right) -->
    <aside class="trust-sidebar-fixed">
      <div class="menu-item">
        <div class="menu-item-header">
          <div class="header-text">Trusted by</div>
        </div>
        <div class="menu-item-content">
          <div class="trust-text">Helping you make confident decisions</div>
          <div class="image-container">
            <img class="trust-image" src="/ssl-trust-logo.png" alt="ssl trust logo" loading="lazy">
          </div>
        </div>
      </div>
    </aside>

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
        <div class="comparison-scroll-container">
          <div class="comparison-slider">
            <!-- Specs Labels Column (sticky) -->
            <div class="comparison-column specs-column">
              <div class="product-header-cell">
                <div class="spec-label-header">Compare</div>
              </div>
              <div
                class="spec-cell"
                v-for="spec in pageData.comparisonTable.specs"
                :key="spec.key"
              >
                <strong>{{ spec.label }}</strong>
              </div>
            </div>

            <!-- Product Columns -->
            <div
              class="comparison-column product-column"
              v-for="product in pageData.comparisonTable.products"
              :key="product.id"
              @click="navigateToAmazon(product.amazonLink)"
            >
              <!-- Product Header with Title, Image, Brand, Check Price Button -->
              <div class="product-header-cell">
                <div class="product-title">{{ product.title }}</div>
                <img :src="product.image" :alt="product.title" class="product-image" />
                <div class="product-brand">{{ product.brand }}</div>
                <a :href="product.amazonLink" class="check-price-link" target="_blank" rel="noopener">
                  <span class="check-price-large">Check Price</span>
                  <span class="check-price-small">on Amazon</span>
                </a>
              </div>

              <!-- Product Specs -->
              <div
                class="spec-cell"
                v-for="spec in pageData.comparisonTable.specs"
                :key="spec.key"
              >
                {{ product[spec.key] }}
              </div>
            </div>
          </div>
        </div>
        <div class="comparison-hint">
          👉 Scroll horizontally to compare more products • Click any column to view on Amazon
        </div>
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
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Navbar from '../components/Navbar.vue';
import ProductCard from '../components/ProductCard.vue';
import CompareBar from '../components/CompareBar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import ProductPromotionModal from '../components/ProductPromotionModal.vue';
import Footer from '../components/Footer.vue';
import { useProducts } from '../composables/useProducts.js';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const { products, pageData, loading, error, fetchProducts } = useProducts(props.category);
const activeFaq = ref(null);
const showModal = ref(false);

// Show modal when products are loaded
watch(products, (newProducts) => {
  if (newProducts && newProducts.length > 0 && !loading.value) {
    // Show modal after products are loaded
    showModal.value = true;
  }
}, { immediate: true });

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const navigateToAmazon = (link) => {
  if (link && link !== '#') {
    window.open(link, '_blank');
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
@import '../assets/css/ranking-page.css';
</style>
