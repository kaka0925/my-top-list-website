<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-content">
        <h1>Search. Compare. Choose.</h1>
        <p>We analyze the top products in every category so you can compare what truly matters and choose the best for you.</p>
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            @input="handleSearch"
            @keypress.enter="performSearch"
            placeholder="Search for products..."
            autocomplete="off"
          >
          <button @click="performSearch">Search</button>
          <div class="search-suggestions" :class="{ active: showSuggestions }">
            <div
              v-for="item in searchResults"
              :key="item.url"
              class="suggestion-item"
              @click="navigateTo(item.url)"
            >
              <div class="suggestion-title">{{ item.title }}</div>
              <div class="suggestion-category">{{ item.category }}</div>
            </div>
            <div v-if="searchQuery && searchResults.length === 0" class="suggestion-item">
              <div class="suggestion-title">No results found</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <div class="container">
      <section class="popular-section">
        <h2 class="section-title">Popular Rankings</h2>
        <div class="popular-grid">
          <router-link to="/jump-starter" class="category-card">
            <img class="category-card-bg" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23e8e6e1' width='400' height='300'/></svg>" alt="Jump Starters">
            <div class="category-card-content">
              <div class="category-card-title">Jump Starters</div>
              <div class="category-card-desc">Top rated portable jump starters 2025</div>
            </div>
          </router-link>

          <router-link to="/tire-inflator" class="category-card">
            <img class="category-card-bg" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23d4d2cd' width='400' height='300'/></svg>" alt="Tire Inflators">
            <div class="category-card-content">
              <div class="category-card-title">Tire Inflators</div>
              <div class="category-card-desc">Best portable tire inflators for your car</div>
            </div>
          </router-link>

          <router-link to="/dash-cam" class="category-card">
            <img class="category-card-bg" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23c4c2bd' width='400' height='300'/></svg>" alt="Dash Cams">
            <div class="category-card-content">
              <div class="category-card-title">Dash Cams</div>
              <div class="category-card-desc">Professional dash cameras for safety</div>
            </div>
          </router-link>

          <router-link to="/air-duster" class="category-card">
            <img class="category-card-bg" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23b4b2ad' width='400' height='300'/></svg>" alt="Air Dusters">
            <div class="category-card-content">
              <div class="category-card-title">Air Dusters</div>
              <div class="category-card-desc">Powerful electric air dusters for cleaning</div>
            </div>
          </router-link>
        </div>
      </section>
    </div>

    <!-- Categories Section -->
    <section class="categories-section" id="categories">
      <div class="container">
        <h2 class="section-title">Browse by Category</h2>
        <div class="categories-grid-browse">
          <div class="category-item" @click="navigateToCategory('automobile')">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L3 15L5 17M19 13L21 15L19 17M9 5L7 9H17L15 5M4 9H20L18 14V19H6V14L4 9Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="8" cy="18" r="1.5" stroke-width="1.5"/>
                <circle cx="16" cy="18" r="1.5" stroke-width="1.5"/>
              </svg>
            </div>
            <div class="category-name">Automobile</div>
          </div>

          <div class="category-item" @click="navigateToCategory('electronics')">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="12" rx="2" stroke-width="1.5"/>
                <path d="M7 20H17M12 16V20" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="category-name">Electronics</div>
          </div>

          <div class="category-item" @click="navigateToCategory('home-kitchen')">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22V12H15V22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="category-name">Home & Kitchen</div>
          </div>

          <div class="category-item" @click="navigateToCategory('sports-outdoors')">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke-width="1.5"/>
                <path d="M12 3C8.5 3 6 8 6 12C6 16 8.5 21 12 21M12 3C15.5 3 18 8 18 12C18 16 15.5 21 12 21M12 3V21M3 12H21" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="category-name">Sports & Outdoors</div>
          </div>

          <div class="category-item" @click="navigateToCategory('health-beauty')">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.99872 7.05 2.99872C5.59096 2.99872 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.2225 22.4518 8.5C22.4518 7.7775 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="category-name">Health & Beauty</div>
          </div>

          <div class="category-item" @click="navigateToCategory('tools-home')">
            <div class="category-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7 6.3C15.0833 5.91667 15.6167 5.725 16.3 5.725C17.6833 5.725 18.7833 6.825 18.7833 8.20833C18.7833 8.89167 18.5917 9.425 18.2083 9.80833L8.29167 19.725L2.29167 21.7083L4.275 15.7083L14.7 6.3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.5 8.5L15.5 11.5" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="category-name">Tools & Home</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer" id="about">
      <div class="footer-content">
        <div class="footer-section">
          <h3>TopReviews</h3>
          <p>Your ultimate destination for comprehensive comparisons and reviews of the top products across a wide range of categories.</p>
        </div>
        <div class="footer-section">
          <h3>Company</h3>
          <ul class="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllCategories } from '../config/categories.js';
import Navbar from '../components/Navbar.vue';

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
  }
};

const navigateTo = (url) => {
  router.push(url);
  showSuggestions.value = false;
  searchQuery.value = '';
};

const navigateToCategory = (slug) => {
  router.push(`/category/${slug}`);
};

// Close suggestions when clicking outside
const handleClickOutside = (e) => {
  if (!e.target.closest('.search-box')) {
    showSuggestions.value = false;
  }
};

// 🔐 Secret Admin Access - 快捷键：Ctrl + Shift + L
const handleKeyDown = (e) => {
  // 检测 Ctrl + Shift + L 组合键
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
    e.preventDefault(); // 防止默认行为
    console.log('🔓 Admin access granted!');
    router.push('/admin');
  }
};

// 组件挂载后添加事件监听
onMounted(() => {
  console.log('🔑 管理后台快捷键已激活：Ctrl + Shift + L');
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
/* Styles are in index.html - copied here for Vue */
</style>
