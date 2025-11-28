# 📖 如何添加新的产品榜单

本文档说明如何在系统中添加新的产品榜单。

## 📋 目录结构

```
frontend/
├── src/
│   ├── config/
│   │   └── categories.js          # 类目配置（统一管理）
│   ├── router/
│   │   └── index.js                # 路由配置
│   └── views/
│       └── AdminPanel.vue          # 管理后台
└── public/
    └── data/
        ├── jump-starter.json       # 产品数据文件
        ├── tire-inflator.json
        ├── dash-cam.json
        └── air-duster.json
```

---

## 🎯 场景 1：在现有大类下添加新产品榜单

**示例：在 Automotive 大类下添加 "Car Vacuum Cleaner" 榜单**

### 步骤 1：更新类目配置（3分钟）

编辑 `frontend/src/config/categories.js`，添加新类目：

\`\`\`javascript
export const CATEGORIES = {
  // ... 现有类目 ...

  'car-vacuum': {                    // ← 新增
    id: 'car-vacuum',
    name: 'Car Vacuum Cleaner',
    displayName: 'Car Vacuum Cleaners',
    parentCategory: 'Automotive',    // 归属于 Automotive 大类
    description: '车载吸尘器',
    icon: '🧹',
    route: '/car-vacuum'
  }
};
\`\`\`

### 步骤 2：添加路由（2分钟）

编辑 `frontend/src/router/index.js`，添加新路由：

\`\`\`javascript
const routes = [
  // ... 现有路由 ...

  {                                   // ← 新增
    path: '/car-vacuum',
    name: 'CarVacuum',
    component: ProductRanking,
    beforeEnter: (to, from, next) => {
      to.params.category = 'car-vacuum';
      next();
    }
  }
];
\`\`\`

### 步骤 3：创建数据文件（5分钟）

1. 访问管理后台：`http://localhost:5173/admin`
2. 选择类目：`car-vacuum`
3. 填写页面基本信息
4. 下载模板文件并填写数据
5. 上传填写好的文件
6. 下载生成的 JSON 文件
7. 将 `car-vacuum.json` 复制到 `frontend/public/data/` 目录

### 步骤 4：（可选）在首页添加类目卡片

编辑 `frontend/src/views/Home.vue`，在 categories 部分添加新卡片。

---

## 🎯 场景 2：创建全新大类

**示例：创建新的 "Electronics" 大类，包含 "Air Duster" 榜单**

### 步骤 1：更新类目配置

\`\`\`javascript
export const CATEGORIES = {
  // ... 现有类目 ...

  'air-duster': {
    id: 'air-duster',
    name: 'Air Duster',
    displayName: 'Air Dusters',
    parentCategory: 'Electronics',    // ← 新的大类
    description: '电动吹尘器',
    icon: '💨',
    route: '/air-duster'
  }
};
\`\`\`

### 步骤 2-4：同场景 1

---

## 🔍 类目配置字段说明

\`\`\`javascript
{
  id: 'jump-starter',                // 唯一标识符（用于文件名和路由）
  name: 'Jump Starter',              // 简短名称
  displayName: 'Jump Starters',      // 显示名称（复数形式）
  parentCategory: 'Automotive',      // 父类目（用于面包屑导航）
  description: '汽车应急启动电源',   // 中文描述
  icon: '🔋',                         // 图标（可选）
  route: '/jump-starter'             // 路由路径
}
\`\`\`

---

## 📝 数据文件格式

每个产品榜单的 JSON 文件包含以下结构：

\`\`\`json
{
  "pageTitle": "页面标题（SEO）",
  "heading": "主标题",
  "subtitle": "副标题",
  "lastUpdated": "更新日期",
  "products": [
    {
      "id": 1,
      "rank": 1,
      "brand": "品牌",
      "title": "产品标题",
      "image": "图片URL",
      "rating": 4.8,
      "reviews": 2850,
      "expertScore": 9.8,
      "price": "$159.99",
      "amazonLink": "购买链接",
      "features": ["特点1", "特点2"],
      "pros": ["优点1", "优点2"],
      "cons": ["缺点1", "缺点2"]
    }
  ],
  "comparisonTable": {
    "title": "Quick Comparison",
    "headers": ["Product", "Spec1", "Spec2", ...],
    "rows": [...]
  },
  "buyingGuide": {
    "title": "Complete Buying Guide",
    "sections": [
      {
        "title": "章节标题",
        "content": "章节内容"
      }
    ]
  },
  "faqs": [
    {
      "question": "问题",
      "answer": "答案"
    }
  ]
}
\`\`\`

---

## ✅ 添加完成后检查清单

- [ ] 类目配置已添加到 `categories.js`
- [ ] 路由已添加到 `router/index.js`
- [ ] JSON 数据文件已放入 `public/data/` 目录
- [ ] 本地测试访问新榜单页面：`http://localhost:5173/你的路由路径`
- [ ] 面包屑导航显示正确
- [ ] 产品列表显示正常
- [ ] 对比表格、购买指南、FAQ 都显示正常
- [ ] **搜索功能测试** - 在首页搜索框输入产品名称，验证新榜单能被搜索到
- [ ] （可选）首页类目卡片已添加

---

## 🚀 部署到 Netlify

完成上述步骤后：

\`\`\`bash
git add .
git commit -m "Add new ranking: 你的榜单名称"
git push
\`\`\`

Netlify 会自动构建和部署。

---

## 💡 常见问题

### Q1: 需要修改多少代码？
**A:** 在现有大类下添加新榜单，只需要修改 2 个文件（categories.js 和 router/index.js），大约 **10 行代码**。

### Q2: 对比表格需要手动填写吗？
**A:** 不需要！对比表格会**自动从产品列表前5名生成**，提取关键参数。

### Q3: 新榜单会自动出现在搜索结果中吗？
**A:** **会的！** 搜索功能会自动读取 `categories.js` 中的所有类目配置。只要你添加了类目配置，搜索功能就能找到新榜单。搜索关键词包括：
  - 产品名称（name）
  - 显示名称（displayName）
  - 中文描述（description）
  - 产品名称的分词

### Q4: 如何批量管理多个榜单？
**A:** 所有类目信息都在 `categories.js` 中集中管理，便于维护和扩展。

### Q5: 能否使用通用路由？
**A:** 当前使用静态路由，每个榜单需要明确定义路由。这样做的好处是：
  - SEO 友好（每个榜单有独立URL）
  - 路由清晰，易于维护
  - 支持不同的页面元数据

---

## 📞 需要帮助？

如果在添加新榜单时遇到问题，请检查：
1. 类目 ID 在所有地方保持一致
2. JSON 文件名与类目 ID 匹配
3. 路由路径与类目 route 字段一致
