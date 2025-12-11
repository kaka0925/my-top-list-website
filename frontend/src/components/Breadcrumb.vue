<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">Home</router-link>
      </li>
      <li class="breadcrumb-separator">/</li>
      <li class="breadcrumb-item">
        <router-link :to="`/category/${parentCategorySlug}`" class="breadcrumb-link">{{ parentCategory }}</router-link>
      </li>
      <li class="breadcrumb-separator">/</li>
      <li class="breadcrumb-item breadcrumb-current">
        <span class="breadcrumb-text">{{ categoryName }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { getCategoryInfo } from '../config/categories.js';

const props = defineProps({
  categoryId: {
    type: String,
    required: true
  }
});

// 父类目名称到URL slug的映射
const PARENT_CATEGORY_SLUG_MAP = {
  'Automotive': 'automobile',
  'Electronics': 'electronics',
  'Home & Kitchen': 'home-kitchen',
  'Sports & Outdoors': 'sports-outdoors',
  'Health & Beauty': 'health-beauty',
  'Tools & Home': 'tools-home'
};

const categoryInfo = computed(() => getCategoryInfo(props.categoryId));
const parentCategory = computed(() => categoryInfo.value?.parentCategory || 'Products');
const categoryName = computed(() => categoryInfo.value?.displayName || props.categoryId);
const parentCategorySlug = computed(() => {
  // 使用映射表将父类目名转为正确的URL slug
  return PARENT_CATEGORY_SLUG_MAP[parentCategory.value] || parentCategory.value.toLowerCase();
});
</script>

<style scoped>
.breadcrumb {
  background: transparent;
  padding: 8px 0;
}

.breadcrumb-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
  gap: 8px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #6b9bd1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  padding: 4px 8px;
  border-radius: 4px;
}

.breadcrumb-link:hover {
  color: #5a8bc2;
  background: rgba(107, 155, 209, 0.1);
}

.breadcrumb-text {
  color: #666;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
}

.breadcrumb-current .breadcrumb-text {
  color: #333;
  font-weight: 600;
}

.breadcrumb-separator {
  color: #999;
  font-size: 14px;
  user-select: none;
}

@media (max-width: 768px) {
  .breadcrumb {
    padding: 12px 0;
  }

  .breadcrumb-link,
  .breadcrumb-text {
    font-size: 13px;
  }
}
</style>
