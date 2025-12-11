# Product Ranking Website - Vue Frontend

## 项目说明

这是一个基于 Vue 3 + Vite 构建的产品排名网站前端项目，完全保留了原有的样式和风格。

## 项目结构

```
frontend/
├── public/
│   ├── data/              # JSON 数据文件
│   │   ├── jump-starter-full.json
│   │   ├── tire-inflator.json
│   │   ├── dash-cam.json
│   │   └── air-duster.json
│   └── images/            # 产品图片
├── src/
│   ├── assets/
│   │   └── css/           # 现有的 CSS 样式文件
│   ├── components/
│   │   └── ProductCard.vue    # 产品卡片组件
│   ├── views/
│   │   ├── Home.vue           # 首页
│   │   └── ProductRanking.vue # 产品排名页面
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── composables/
│   │   └── useProducts.js     # 产品数据获取逻辑
│   ├── App.vue                # 主应用组件
│   └── main.js                # 入口文件
└── package.json
```

## 快速开始

### 安装依赖
```bash
cd frontend
npm install
```

### 运行开发服务器
```bash
npm run dev
```

访问：http://localhost:5173

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 如何添加新的产品类目

### 步骤 1：添加 JSON 数据文件

在 `public/data/` 目录下创建新的 JSON 文件，例如 `new-category.json`：

```json
{
  "pageTitle": "Best Products 2025 - Complete Buying Guide",
  "heading": "Best Products 2025",
  "subtitle": "Expert reviews and comprehensive buying guide",
  "lastUpdated": "November 27, 2025",
  "products": [
    {
      "id": 1,
      "rank": 1,
      "brand": "品牌名称",
      "title": "产品标题",
      "image": "https://via.placeholder.com/220",
      "rating": 4.8,
      "reviews": 2850,
      "expertScore": 9.8,
      "price": "$159.99",
      "amazonLink": "#",
      "features": [
        "特点1",
        "特点2"
      ],
      "pros": [
        "优点1",
        "优点2"
      ],
      "cons": [
        "缺点1",
        "缺点2"
      ]
    }
  ]
}
```

### 步骤 2：添加路由

编辑 `src/router/index.js`，添加新路由：

```javascript
{
  path: '/new-category',
  name: 'NewCategory',
  component: ProductRanking,
  beforeEnter: (to, from, next) => {
    to.params.category = 'new-category';  // 对应 JSON 文件名
    next();
  }
}
```

### 步骤 3：更新导航

在 `src/views/Home.vue` 中添加新分类卡片：

```vue
<router-link to="/new-category" class="category-card">
  <div class="category-icon">🎯</div>
  <h2>新分类名称</h2>
  <p>分类描述</p>
</router-link>
```

在 `src/views/ProductRanking.vue` 的导航栏中添加链接：

```vue
<router-link to="/new-category">新分类</router-link>
```

完成！刷新页面即可看到新的产品类目。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router 4** - 官方路由管理器
- **原生 CSS** - 保留现有样式，无需 CSS 预处理器

## 后续计划

- [ ] 添加产品对比功能
- [ ] 添加搜索和筛选功能
- [ ] 集成后端 API（目前使用静态 JSON）
- [ ] 添加用户评论系统
- [ ] SEO 优化

## 后端接入准备

当需要接入后端时，只需修改 `src/composables/useProducts.js` 中的 `fetchProducts` 函数：

```javascript
// 当前：从本地 public 目录读取
const response = await fetch(`/data/${category}.json`);

// 改为：从后端 API 读取
const response = await fetch(`http://your-api.com/api/products/${category}`);
```

## 添加新榜单！
⏺ 根据当前的架构，要添加"car vacuum"新类目，您只需要做3步修改即可完全适配所有功能：

  需要修改的文件：

  1. 创建JSON数据文件

  frontend/public/data/car-vacuum.json
  - 按照现有JSON格式（如jump-starter.json）创建产品数据

  2. 添加类目配置

  frontend/src/config/categories.js
  在CATEGORIES对象中添加：
  'car-vacuum': {
    id: 'car-vacuum',
    name: 'Car Vacuum',
    displayName: 'Car Vacuums',
    parentCategory: 'Electronics',  // 注意这里是Electronics
    description: '车载吸尘器',
    icon: '🧹',  // 可以选择合适的emoji
    route: '/car-vacuum'
  }

  3. 添加路由配置

  frontend/src/router/index.js
  在routes数组中添加：
  {
    path: '/car-vacuum',
    name: 'CarVacuum',
    component: ProductRanking,
    props: { category: 'car-vacuum' }
  }
  