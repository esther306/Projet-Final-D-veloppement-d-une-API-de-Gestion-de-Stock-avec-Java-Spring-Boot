import { BaseApiService } from "./api/BaseApiService";

export class CategorieService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/categories');
  }

  // PUT /gestiondestock/api/v1/categories/update/{idCategorie}
  async updateCategorie(idCategorie, categorieData) {
    return await this.put(`/update/${idCategorie}`, categorieData);
  }

  // POST /gestiondestock/api/v1/categories/create
  async createCategorie(categorieData) {
    return await this.post('/create', categorieData);
  }

  // GET /gestiondestock/api/v1/categories/{idCategorie}
  async getCategorieById(idCategorie) {
    return await this.get(`/${idCategorie}`);
  }

  // GET /gestiondestock/api/v1/categories/showAll
  async getAllCategories() {
    return await this.get('/showAll');
  }

  // GET /gestiondestock/api/v1/categories/code/{codeCategorie}
  async getCategorieByCode(codeCategorie) {
    return await this.get(`/code/${codeCategorie}`);
  }

  // DELETE /gestiondestock/api/v1/categories/delete/{idCategorie}
  async deleteCategorie(idCategorie) {
    return await this.delete(`/delete/${idCategorie}`);
  }
}