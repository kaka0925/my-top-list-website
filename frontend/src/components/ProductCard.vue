<template>
  <div class="product-card" :data-product-id="product.id">
    <div class="product-rank">{{ product.rank }}</div>

    <div class="compare-checkbox">
      <input
        type="checkbox"
        :id="'compare-' + product.id"
        :checked="isSelected(product.id)"
        @change="toggleProduct(product)"
      >
    </div>

    <div class="product-content">
      <div class="product-image-wrapper">
        <!-- Badge above image -->
        <div v-if="product.badge" class="ribbon-badge">
          {{ product.badge }}
        </div>
        <div class="product-image">
          <img :src="product.image" :alt="product.title" class="product-image-main">
        </div>
      </div>

      <div class="product-info">
        <h3>{{ product.title }}</h3>

        <!-- Features with icons -->
        <div class="product-features" v-if="productFeatures.length > 0">
          <div class="feature-item" v-for="(feature, index) in productFeatures" :key="index">
            <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="22px" height="22px">
              <circle cx="64" cy="64" r="39" fill="#e3f2fd"/>
              <path fill="none" stroke="#1e88e5" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10" d="M42 69L55.55 81 86 46"/>
            </svg>
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>

      <div class="product-action">
        <div class="expert-score">
          <div class="expert-score-value">{{ product.expertScore }}</div>

          <!-- Star Rating -->
          <div class="stars-rating">
            <span class="stars">{{ getStars(product.rating) }}</span>
          </div>

          <!-- Reviews Count -->
          <div class="reviews-count">{{ product.reviews.toLocaleString() }} reviews</div>
        </div>
        <div class="product-price">{{ product.price }}</div>
        <a :href="product.amazonLink" class="buy-button" target="_blank" rel="noopener">
          Check Price
        </a>
        <div class="amazon-badge">
          <span>Available at Amazon</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCompare } from '../composables/useCompare.js';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { isSelected, toggleProduct } = useCompare();

// Safely get features from either 'features' or 'description' field
const productFeatures = computed(() => {
  const features = props.product.features || props.product.description || [];
  return Array.isArray(features) ? features.slice(0, 3) : [];
});

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};

const formatSales = (sales) => {
  if (sales >= 10000) return '10K+';
  if (sales >= 5000) return '5K+';
  if (sales >= 1000) return '1K+';
  return sales.toLocaleString();
};
</script>

<style scoped>
/* Product Card styles are in ranking-page.css */
</style>
