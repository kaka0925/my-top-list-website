import { ref } from 'vue';

export function useProducts(category) {
  const products = ref([]);
  const pageData = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async () => {
    console.log('[useProducts] Starting to fetch products for category:', category);
    loading.value = true;
    error.value = null;

    try {
      const url = `/data/${category}.json`;
      console.log('[useProducts] Fetching from URL:', url);
      const response = await fetch(url);
      console.log('[useProducts] Response status:', response.status, response.ok);

      if (!response.ok) {
        throw new Error(`Failed to load ${category} data`);
      }
      const data = await response.json();
      console.log('[useProducts] Data loaded:', data);
      console.log('[useProducts] Products count:', data.products?.length);

      // 自动构建对比表格产品数据，从主产品列表中获取完整信息
      if (data.comparisonTable && data.comparisonTable.products && data.products) {
        data.comparisonTable.products = data.comparisonTable.products.map(compProduct => {
          // 根据 id 查找主产品
          const mainProduct = data.products.find(p => p.id === compProduct.id);

          if (mainProduct) {
            // 从主产品获取基础信息，保留对比表格中的规格数据
            return {
              id: mainProduct.id,
              brand: mainProduct.brand,
              title: mainProduct.title,
              image: mainProduct.image,
              amazonLink: mainProduct.amazonLink,
              // 保留对比表格中定义的规格数据
              peakAmps: compProduct.peakAmps,
              batteryCapacity: compProduct.batteryCapacity,
              airCompressor: compProduct.airCompressor,
              fastCharge: compProduct.fastCharge,
              price: compProduct.price,
              score: compProduct.score
            };
          }
          return compProduct;
        });
        console.log('[useProducts] Comparison table built from main product list');
      }

      pageData.value = data;
      products.value = data.products || [];
      console.log('[useProducts] Products set to ref:', products.value.length);
    } catch (err) {
      error.value = err.message;
      console.error('[useProducts] Error loading products:', err);
    } finally {
      loading.value = false;
      console.log('[useProducts] Loading complete. Products count:', products.value.length);
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
