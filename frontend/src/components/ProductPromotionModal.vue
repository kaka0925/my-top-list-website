<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <!-- Close Button -->
          <button class="close-btn" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Badge -->
          <div class="badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>#1 Best Seller</span>
          </div>

          <!-- Product Image -->
          <div class="product-image-container">
            <img :src="product.image" :alt="product.title" class="product-image-bg" />
            <img :src="product.image" :alt="product.title" class="product-image" />
          </div>

          <!-- Content -->
          <div class="modal-content">
            <div class="brand-tag">{{ product.brand }}</div>
            <h2 class="product-title">{{ product.title }}</h2>

            <!-- Rating -->
            <div class="rating">
              <div class="stars">★★★★★</div>
              <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reviews)</span>
            </div>

            <!-- Key Features -->
            <div class="key-features">
              <div
                v-for="(feature, index) in product.features.slice(0, 3)"
                :key="index"
                class="feature-tag"
              >
                ✓ {{ feature }}
              </div>
            </div>

            <!-- Price and CTA -->
            <div class="cta-section">
              <div class="price-container">
                <div class="price-label">Best Price</div>
                <div class="price">{{ product.price }}</div>
              </div>
              <a
                :href="product.amazonLink"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-button"
                @click="trackClick"
              >
                <span class="cta-text">Check on Amazon</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <!-- Urgency Text -->
            <div class="urgency-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Limited time offer - Don't miss out!
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const isVisible = ref(false);

// Watch for prop changes
watch(() => props.show, (newVal) => {
  if (newVal) {
    // Random delay between 3-5 seconds
    const delay = Math.random() * 2000 + 3000;
    setTimeout(() => {
      isVisible.value = true;
    }, delay);
  }
});

onMounted(() => {
  // Show modal after 3-5 seconds delay
  if (props.show) {
    const delay = Math.random() * 2000 + 3000;
    setTimeout(() => {
      isVisible.value = true;
    }, delay);
  }
  // Add Escape key listener
  document.addEventListener('keydown', handleKeydown);
  // Prevent body scroll when modal is open
  if (isVisible.value) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  // Clean up event listener
  document.removeEventListener('keydown', handleKeydown);
  // Restore body scroll
  document.body.style.overflow = '';
});

const closeModal = () => {
  isVisible.value = false;
  document.body.style.overflow = '';
  setTimeout(() => {
    emit('close');
  }, 300);
};

const trackClick = () => {
  console.log('User clicked Amazon link from promotion modal');
  closeModal();
};

// Close on Escape key
const handleKeydown = (e) => {
  if (e.key === 'Escape' && isVisible.value) {
    closeModal();
  }
};

// Watch visibility to control body scroll
watch(isVisible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: #ffffff;
  border-radius: 16px;
  max-width: 480px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  color: white;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: rotate(90deg);
}

.badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
  z-index: 10;
}

.badge svg {
  fill: white;
  stroke: none;
}

.product-image-container {
  position: relative;
  padding: 60px 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  overflow: hidden;
  background: #f5f7fa;
}

.product-image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  opacity: 0.4;
  transform: scale(1.1);
}

.product-image {
  position: relative;
  max-width: 90%;
  max-height: 240px;
  object-fit: contain;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));
  z-index: 1;
}

.modal-content {
  padding: 32px 28px 28px;
}

.brand-tag {
  display: inline-block;
  background: #e3f2fd;
  color: #1e88e5;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.product-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;
  letter-spacing: -0.4px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.stars {
  color: #ffa500;
  font-size: 16px;
  letter-spacing: 2px;
}

.rating-text {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.key-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.feature-tag {
  font-size: 13px;
  color: #333;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #4caf50;
  font-weight: 500;
}

.cta-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.price-container {
  text-align: center;
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%);
  border-radius: 8px;
}

.price-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price {
  font-size: 28px;
  font-weight: 700;
  color: #1e88e5;
  letter-spacing: -0.5px;
}

.cta-button {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(255, 152, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.cta-button:hover {
  background: linear-gradient(135deg, #fb8c00 0%, #ef6c00 100%);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
  transform: translateY(-2px);
}

.cta-button:active {
  transform: translateY(0);
}

.urgency-text {
  text-align: center;
  font-size: 12px;
  color: #d32f2f;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  background: #ffebee;
  border-radius: 6px;
}

.urgency-text svg {
  stroke: #d32f2f;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: 100%;
    border-radius: 12px;
  }

  .product-image-container {
    padding: 50px 0 30px;
    min-height: 240px;
  }

  .product-image {
    max-width: 85%;
    max-height: 200px;
  }

  .modal-content {
    padding: 24px 20px 20px;
  }

  .product-title {
    font-size: 18px;
  }

  .price {
    font-size: 24px;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 15px;
  }
}
</style>
