<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">Home</router-link>
      </li>
      <li class="breadcrumb-separator">/</li>
      <li class="breadcrumb-item">
        <a href="/#categories" class="breadcrumb-link">{{ parentCategory }}</a>
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

const categoryInfo = computed(() => getCategoryInfo(props.categoryId));
const parentCategory = computed(() => categoryInfo.value?.parentCategory || 'Products');
const categoryName = computed(() => categoryInfo.value?.displayName || props.categoryId);
const parentCategorySlug = computed(() => {
  // 将父类目名转为URL锚点 (Automotive -> automotive, Electronics -> electronics)
  return parentCategory.value.toLowerCase();
});
</script>

<style scoped>
.breadcrumb {
  background: #f8f6f3;
  padding: 15px 0;
  border-bottom: 1px solid #e8e8e8;
}

.breadcrumb-list {
  max-width: 1200px;
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
