<template>
  <div class="admin-panel">
    <div class="admin-container">
      <div class="admin-header">
        <h1>🔐 管理后台</h1>
        <router-link to="/" class="back-button">返回首页</router-link>
      </div>

      <div class="admin-content">
        <div class="info-box">
          <h2>📋 JSON文件管理说明</h2>
          <p>通过下方表单编辑产品数据，完成后点击"下载JSON"按钮，然后将文件替换到：</p>
          <code>frontend/public/data/</code>

          <div class="file-list">
            <h3>当前数据文件：</h3>
            <ul>
              <li>✅ jump-starter-full.json - 已完善</li>
              <li>⏳ tire-inflator.json - 待填充</li>
              <li>⏳ dash-cam.json - 待填充</li>
              <li>⏳ air-duster.json - 待填充</li>
            </ul>
          </div>
        </div>

        <div class="quick-actions">
          <h2>🛠️ 快捷操作</h2>
          <div class="action-grid">
            <div class="action-card">
              <h3>📝 编辑产品</h3>
              <p>添加、修改或删除产品信息</p>
              <button class="action-btn" @click="currentView = 'products'">
                管理产品列表
              </button>
            </div>

            <div class="action-card">
              <h3>📊 对比表格</h3>
              <p>编辑Quick Comparison数据</p>
              <button class="action-btn" @click="currentView = 'comparison'">
                编辑对比表格
              </button>
            </div>

            <div class="action-card">
              <h3>📖 购买指南</h3>
              <p>编辑Buying Guide内容</p>
              <button class="action-btn" @click="currentView = 'guide'">
                编辑购买指南
              </button>
            </div>

            <div class="action-card">
              <h3>❓ FAQ管理</h3>
              <p>添加或修改常见问题</p>
              <button class="action-btn" @click="currentView = 'faq'">
                管理FAQ
              </button>
            </div>
          </div>
        </div>

        <!-- 当前视图 -->
        <div v-if="currentView !== 'home'" class="editor-section">
          <div class="editor-header">
            <h2>{{ getViewTitle() }}</h2>
            <button @click="currentView = 'home'" class="close-btn">✕ 关闭</button>
          </div>

          <!-- 产品管理 -->
          <div v-if="currentView === 'products'">
            <p style="text-align: center; padding: 40px; color: #666;">
              产品管理表单开发中...<br>
              目前请直接编辑JSON文件
            </p>
          </div>

          <!-- 对比表格 -->
          <div v-if="currentView === 'comparison'">
            <p style="text-align: center; padding: 40px; color: #666;">
              对比表格编辑器开发中...<br>
              目前请直接编辑JSON文件
            </p>
          </div>

          <!-- 购买指南 -->
          <div v-if="currentView === 'guide'">
            <p style="text-align: center; padding: 40px; color: #666;">
              购买指南编辑器开发中...<br>
              目前请直接编辑JSON文件
            </p>
          </div>

          <!-- FAQ -->
          <div v-if="currentView === 'faq'">
            <p style="text-align: center; padding: 40px; color: #666;">
              FAQ管理工具开发中...<br>
              目前请直接编辑JSON文件
            </p>
          </div>
        </div>

        <div class="tip-box">
          <h3>💡 使用提示</h3>
          <ul>
            <li>快捷键访问：在首页按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd></li>
            <li>直接访问：<code>http://localhost:5173/admin</code></li>
            <li>用户完全看不到管理入口，只有你知道这个秘密 🤫</li>
            <li>后续可以开发完整的表单编辑功能</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentView = ref('home'); // 'home', 'products', 'comparison', 'guide', 'faq'

const getViewTitle = () => {
  const titles = {
    products: '产品列表管理',
    comparison: '对比表格编辑',
    guide: '购买指南编辑',
    faq: 'FAQ管理'
  };
  return titles[currentView.value] || '';
};
</script>

<style scoped>
.admin-panel {
  min-height: 100vh;
  background: #f8f6f3;
  padding: 20px;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e8e8e8;
}

.admin-header h1 {
  font-size: 32px;
  color: #333;
  margin: 0;
}

.back-button {
  padding: 10px 20px;
  background: #6b9bd1;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
}

.back-button:hover {
  background: #5a8bc2;
  transform: translateY(-2px);
}

.info-box {
  background: #f8f6f3;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  border-left: 4px solid #6b9bd1;
}

.info-box h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
}

.info-box code {
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #d63384;
}

.file-list {
  margin-top: 20px;
}

.file-list h3 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}

.file-list ul {
  list-style: none;
  padding: 0;
}

.file-list li {
  padding: 8px 0;
  font-size: 14px;
  color: #666;
}

.quick-actions h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.action-card {
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s;
}

.action-card:hover {
  border-color: #6b9bd1;
  box-shadow: 0 4px 12px rgba(107, 155, 209, 0.15);
  transform: translateY(-4px);
}

.action-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.action-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
}

.action-btn {
  width: 100%;
  padding: 10px 16px;
  background: #6b9bd1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #5a8bc2;
}

.editor-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  margin: 30px 0;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.editor-header h2 {
  margin: 0;
  font-size: 22px;
  color: #333;
}

.close-btn {
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #c82333;
}

.tip-box {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.tip-box h3 {
  color: #856404;
  margin-bottom: 12px;
  font-size: 18px;
}

.tip-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-box li {
  padding: 8px 0;
  color: #856404;
  font-size: 14px;
}

.tip-box kbd {
  background: #856404;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  margin: 0 2px;
}
</style>
