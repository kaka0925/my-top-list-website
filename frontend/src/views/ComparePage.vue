<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Container -->
    <div class="container">
      <div class="page-header">
        <h1>Product Comparison</h1>
        <p class="subtitle">Side-by-side comparison of selected products</p>
      </div>

      <div v-if="compareProducts.length === 0" style="text-align: center; padding: 60px 20px;">
        <p style="font-size: 18px; color: #666; margin-bottom: 20px;">No products selected for comparison</p>
        <router-link to="/" class="buy-button" style="display: inline-block;">
          Go Back to Rankings
        </router-link>
      </div>

      <div v-else class="comparison-section">
        <table class="comparison-table">
          <thead>
            <tr>
              <th style="width: 200px;">Product</th>
              <th v-for="product in compareProducts" :key="product.id" style="text-align: center;">
                <img :src="product.image" :alt="product.title" style="width: 120px; height: 120px; object-fit: contain; margin: 0 auto;">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Brand & Model</strong></td>
              <td v-for="product in compareProducts" :key="product.id">
                <div class="product-brand">{{ product.brand }}</div>
                <div style="font-weight: 600; color: #000;">{{ product.title }}</div>
              </td>
            </tr>
            <tr>
              <td><strong>Expert Score</strong></td>
              <td v-for="product in compareProducts" :key="product.id">
                <span style="font-size: 24px; font-weight: 700; color: #1e88e5;">{{ product.expertScore }}/10</span>
              </td>
            </tr>
            <tr>
              <td><strong>Rating</strong></td>
              <td v-for="product in compareProducts" :key="product.id">
                <div class="stars">{{ getStars(product.rating) }}</div>
                <div style="font-size: 13px; color: #666;">{{ product.rating }} ({{ product.reviews?.toLocaleString() }} reviews)</div>
              </td>
            </tr>
            <tr>
              <td><strong>Price</strong></td>
              <td v-for="product in compareProducts" :key="product.id">
                <span style="font-size: 20px; font-weight: 700; color: #000;">{{ product.price }}</span>
              </td>
            </tr>
            <tr v-if="compareProducts[0].features">
              <td><strong>Key Features</strong></td>
              <td v-for="product in compareProducts" :key="product.id" style="vertical-align: top;">
                <ul style="list-style: none; padding: 0; text-align: left;">
                  <li v-for="(feature, idx) in product.features" :key="idx" style="margin-bottom: 8px; font-size: 13px;">
                    <span style="color: #4caf50; margin-right: 6px;">✓</span>{{ feature }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr v-if="compareProducts[0].pros">
              <td><strong>Pros</strong></td>
              <td v-for="product in compareProducts" :key="product.id" style="vertical-align: top;">
                <ul style="list-style: none; padding: 0; text-align: left;">
                  <li v-for="(pro, idx) in product.pros" :key="idx" style="margin-bottom: 6px; font-size: 13px; color: #4caf50;">
                    <span style="font-weight: bold; margin-right: 6px;">+</span>{{ pro }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr v-if="compareProducts[0].cons">
              <td><strong>Cons</strong></td>
              <td v-for="product in compareProducts" :key="product.id" style="vertical-align: top;">
                <ul style="list-style: none; padding: 0; text-align: left;">
                  <li v-for="(con, idx) in product.cons" :key="idx" style="margin-bottom: 6px; font-size: 13px; color: #f44336;">
                    <span style="font-weight: bold; margin-right: 6px;">−</span>{{ con }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td><strong>Action</strong></td>
              <td v-for="product in compareProducts" :key="product.id">
                <a :href="product.amazonLink" class="buy-button" target="_blank" rel="noopener" style="display: inline-block; margin: 10px 0;">
                  View on Amazon
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="text-align: center; margin-top: 40px;">
          <button @click="goBack" class="buy-button" style="background: #666;">
            Back to Rankings
          </button>
        </div>
      </div>
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
          </ul>
        </div>
        <div class="footer-section">
          <h3>Support</h3>
          <ul class="footer-links">
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
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';

const router = useRouter();
const compareProducts = ref([]);

onMounted(() => {
  const stored = sessionStorage.getItem('compareProducts');
  if (stored) {
    compareProducts.value = JSON.parse(stored);
  }
});

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* Compact Compare Page Styles */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

.page-header {
  background: #ffffff;
  padding: 35px 20px;
  margin: -30px -20px 30px -20px;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
}

.page-header h1 {
  font-size: 30px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;
  letter-spacing: -0.9px;
}

.page-header .subtitle {
  font-size: 15px;
  color: #666666;
  margin-bottom: 16px;
}

.back-button {
  padding: 10px 20px;
  background: #1e88e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.3s;
  text-decoration: none;
}

.back-button:hover {
  background: #1976d2;
}

.compare-container {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
}

.compare-table th,
.compare-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}

.compare-table th {
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #666666;
  background: #fafafa;
}

.compare-table td {
  font-size: 14px;
  color: #333333;
}

@media (max-width: 768px) {
  .container {
    padding: 20px 15px;
  }

  .page-header {
    padding: 25px 15px;
    margin: -20px -15px 20px -15px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .compare-container {
    padding: 20px;
  }

  .compare-table th,
  .compare-table td {
    padding: 10px;
    font-size: 12px;
  }
}
</style>
