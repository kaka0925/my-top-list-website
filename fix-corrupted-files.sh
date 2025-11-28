#!/bin/bash
# 修复损坏的文件
# 在 Mac 上克隆项目后运行此脚本

echo "开始修复损坏的文件..."

# 修复 router/index.js
cat > frontend/src/router/index.js << 'EOF'
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductRanking from '../views/ProductRanking.vue';
import ComparePage from '../views/ComparePage.vue';
import AdminPanel from '../views/AdminPanel.vue';
import CategoryPage from '../views/CategoryPage.vue';

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
    beforeEnter: (to, from, next) => {
      to.params.category = 'jump-starter';
      next();
    }
  },
  {
    path: '/tire-inflator',
    name: 'TireInflator',
    component: ProductRanking,
    beforeEnter: (to, from, next) => {
      to.params.category = 'tire-inflator';
      next();
    }
  },
  {
    path: '/dash-cam',
    name: 'DashCam',
    component: ProductRanking,
    beforeEnter: (to, from, next) => {
      to.params.category = 'dash-cam';
      next();
    }
  },
  {
    path: '/air-duster',
    name: 'AirDuster',
    component: ProductRanking,
    beforeEnter: (to, from, next) => {
      to.params.category = 'air-duster';
      next();
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
EOF

echo "✅ 修复了 router/index.js"

# 修复 categories.js
cat > frontend/src/config/categories.js << 'EOF'
// 类目配置文件
// 统一管理所有产品类目信息

export const CATEGORIES = {
  'jump-starter': {
    id: 'jump-starter',
    name: 'Jump Starter',
    displayName: 'Jump Starters',
    parentCategory: 'Automotive',
    description: '汽车应急启动电源',
    icon: '🔋',
    route: '/jump-starter'
  },
  'tire-inflator': {
    id: 'tire-inflator',
    name: 'Tire Inflator',
    displayName: 'Tire Inflators',
    parentCategory: 'Automotive',
    description: '轮胎充气泵',
    icon: '🚗',
    route: '/tire-inflator'
  },
  'dash-cam': {
    id: 'dash-cam',
    name: 'Dash Cam',
    displayName: 'Dash Cams',
    parentCategory: 'Automotive',
    description: '行车记录仪',
    icon: '📹',
    route: '/dash-cam'
  },
  'air-duster': {
    id: 'air-duster',
    name: 'Air Duster',
    displayName: 'Air Dusters',
    parentCategory: 'Electronics',
    description: '电动吹尘器',
    icon: '💨',
    route: '/air-duster'
  }
};

// 获取类目信息
export function getCategoryInfo(categoryId) {
  return CATEGORIES[categoryId] || null;
}

// 获取所有类目
export function getAllCategories() {
  return Object.values(CATEGORIES);
}

// 根据父类目获取子类目列表
export function getCategoriesByParent(parentCategory) {
  return Object.values(CATEGORIES).filter(
    cat => cat.parentCategory === parentCategory
  );
}

// 获取所有父类目
export function getParentCategories() {
  const parents = [...new Set(Object.values(CATEGORIES).map(cat => cat.parentCategory))];
  return parents;
}
EOF

echo "✅ 修复了 categories.js"

echo ""
echo "🎉 所有文件修复完成!"
echo ""
echo "接下来请运行:"
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"
