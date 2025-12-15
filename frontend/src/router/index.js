import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductRanking from '../views/ProductRanking.vue';
import ComparePage from '../views/ComparePage.vue';
import AdminPanel from '../views/AdminPanel.vue';
import CategoryPage from '../views/CategoryPage.vue';
import LegalPage from '../views/LegalPage.vue';
import ContactPage from '../views/ContactPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/compare',
    name: 'Compare',
    component: ComparePage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: CategoryPage
  },
  {
    path: '/jump-starter',
    name: 'JumpStarter',
    component: ProductRanking,
    props: { category: 'jump-starter' }
  },
  {
    path: '/tire-inflator',
    name: 'TireInflator',
    component: ProductRanking,
    props: { category: 'tire-inflator' }
  },
  {
    path: '/dash-cam',
    name: 'DashCam',
    component: ProductRanking,
    props: { category: 'dash-cam' }
  },
  {
    path: '/air-duster',
    name: 'AirDuster',
    component: ProductRanking,
    props: { category: 'air-duster' }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: LegalPage,
    props: { type: 'terms' }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: LegalPage,
    props: { type: 'privacy' }
  },
  {
    path: '/ccpa',
    name: 'CCPA',
    component: LegalPage,
    props: { type: 'ccpa' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），使用保存的位置
    if (savedPosition) {
      return savedPosition;
    }
    // 如果有hash锚点，滚动到锚点位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    // 默认滚动到页面顶部
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
