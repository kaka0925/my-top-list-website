<template>
  <div class="compare-bar" :class="{ active: compareCount > 0 }">
    <div class="compare-bar-content">
      <span>{{ compareCount }} products selected for comparison</span>
      <div style="display: flex; gap: 12px;">
        <button v-if="compareCount > 0" @click="clearAll" style="background: transparent; border: 1px solid rgba(255,255,255,0.5);">
          Clear All
        </button>
        <button v-if="canCompare" @click="showComparison">
          Compare Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompare } from '../composables/useCompare.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { compareCount, canCompare, clearAll, selectedProducts } = useCompare();

const showComparison = () => {
  // Store selected products in sessionStorage for comparison page
  sessionStorage.setItem('compareProducts', JSON.stringify(selectedProducts.value));
  router.push('/compare');
};
</script>

<style scoped>
/* Styles in ranking-page.css */
</style>
