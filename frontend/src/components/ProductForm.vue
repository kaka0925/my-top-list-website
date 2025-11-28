<template>
  <div class="product-form">
    <div class="form-header">
      <h2>📝 产品榜单数据管理</h2>
      <div class="category-selector">
        <label>选择类目：</label>
        <select v-model="formData.category" @change="onCategoryChange">
          <option value="">-- 选择类目 --</option>
          <option value="jump-starter">Jump Starter (汽车应急启动电源)</option>
          <option value="tire-inflator">Tire Inflator (轮胎充气泵)</option>
          <option value="dash-cam">Dash Cam (行车记录仪)</option>
          <option value="air-duster">Air Duster (电动吹尘器)</option>
        </select>
      </div>
    </div>

    <div v-if="formData.category" class="form-content">
      <!-- 页面基本信息 -->
      <div class="form-section">
        <h3>📄 页面基本信息</h3>
        <div class="form-group">
          <label>页面标题 (Page Title)</label>
          <input v-model="formData.pageTitle" type="text" placeholder="Best Jump Starters 2025 - Complete Buying Guide & Reviews" />
        </div>
        <div class="form-group">
          <label>主标题 (Heading)</label>
          <input v-model="formData.heading" type="text" placeholder="Best Jump Starters 2025" />
        </div>
        <div class="form-group">
          <label>副标题 (Subtitle)</label>
          <input v-model="formData.subtitle" type="text" placeholder="Expert reviews and comprehensive buying guide..." />
        </div>
        <div class="form-group">
          <label>最后更新日期 (Last Updated)</label>
          <input v-model="formData.lastUpdated" type="text" placeholder="November 26, 2025" />
        </div>
      </div>

      <!-- 工作流程步骤 -->
      <div class="workflow-section">
        <h3>🔄 数据填写工作流程</h3>
        <div class="workflow-steps">

          <!-- 步骤1: 生成模板 -->
          <div class="workflow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>📥 生成模板文件</h4>
              <p>点击下方按钮生成三个模板文件，用于填写产品数据</p>
              <div class="button-group">
                <button @click="downloadTemplate('products')" class="btn-template">
                  📄 下载产品列表模板
                </button>
                <button @click="downloadTemplate('guide')" class="btn-template">
                  📖 下载购买指南模板
                </button>
                <button @click="downloadTemplate('faq')" class="btn-template">
                  ❓ 下载FAQ模板
                </button>
              </div>
            </div>
          </div>

          <!-- 步骤2: 填写模板 -->
          <div class="workflow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>✍️ 填写模板内容</h4>
              <p>使用文本编辑器打开下载的模板文件，按照格式填写数据</p>
              <div class="template-info">
                <div class="info-item">
                  <strong>products-template.txt</strong> - 产品列表数据
                  <ul>
                    <li>每个产品用 "---" 分隔</li>
                    <li>按格式填写品牌、标题、价格、评分等信息</li>
                    <li>Features、Pros、Cons 每行一个</li>
                  </ul>
                </div>
                <div class="info-item">
                  <strong>guide-template.txt</strong> - 购买指南内容
                  <ul>
                    <li>每个章节用 "---" 分隔</li>
                    <li>包含章节标题和详细内容</li>
                  </ul>
                </div>
                <div class="info-item">
                  <strong>faq-template.txt</strong> - 常见问题
                  <ul>
                    <li>每个FAQ用 "---" 分隔</li>
                    <li>包含问题和答案</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 步骤3: 上传文件 -->
          <div class="workflow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>📤 上传填写好的文件</h4>
              <p>将填写完成的文件上传，系统会自动解析成JSON格式</p>
              <div class="upload-group">
                <div class="upload-item">
                  <label class="upload-label">
                    <span>📄 产品列表文件</span>
                    <input type="file" @change="handleFileUpload($event, 'products')" accept=".txt" />
                    <span class="file-status" v-if="uploadedFiles.products">✅ 已上传</span>
                  </label>
                </div>
                <div class="upload-item">
                  <label class="upload-label">
                    <span>📖 购买指南文件</span>
                    <input type="file" @change="handleFileUpload($event, 'guide')" accept=".txt" />
                    <span class="file-status" v-if="uploadedFiles.guide">✅ 已上传</span>
                  </label>
                </div>
                <div class="upload-item">
                  <label class="upload-label">
                    <span>❓ FAQ文件</span>
                    <input type="file" @change="handleFileUpload($event, 'faq')" accept=".txt" />
                    <span class="file-status" v-if="uploadedFiles.faq">✅ 已上传</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 步骤4: 预览和保存 -->
          <div class="workflow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>💾 预览并保存</h4>
              <p>查看解析后的数据，确认无误后下载JSON文件</p>
              <div class="preview-section" v-if="hasData">
                <div class="data-summary">
                  <div class="summary-item">
                    <strong>产品数量</strong>
                    <div class="summary-value">{{ formData.products.length }}</div>
                  </div>
                  <div class="summary-item">
                    <strong>购买指南章节</strong>
                    <div class="summary-value">{{ formData.buyingGuide.sections.length }}</div>
                  </div>
                  <div class="summary-item">
                    <strong>FAQ数量</strong>
                    <div class="summary-value">{{ formData.faqs.length }}</div>
                  </div>
                  <div class="summary-item">
                    <strong>对比表格</strong>
                    <div class="summary-value">{{ formData.comparisonTable.rows.length }} 行 (自动生成)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <button @click="previewJson" class="btn-preview" :disabled="!hasData">
          👁️ 预览 JSON 数据
        </button>
        <button @click="saveAndDownload" class="btn-save" :disabled="!hasData">
          💾 保存并下载 JSON
        </button>
        <button @click="loadExistingData" class="btn-load">
          🔄 加载现有数据
        </button>
      </div>

      <!-- JSON 预览 -->
      <div v-if="showPreview" class="json-preview">
        <div class="preview-header">
          <h4>JSON 数据预览</h4>
          <button @click="showPreview = false" class="btn-close">✕</button>
        </div>
        <pre>{{ jsonPreview }}</pre>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>👆 请先选择一个产品类目开始工作</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const formData = reactive({
  category: '',
  pageTitle: '',
  heading: '',
  subtitle: '',
  lastUpdated: '',
  products: [],
  comparisonTable: {
    title: 'Quick Comparison',
    headers: ['Product', 'Peak Amps', 'Battery Capacity', 'Air Compressor', 'Fast Charge', 'Price', 'Score'],
    rows: []
  },
  buyingGuide: {
    title: 'Complete Buying Guide',
    sections: []
  },
  faqs: []
});

const uploadedFiles = reactive({
  products: false,
  guide: false,
  faq: false
});

const showPreview = ref(false);
const jsonPreview = ref('');

const hasData = computed(() => {
  return formData.products.length > 0 ||
         formData.buyingGuide.sections.length > 0 ||
         formData.faqs.length > 0;
});

// 类目改变时
const onCategoryChange = () => {
  resetForm();
  uploadedFiles.products = false;
  uploadedFiles.guide = false;
  uploadedFiles.faq = false;
};

// 重置表单
const resetForm = () => {
  formData.pageTitle = '';
  formData.heading = '';
  formData.subtitle = '';
  formData.lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  formData.products = [];
  formData.comparisonTable.rows = [];
  formData.buyingGuide.sections = [];
  formData.faqs = [];
};

// 生成产品列表模板
const generateProductsTemplate = () => {
  return `# 产品列表模板
# 每个产品之间用 --- 分隔
# 请按照以下格式填写，保持字段名称不变

RANK: 1
BRAND: WOLFBOX
TITLE: 4000A Jump Starter with 160PSI Air Compressor
IMAGE: https://via.placeholder.com/220
RATING: 4.8
REVIEWS: 2850
EXPERT_SCORE: 9.8
PRICE: $159.99
AMAZON_LINK: https://amazon.com/dp/...

FEATURES:
4000A peak output powers all gas and 12L diesel engines
Built-in 160PSI air compressor inflates tires in 3 minutes
20000mAh battery provides 30+ jump starts per charge
Dual USB-C ports with 65W fast charging capability
LED emergency light with multiple modes and SOS function

PROS:
Extremely powerful 4000A output
Built-in air compressor saves space
Large 20000mAh battery capacity
Fast 65W USB-C charging
Multiple safety protections

CONS:
Higher price point
Heavier than basic models

---

RANK: 2
BRAND:
TITLE:
IMAGE: https://via.placeholder.com/220
RATING:
REVIEWS:
EXPERT_SCORE:
PRICE:
AMAZON_LINK:

FEATURES:


PROS:


CONS:


---

# 继续添加更多产品...
`;
};

// 生成购买指南模板
const generateGuideTemplate = () => {
  return `# 购买指南模板
# 每个章节之间用 --- 分隔
# 请按照以下格式填写

TITLE: 1. Understanding Jump Starter Power Ratings
CONTENT: Peak amperage is the most important specification when choosing a jump starter. For standard passenger cars with 4-6 cylinder engines, 1000-2000A is sufficient. Mid-size vehicles and V6 engines require 2000-3000A, while trucks, SUVs, and diesel engines need 3000A or higher.

---

TITLE: 2. Battery Capacity Matters
CONTENT: Battery capacity, measured in mAh (milliamp hours), determines how many jump starts you can perform per charge. A 10000-15000mAh battery typically provides 15-20 jumps, while 20000mAh+ models offer 30+ jumps.

---

# 继续添加更多章节...
`;
};

// 生成FAQ模板
const generateFaqTemplate = () => {
  return `# FAQ模板
# 每个问题之间用 --- 分隔
# 请按照以下格式填写

QUESTION: What size jump starter do I need for my car?
ANSWER: For most passenger cars (4-cylinder), 1000-2000A is sufficient. V6 and mid-size vehicles need 2000-3000A. For trucks, SUVs, and diesel engines, choose 3000A or higher.

---

QUESTION: How many times can I jump start my car per charge?
ANSWER: This depends on battery capacity. Smaller 10000mAh units provide 15-20 jumps, while larger 20000mAh+ models offer 30-60 jumps per charge.

---

# 继续添加更多问题...
`;
};

// 下载模板文件
const downloadTemplate = (type) => {
  let content = '';
  let filename = '';

  switch (type) {
    case 'products':
      content = generateProductsTemplate();
      filename = `${formData.category}-products-template.txt`;
      break;
    case 'guide':
      content = generateGuideTemplate();
      filename = `${formData.category}-guide-template.txt`;
      break;
    case 'faq':
      content = generateFaqTemplate();
      filename = `${formData.category}-faq-template.txt`;
      break;
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// 解析产品列表文件
const parseProductsFile = (content) => {
  const products = [];
  const productBlocks = content.split('---').filter(block => block.trim());

  productBlocks.forEach((block, index) => {
    const lines = block.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

    const product = {
      id: index + 1,
      rank: index + 1,
      brand: '',
      title: '',
      image: 'https://via.placeholder.com/220',
      rating: 4.5,
      reviews: 0,
      expertScore: 9.0,
      price: '$0.00',
      amazonLink: '#',
      features: [],
      pros: [],
      cons: []
    };

    let currentSection = '';

    lines.forEach(line => {
      line = line.trim();

      if (line.startsWith('RANK:')) {
        product.rank = parseInt(line.split(':')[1].trim()) || index + 1;
        product.id = product.rank;
      } else if (line.startsWith('BRAND:')) {
        product.brand = line.split(':')[1].trim();
      } else if (line.startsWith('TITLE:')) {
        product.title = line.split(':')[1].trim();
      } else if (line.startsWith('IMAGE:')) {
        product.image = line.split(':')[1].trim();
      } else if (line.startsWith('RATING:')) {
        product.rating = parseFloat(line.split(':')[1].trim()) || 4.5;
      } else if (line.startsWith('REVIEWS:')) {
        product.reviews = parseInt(line.split(':')[1].trim()) || 0;
      } else if (line.startsWith('EXPERT_SCORE:')) {
        product.expertScore = parseFloat(line.split(':')[1].trim()) || 9.0;
      } else if (line.startsWith('PRICE:')) {
        product.price = line.split(':')[1].trim();
      } else if (line.startsWith('AMAZON_LINK:')) {
        product.amazonLink = line.split(':')[1].trim();
      } else if (line === 'FEATURES:') {
        currentSection = 'features';
      } else if (line === 'PROS:') {
        currentSection = 'pros';
      } else if (line === 'CONS:') {
        currentSection = 'cons';
      } else if (line && currentSection) {
        product[currentSection].push(line);
      }
    });

    // 只添加有效的产品（至少有品牌和标题）
    if (product.brand && product.title) {
      products.push(product);
    }
  });

  return products;
};

// 解析购买指南文件
const parseGuideFile = (content) => {
  const sections = [];
  const sectionBlocks = content.split('---').filter(block => block.trim());

  sectionBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

    let title = '';
    let contentText = '';

    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('TITLE:')) {
        title = line.substring(6).trim();
      } else if (line.startsWith('CONTENT:')) {
        contentText = line.substring(8).trim();
      } else if (contentText) {
        contentText += ' ' + line;
      }
    });

    if (title && contentText) {
      sections.push({ title, content: contentText });
    }
  });

  return sections;
};

// 解析FAQ文件
const parseFaqFile = (content) => {
  const faqs = [];
  const faqBlocks = content.split('---').filter(block => block.trim());

  faqBlocks.forEach(block => {
    const lines = block.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));

    let question = '';
    let answer = '';

    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('QUESTION:')) {
        question = line.substring(9).trim();
      } else if (line.startsWith('ANSWER:')) {
        answer = line.substring(7).trim();
      } else if (answer) {
        answer += ' ' + line;
      }
    });

    if (question && answer) {
      faqs.push({ question, answer });
    }
  });

  return faqs;
};

// 生成对比表格（自动从前5个产品生成）
const generateComparisonTable = () => {
  const top5 = formData.products.slice(0, 5);

  formData.comparisonTable.rows = top5.map(product => {
    // 从产品特点中提取关键参数
    const features = product.features.join(' ');

    // 提取峰值电流
    const peakAmpsMatch = features.match(/(\d+)A/);
    const peakAmps = peakAmpsMatch ? `${peakAmpsMatch[1]}A` : 'N/A';

    // 提取电池容量
    const batteryMatch = features.match(/(\d+)mAh/);
    const batteryCapacity = batteryMatch ? `${batteryMatch[1]}mAh` : 'N/A';

    // 检查是否有充气泵
    const hasCompressor = features.toLowerCase().includes('compressor') || features.includes('PSI');
    const compressorMatch = features.match(/(\d+)\s*PSI/i);
    const airCompressor = hasCompressor && compressorMatch ? `${compressorMatch[1]} PSI` : 'No';

    // 提取快充信息
    const fastChargeMatch = features.match(/(\d+)W\s*(USB-C|PD|fast\s*charg)/i);
    const fastCharge = fastChargeMatch ? `${fastChargeMatch[1]}W ${fastChargeMatch[2]}` : 'Standard';

    return {
      product: `${product.brand} ${product.title.split(' ').slice(0, 3).join(' ')}`,
      peakAmps: peakAmps,
      batteryCapacity: batteryCapacity,
      airCompressor: airCompressor,
      fastCharge: fastCharge,
      price: product.price,
      score: `${product.expertScore}/10`
    };
  });
};

// 处理文件上传
const handleFileUpload = async (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const content = await file.text();

    switch (type) {
      case 'products':
        formData.products = parseProductsFile(content);
        uploadedFiles.products = true;
        // 产品列表更新后，自动生成对比表格
        generateComparisonTable();
        alert(`✅ 成功解析 ${formData.products.length} 个产品！\n对比表格已自动生成（前5名产品）。`);
        break;
      case 'guide':
        formData.buyingGuide.sections = parseGuideFile(content);
        uploadedFiles.guide = true;
        alert(`✅ 成功解析 ${formData.buyingGuide.sections.length} 个购买指南章节！`);
        break;
      case 'faq':
        formData.faqs = parseFaqFile(content);
        uploadedFiles.faq = true;
        alert(`✅ 成功解析 ${formData.faqs.length} 个FAQ！`);
        break;
    }
  } catch (error) {
    alert(`❌ 文件解析失败: ${error.message}`);
    console.error('文件解析错误:', error);
  }
};

// 加载现有数据
const loadExistingData = async () => {
  if (!formData.category) return;

  try {
    const response = await fetch(`/data/${formData.category}.json`);
    if (response.ok) {
      const data = await response.json();

      formData.pageTitle = data.pageTitle || '';
      formData.heading = data.heading || '';
      formData.subtitle = data.subtitle || '';
      formData.lastUpdated = data.lastUpdated || '';
      formData.products = data.products || [];
      formData.comparisonTable = data.comparisonTable || formData.comparisonTable;
      formData.buyingGuide = data.buyingGuide || formData.buyingGuide;
      formData.faqs = data.faqs || [];

      uploadedFiles.products = formData.products.length > 0;
      uploadedFiles.guide = formData.buyingGuide.sections.length > 0;
      uploadedFiles.faq = formData.faqs.length > 0;

      alert('✅ 已加载现有数据！');
    } else {
      alert('ℹ️ 该类目暂无数据，请从模板开始创建');
    }
  } catch (error) {
    alert('❌ 加载数据失败');
    console.error('加载数据错误:', error);
  }
};

// 生成 JSON 数据
const generateJsonData = () => {
  return {
    pageTitle: formData.pageTitle,
    heading: formData.heading,
    subtitle: formData.subtitle,
    lastUpdated: formData.lastUpdated,
    products: formData.products,
    comparisonTable: formData.comparisonTable,
    buyingGuide: formData.buyingGuide,
    faqs: formData.faqs
  };
};

// 预览 JSON
const previewJson = () => {
  const data = generateJsonData();
  jsonPreview.value = JSON.stringify(data, null, 2);
  showPreview.value = true;
};

// 保存并下载
const saveAndDownload = () => {
  if (!formData.category) {
    alert('请先选择类目！');
    return;
  }

  if (!hasData.value) {
    alert('请先上传数据文件！');
    return;
  }

  const data = generateJsonData();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${formData.category}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert(`✅ JSON 文件已下载！\n\n请将 ${formData.category}.json 文件替换到:\nfrontend/public/data/ 目录`);
};
</script>

<style scoped>
.product-form {
  max-width: 1400px;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e8e8e8;
}

.form-header h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 28px;
}

.category-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-selector label {
  font-weight: 600;
  color: #555;
  font-size: 16px;
}

.category-selector select {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-width: 350px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-selector select:focus {
  outline: none;
  border-color: #6b9bd1;
  box-shadow: 0 0 0 3px rgba(107, 155, 209, 0.1);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.form-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.form-section h3 {
  margin-bottom: 25px;
  color: #333;
  font-size: 22px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #6b9bd1;
  box-shadow: 0 0 0 3px rgba(107, 155, 209, 0.1);
}

.workflow-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 40px;
  border-radius: 16px;
  border: 2px solid #dee2e6;
}

.workflow-section h3 {
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  text-align: center;
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.workflow-step {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  gap: 20px;
  border: 2px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s;
}

.workflow-step:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.step-number {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6b9bd1 0%, #5a8bc2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(107, 155, 209, 0.3);
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin-bottom: 10px;
  color: #333;
  font-size: 18px;
}

.step-content p {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.6;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-template {
  padding: 12px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.2);
}

.btn-template:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.template-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #6b9bd1;
}

.info-item {
  margin-bottom: 15px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item strong {
  display: block;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
}

.info-item ul {
  margin: 8px 0 0 20px;
  color: #666;
  font-size: 13px;
}

.info-item li {
  margin-bottom: 4px;
}

.upload-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.upload-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
  transition: all 0.3s;
}

.upload-item:hover {
  border-color: #6b9bd1;
  background: #fff;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.upload-label span:first-child {
  font-weight: 600;
  color: #555;
  min-width: 150px;
}

.upload-label input[type="file"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.file-status {
  color: #28a745;
  font-weight: 600;
  font-size: 14px;
}

.preview-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #28a745;
}

.data-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}

.summary-item {
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  text-align: center;
  border: 1px solid #dee2e6;
}

.summary-item strong {
  display: block;
  color: #666;
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-size: 28px;
  font-weight: 700;
  color: #28a745;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
}

.btn-save,
.btn-preview,
.btn-load {
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.btn-save {
  background: #007bff;
  color: white;
}

.btn-save:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.btn-preview {
  background: #6c757d;
  color: white;
}

.btn-preview:hover:not(:disabled) {
  background: #545b62;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.btn-load {
  background: #17a2b8;
  color: white;
}

.btn-load:hover {
  background: #138496;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
}

.btn-save:disabled,
.btn-preview:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.json-preview {
  margin-top: 30px;
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 25px;
  border-radius: 12px;
  max-height: 600px;
  overflow: auto;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #444;
}

.preview-header h4 {
  margin: 0;
  color: #fff;
  font-size: 18px;
}

.btn-close {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-close:hover {
  background: #c82333;
}

.json-preview pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.empty-state {
  text-align: center;
  padding: 100px 20px;
  color: #999;
  font-size: 20px;
}
</style>
