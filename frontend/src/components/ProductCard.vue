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
      <div class="product-image">
        <img :src="product.image" :alt="product.title">
      </div>

      <div class="product-info">
        <div class="product-brand">{{ product.brand }}</div>
        <h3>{{ product.title }}</h3>
        <div class="product-rating">
          <span class="stars">{{ getStars(product.rating) }}</span>
          <span class="rating-text">{{ product.rating }} ({{ product.reviews.toLocaleString() }} reviews)</span>
        </div>

        <div class="product-features">
          <div class="feature-item" v-for="(feature, index) in product.features.slice(0, 4)" :key="index">
            {{ feature }}
          </div>
        </div>
      </div>

      <div class="product-action">
        <div class="expert-score">
          <div class="expert-score-label">Expert Score</div>
          <div class="expert-score-value">{{ product.expertScore }}</div>
        </div>
        <div class="product-price">{{ product.price }}</div>
        <a :href="product.amazonLink" class="buy-button" target="_blank" rel="noopener">
          View on Amazon
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompare } from '../composables/useCompare.js';

defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { isSelected, toggleProduct } = useCompare();

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};
</script>

<style scoped>
/* Product Card styles are in ranking-page.css */
</style>
