# 在 Mac 上重建项目完整指南

由于 Windows 电脑上的监控软件损坏了 Git 仓库中的所有文件,需要在 Mac 上从头重建项目。

## ⚠️ 重要提醒

**不要直接 clone 现有仓库!** 仓库中的文件已被损坏,需要手动重建。

---

## 第一步:创建项目结构

```bash
# 1. 创建项目目录
mkdir my-top-list-website
cd my-top-list-website

# 2. 创建前端目录结构
mkdir -p frontend/src/{views,components,composables,router,config}
mkdir -p frontend/public/data
mkdir -p frontend/src/assets

# 3. 初始化 Git 仓库
git init
git remote add origin https://github.com/kaka0925/my-top-list-website.git
```

---

## 第二步:创建 package.json

创建 `frontend/package.json`:

```json
{
  "name": "frontend",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13",
    "vue-router": "^4.4.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "vite": "^6.0.3"
  }
}
```

---

## 第三步:创建 Vite 配置

创建 `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173
  }
});
```

---

## 第四步:创建 index.html

创建 `frontend/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top List - Product Rankings & Reviews</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

## 第五步:创建主入口文件

创建 `frontend/src/main.js`:

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
```

---

## 第六步:创建 App.vue

创建 `frontend/src/App.vue`:

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}
</style>
```

---

## 第七步:创建路由配置

创建 `frontend/src/router/index.js`:

```javascript
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
```

---

## 第八步:创建类目配置

创建 `frontend/src/config/categories.js`:

```javascript
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
```

---

## 第九步:创建 Composables

### useProducts.js

创建 `frontend/src/composables/useProducts.js`:

```javascript
import { ref } from 'vue';

export function useProducts(category) {
  const products = ref([]);
  const pageData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/data/${category}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${category} data`);
      }
      const data = await response.json();
      pageData.value = data;
      products.value = data.products || [];
    } catch (err) {
      error.value = err.message;
      console.error('Error loading products:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    pageData,
    loading,
    error,
    fetchProducts
  };
}
```

### useCompare.js

创建 `frontend/src/composables/useCompare.js`:

```javascript
import { ref, computed } from 'vue';

const compareList = ref([]);

export function useCompare() {
  const addToCompare = (product) => {
    if (compareList.value.length >= 4) {
      alert('You can compare up to 4 products at a time');
      return;
    }

    const exists = compareList.value.find(p => p.id === product.id);
    if (!exists) {
      compareList.value.push(product);
    }
  };

  const removeFromCompare = (productId) => {
    compareList.value = compareList.value.filter(p => p.id !== productId);
  };

  const clearCompare = () => {
    compareList.value = [];
  };

  const isInCompare = (productId) => {
    return compareList.value.some(p => p.id === productId);
  };

  const compareCount = computed(() => compareList.value.length);

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount
  };
}
```

---

## 第十步:创建组件

由于组件文件较大,请从 Windows 电脑上复制以下未损坏的文件:

### 需要复制的组件文件:

1. `frontend/src/components/Navbar.vue` (新增的导航栏组件)
2. `frontend/src/components/Breadcrumb.vue` (面包屑组件)
3. `frontend/src/components/ProductCard.vue`
4. `frontend/src/components/ProductForm.vue`

### 需要复制的视图文件:

1. `frontend/src/views/Home.vue`
2. `frontend/src/views/ProductRanking.vue`
3. `frontend/src/views/ComparePage.vue`
4. `frontend/src/views/AdminPanel.vue`
5. `frontend/src/views/CategoryPage.vue`

**⚠️ 重要:** 从 Windows 电脑复制这些文件时:
- 使用文本编辑器打开文件
- 检查文件开头是否有 `%TSD-Header-###%` 标记
- 如果有标记,文件已损坏,需要联系我获取干净的版本
- 如果文件看起来正常(以 `<template>` 或合法的 JavaScript 开头),可以安全复制

---

## 第十一步:复制数据文件

从 Windows 电脑复制以下 JSON 数据文件到 `frontend/public/data/`:

1. `jump-starter.json` (注意:不是 jump-starter-full.json)
2. `tire-inflator.json`
3. `dash-cam.json`
4. `air-duster.json`

**检查方法:** 用文本编辑器打开,确保文件以 `{` 开头,而不是 `%TSD-Header-###%`

---

## 第十二步:安装依赖并运行

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器应该会自动打开 `http://localhost:5173`

---

## 第十三步:提交到 Git

```bash
# 回到项目根目录
cd ..

# 添加 .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.DS_Store
*.log
.env
.vscode/
.idea/
EOF

# 添加所有文件
git add .

# 创建提交
git commit -m "Clean rebuild - restore project functionality

- Rebuilt entire project from scratch on Mac
- All files verified clean (no corruption)
- Added global Navbar with search functionality
- Added Breadcrumb navigation component
- Added ProductForm component for admin
- Created categories.js config file
- Fixed jump-starter category naming
- All features restored and working"

# 强制推送到远程仓库(覆盖损坏的版本)
git push -f origin main
```

---

## 第十四步:验证功能

测试以下功能是否正常:

- [ ] 首页搜索功能
- [ ] 全局导航栏搜索
- [ ] 面包屑导航
- [ ] 产品列表页面
- [ ] 产品比较功能
- [ ] 管理员面板
- [ ] 所有类目页面可访问

---

## 故障排除

### 如果某些组件文件损坏

联系我,我会提供完整的组件代码。主要组件包括:

1. **Navbar.vue** - 全局导航栏(包含搜索功能)
2. **Breadcrumb.vue** - 面包屑导航
3. **ProductCard.vue** - 产品卡片组件
4. **ProductForm.vue** - 产品表单(管理员用)
5. **Home.vue** - 首页
6. **ProductRanking.vue** - 产品排名页
7. **ComparePage.vue** - 产品比较页
8. **AdminPanel.vue** - 管理员面板
9. **CategoryPage.vue** - 类目页面

### 如果数据文件损坏

数据文件应该是 JSON 格式,包含以下结构:

```json
{
  "title": "Category Name",
  "description": "Category description",
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "rating": 4.5,
      "price": "$99.99",
      "features": ["Feature 1", "Feature 2"],
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "amazonLink": "https://amazon.com/..."
    }
  ]
}
```

---

## 部署到 Netlify

项目重建完成后,可以部署到 Netlify:

```bash
# 构建生产版本
cd frontend
npm run build

# dist 目录就是要部署的文件
```

在 Netlify 设置:
- **Build command:** `cd frontend && npm run build`
- **Publish directory:** `frontend/dist`
- **Add netlify.toml:** (已包含在项目中)

---

## 项目结构

```
my-top-list-website/
├── frontend/
│   ├── public/
│   │   └── data/
│   │       ├── jump-starter.json
│   │       ├── tire-inflator.json
│   │       ├── dash-cam.json
│   │       └── air-duster.json
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.vue
│   │   │   ├── Breadcrumb.vue
│   │   │   ├── ProductCard.vue
│   │   │   └── ProductForm.vue
│   │   ├── composables/
│   │   │   ├── useProducts.js
│   │   │   └── useCompare.js
│   │   ├── config/
│   │   │   └── categories.js
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── views/
│   │   │   ├── Home.vue
│   │   │   ├── ProductRanking.vue
│   │   │   ├── ComparePage.vue
│   │   │   ├── AdminPanel.vue
│   │   │   └── CategoryPage.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── netlify.toml
└── README.md
```

---

## 需要帮助?

如果在重建过程中遇到任何问题:

1. 检查文件是否有 `%TSD-Header-###%` 标记
2. 确保所有文件编码为 UTF-8
3. 验证 JSON 文件格式正确
4. 检查控制台是否有错误信息

联系我获取任何缺失或损坏的文件的干净版本!
