<template>
  <div>
    <!-- Navigation -->
    <Navbar />

    <!-- Main Container -->
    <div class="container">
      <div class="contact-page">
        <h1>Contact Form</h1>

        <div class="contact-content">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  placeholder="First Name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="Email"
                required
              />
            </div>

            <div class="form-group">
              <label for="company">Company</label>
              <input
                type="text"
                id="company"
                v-model="formData.company"
                placeholder="Company"
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                placeholder="Write your message..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Submit</span>
              <span v-else>Submitting...</span>
            </button>

            <div v-if="submitMessage" class="submit-message" :class="{ success: submitSuccess, error: !submitSuccess }">
              {{ submitMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

// EmailJS Configuration
// Get these from https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_17trq6b';
const EMAILJS_TEMPLATE_ID = 'template_cd6031i';
const EMAILJS_PUBLIC_KEY = 'ToBL747lRhjEwlpaJ';

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  message: ''
});

const isSubmitting = ref(false);
const submitMessage = ref('');
const submitSuccess = ref(false);

// Initialize EmailJS when component mounts
onMounted(() => {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('EmailJS initialization error:', error);
  }
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';

  try {
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: `${formData.value.firstName} ${formData.value.lastName}`,
      from_email: formData.value.email,
      company: formData.value.company || 'N/A',
      message: formData.value.message,
      to_name: 'BuyerReviewsGuide Team',
      time: new Date().toLocaleString('zh-CN')  // 添加时间参数
    };

    console.log('Sending email with params:', templateParams);

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);

    submitSuccess.value = true;
    submitMessage.value = 'Thank you for your message! We will get back to you soon.';

    // Reset form
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: ''
    };
  } catch (error) {
    console.error('EmailJS error:', error);
    console.error('Error details:', error.text || error.message);
    submitSuccess.value = false;

    // Show detailed error message for debugging
    const errorMsg = error.text || error.message || 'Unknown error';
    submitMessage.value = `Error: ${errorMsg}. Please check the console for details.`;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px 60px;
}

.contact-page h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 30px;
  text-align: center;
}

.contact-form {
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-row .form-group {
  margin-bottom: 0;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.3s;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #1e88e5;
  background: #ffffff;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.submit-btn {
  background: #1e88e5;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #1976d2;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.submit-message {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}

.submit-message.success {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #a5d6a7;
}

.submit-message.error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 30px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .form-row .form-group {
    margin-bottom: 20px;
  }

  .contact-page h1 {
    font-size: 24px;
  }
}
</style>
