<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="logo">TopReviews</router-link>
        <div class="nav-links">
          <a href="/#categories">Categories</a>
          <a href="/#about">About us</a>
        </div>
      </div>
    </nav>

    <!-- Rankings in this Category -->
    <div class="container">
      <section class="rankings-in-category">
        <h2 class="section-title">{{ categoryInfo.title }} Rankings</h2>
        <div class="rankings-grid">
          <router-link
            v-for="ranking in categoryRankings"
            :key="ranking.id"
            :to="ranking.url"
            class="ranking-card"
          >
            <div class="ranking-image">
              <img :src="ranking.topProductImage" :alt="ranking.title">
            </div>
            <div class="ranking-info">
              <h3>{{ ranking.title }}</h3>
              <p>{{ ranking.description }}</p>
              <div class="ranking-meta">
                <span class="product-count">Top {{ ranking.productCount }} Products</span>
                <span class="arrow">→</span>
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- All Categories -->
      <section class="all-categories-section">
        <h2 class="section-title">Browse All Categories</h2>
        <div class="categories-grid-browse">
          <div
            v-for="cat in allCategories"
            :key="cat.id"
            class="category-item"
            @click="navigateToCategory(cat.slug)"
          >
            <div class="category-icon" v-html="cat.icon"></div>
            <div class="category-name">{{ cat.name }}</div>
          </div>
        </div>
      </section>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const categorySlug = computed(() => route.params.category);

// 分类数据
const categories = {
  automobile: {
    title: 'Automobile',
    description: 'Essential automotive products and accessories for your vehicle',
    rankings: [
      {
        id: 'jump-starter',
        title: 'Jump Starters',
        description: 'Top rated portable jump starters 2025',
        url: '/jump-starter',
        productCount: 10,
        topProductImage: 'https://via.placeholder.com/200'
      },
      {
        id: 'tire-inflator',
        title: 'Tire Inflators',
        description: 'Best portable tire inflators for your car',
        url: '/tire-inflator',
        productCount: 10,
        topProductImage: 'https://via.placeholder.com/200'
      },
      {
        id: 'dash-cam',
        title: 'Dash Cameras',
        description: 'Professional dash cameras for safety',
        url: '/dash-cam',
        productCount: 10,
        topProductImage: 'https://via.placeholder.com/200'
      }
    ]
  },
  electronics: {
    title: 'Electronics',
    description: 'Top-rated electronic devices and accessories',
    rankings: [
      {
        id: 'air-duster',
        title: 'Air Dusters',
        description: 'Powerful electric air dusters for cleaning',
        url: '/air-duster',
        productCount: 10,
        topProductImage: 'https://via.placeholder.com/200'
      }
    ]
  }
};

const categoryInfo = computed(() => {
  return categories[categorySlug.value] || {
    title: 'Category Not Found',
    description: '',
    rankings: []
  };
});

const categoryRankings = computed(() => {
  return categoryInfo.value.rankings || [];
});

// 所有分类
const allCategories = ref([
  {
    id: 1,
    name: 'Automobile',
    slug: 'automobile',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L3 15L5 17M19 13L21 15L19 17M9 5L7 9H17L15 5M4 9H20L18 14V19H6V14L4 9Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8" cy="18" r="1.5" stroke-width="1.5"/>
            <circle cx="16" cy="18" r="1.5" stroke-width="1.5"/>
          </svg>`
  },
  {
    id: 2,
    name: 'Electronics',
    slug: 'electronics',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="12" rx="2" stroke-width="1.5"/>
            <path d="M7 20H17M12 16V20" stroke-width="1.5" stroke-linecap="round"/>
          </svg>`
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke-width="1.5"/>
            <path d="M12 3C8.5 3 6 8 6 12C6 16 8.5 21 12 21M12 3C15.5 3 18 8 18 12C18 16 15.5 21 12 21M12 3V21M3 12H21" stroke-width="1.5" stroke-linecap="round"/>
          </svg>`
  },
  {
    id: 5,
    name: 'Health & Beauty',
    slug: 'health-beauty',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.99872 7.05 2.99872C5.59096 2.99872 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.2225 22.4518 8.5C22.4518 7.7775 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`
  },
  {
    id: 6,
    name: 'Tools & Home',
    slug: 'tools-home',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 6.3C15.0833 5.91667 15.6167 5.725 16.3 5.725C17.6833 5.725 18.7833 6.825 18.7833 8.20833C18.7833 8.89167 18.5917 9.425 18.2083 9.80833L8.29167 19.725L2.29167 21.7083L4.275 15.7083L14.7 6.3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 8.5L15.5 11.5" stroke-width="1.5" stroke-linecap="round"/>
          </svg>`
  }
]);

const navigateToCategory = (slug) => {
  router.push(`/category/${slug}`);
};
</script>

<style scoped>
/* Container override for compact layout */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px 0;
}

/* Rankings Grid */
.rankings-in-category {
  margin-bottom: 50px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.rankings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.ranking-card {
  background: white;
  border: 1px solid #e8e6e1;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.ranking-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  border-color: #6b9bd1;
}

.ranking-image {
  height: 140px;
  background: #f8f6f3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ranking-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ranking-info {
  padding: 16px;
}

.ranking-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.ranking-info p {
  font-size: 13px;
  color: #5c5c5c;
  margin-bottom: 12px;
  line-height: 1.4;
}

.ranking-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-count {
  font-size: 12px;
  color: #6b9bd1;
  font-weight: 600;
}

.arrow {
  font-size: 18px;
  color: #6b9bd1;
  transition: transform 0.3s;
}

.ranking-card:hover .arrow {
  transform: translateX(4px);
}

/* All Categories Section */
.all-categories-section {
  background: white;
  padding: 40px 20px;
  margin: 0 -20px 40px -20px;
  border-top: 1px solid #e8e6e1;
  border-bottom: 1px solid #e8e6e1;
}

.all-categories-section .section-title {
  font-size: 18px;
  margin-bottom: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 30px 15px 0;
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .rankings-in-category {
    margin-bottom: 40px;
  }

  .rankings-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .ranking-card {
    border-radius: 8px;
  }

  .ranking-image {
    height: 120px;
  }

  .ranking-info {
    padding: 14px;
  }

  .ranking-info h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .ranking-info p {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .product-count {
    font-size: 11px;
  }

  .arrow {
    font-size: 16px;
  }

  .all-categories-section {
    padding: 30px 15px;
    margin: 0 -15px 30px -15px;
  }

  .all-categories-section .section-title {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .categories-grid-browse {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .category-item {
    padding: 24px 16px;
  }

  .category-icon {
    height: 36px;
    margin-bottom: 12px;
  }

  .category-icon svg {
    width: 34px;
    height: 34px;
  }

  .category-name {
    font-size: 11px;
    letter-spacing: 0.3px;
  }
}
</style>
