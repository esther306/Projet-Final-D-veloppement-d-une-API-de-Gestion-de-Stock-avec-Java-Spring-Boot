import { BaseApiService } from "./api/BaseApiService";

export class ProductService extends BaseApiService {
  constructor() {
    super('/products');
  }

  async getProducts(filters = {}) {
    const { page = 1, limit = 10, search = '', category = '', sortBy = 'name', sortOrder = 'asc' } = filters;
    
    const queryParams = this.buildQueryParams({
      page,
      limit,
      search,
      category,
      sortBy,
      sortOrder
    });
    
    return await this.get(`?${queryParams}`);
  }

  async getProductById(id) {
    return await this.get(`/${id}`);
  }

  async createProduct(productData) {
    return await this.post('', productData);
  }

  async updateProduct(id, productData) {
    return await this.put(`/${id}`, productData);
  }

  async deleteProduct(id) {
    return await this.delete(`/${id}`);
  }

  async getProductsByCategory(categoryId) {
    return await this.get(`/category/${categoryId}`);
  }

  async searchProducts(searchTerm) {
    const queryParams = this.buildQueryParams({ search: searchTerm });
    return await this.get(`/search?${queryParams}`);
  }
}