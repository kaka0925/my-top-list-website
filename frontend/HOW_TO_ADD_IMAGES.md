# 如何添加产品图片

## 方法：只需更新主产品列表中的图片地址

对比表格会自动从主产品列表中获取图片，所以你只需要在一个地方更新即可。

### 步骤：

1. 打开 `frontend/public/data/jump-starter.json`

2. 在 `products` 数组中找到对应的产品，更新 `image` 字段：

```json
{
  "id": 1,
  "rank": 1,
  "brand": "WOLFBOX",
  "title": "4000A Jump Starter with 160PSI Air Compressor",
  "image": "https://m.media-amazon.com/images/I/71abc123.jpg",  // 👈 更新这里
  "amazonLink": "https://www.amazon.com/dp/B0ABC123",  // 👈 也可以更新 Amazon 链接
  ...
}
```

3. 保存文件，对比表格会自动使用相同的图片和链接

### 示例：

**之前：**
```json
"image": "https://via.placeholder.com/220"
```

**更新后：**
```json
"image": "https://m.media-amazon.com/images/I/71NqX9pVKCL._AC_SL1500_.jpg"
```

### 图片要求：

- 建议尺寸：至少 500x500 像素
- 格式：JPG 或 PNG
- 背景：白色背景效果最佳
- 来源：可以从 Amazon 产品页面获取高清图片

### 获取 Amazon 图片的方法：

1. 访问产品的 Amazon 页面
2. 右键点击产品主图 → "在新标签页中打开图片"
3. 复制图片 URL
4. 粘贴到 JSON 文件的 `image` 字段中

### 对比表格自动同步：

更新主产品列表中的图片后，对比表格会自动使用相同的图片，无需手动维护两处数据。

### 优势：

✅ 只需维护一处数据（主产品列表）
✅ 对比表格自动同步
✅ 避免数据不一致
✅ 更容易维护和更新
