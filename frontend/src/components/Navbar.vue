<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">TopReviews</router-link>

      <!-- Search Box -->
      <div class="nav-search-box">
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          @keypress.enter="performSearch"
          placeholder="Search products..."
          autocomplete="off"
        >
        <button @click="performSearch" class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        <div class="nav-search-suggestions" :class="{ active: showSuggestions }">
          <div
            v-for="item in searchResults"
            :key="item.url"
            class="nav-suggestion-item"
            @click="navigateTo(item.url)"
          >
            <div class="nav-suggestion-title">{{ item.title }}</div>
            <div class="nav-suggestion-category">{{ item.category }}</div>
          </div>
          <div v-if="searchQuery && searchResults.length === 0" class="nav-suggestion-item">
            <div class="nav-suggestion-title">No results found</div>
          </div>
        </div>
      </div>

      <div class="nav-links">
        <a href="/#categories">Categories</a>
        <a href="/#about">About us</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllCategories } from '../config/categories.js';

const router = useRouter();
const searchQuery = ref('');
const showSuggestions = ref(false);

// 自动从类目配置生成搜索索引
const rankings = getAllCategories().map(cat => ({
  title: cat.displayName,
  category: cat.parentCategory,
  url: cat.route,
  keywords: [
    cat.name.toLowerCase(),
    cat.displayName.toLowerCase(),
    cat.description,
    ...cat.name.toLowerCase().split(' ')
  ]
}));

const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return [];

  return rankings.filter(item => {
    return item.title.toLowerCase().includes(query) ||
           item.category.toLowerCase().includes(query) ||
           item.keywords.some(keyword => keyword.includes(query));
  });
});

const handleSearch = () => {
  showSuggestions.value = searchQuery.value.length > 0;
};

const performSearch = () => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return;

  const match = rankings.find(item => {
    return item.title.toLowerCase().includes(query) ||
           item.keywords.some(keyword => keyword.includes(query));
  });

  if (match) {
    router.push(match.url);
    showSuggestions.value = false;
    searchQuery.value = '';
  }
};

const navigateTo = (url) => {
  router.push(url);
  showSuggestions.value = false;
  searchQuery.value = '';
};

// Close suggestions when clicking outside
const handleClickOutside = (e) => {
  if (!e.target.closest('.nav-search-box')) {
    showSuggestions.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 800px; /* 原来是1200px，缩小到2/3 */
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #6b9bd1;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo:hover {
  color: #5a8bc2;
}

/* Search Box */
.nav-search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.nav-search-box input {
  width: 100%;
  padding: 10px 45px 10px 15px;
  border: 2px solid #e8e8e8;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
  background: #f8f6f3;
}

.nav-search-box input:focus {
  border-color: #6b9bd1;
  background: white;
}

.search-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #6b9bd1;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

.search-btn:hover {
  background: #5a8bc2;
}

.nav-search-suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
  z-index: 1001;
}

.nav-search-suggestions.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.nav-suggestion-item:last-child {
  border-bottom: none;
}

.nav-suggestion-item:hover {
  background: #f8f6f3;
}

.nav-suggestion-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.nav-suggestion-category {
  font-size: 12px;
  color: #999;
}

.nav-links {
  display: flex;
  gap: 25px;
  flex-shrink: 0;
}

.nav-links a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-links a:hover {
  color: #6b9bd1;
}

@media (max-width: 768px) {
  .nav-container {
    max-width: 100%;
    height: auto;
    padding: 12px 15px;
    flex-wrap: wrap;
  }

  .logo {
    font-size: 20px;
  }

  .nav-search-box {
    order: 3;
    flex: 1 1 100%;
    max-width: 100%;
    margin-top: 10px;
  }

  .nav-links {
    gap: 15px;
  }

  .nav-links a {
    font-size: 14px;
  }
}
</style>
