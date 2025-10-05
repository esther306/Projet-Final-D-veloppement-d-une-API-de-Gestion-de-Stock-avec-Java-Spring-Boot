import { BaseApiService } from "./api/BaseApiService";

export class ArticleService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/articles');
  }

  // PUT /gestiondestock/api/v1/articles/update/{idArticle}
  async updateArticle(idArticle, articleData) {
    return await this.put(`/update/${idArticle}`, articleData);
  }

  // POST /gestiondestock/api/v1/articles/create
  async createArticle(articleData) {
    return await this.post('/create', articleData);
  }

  // GET /gestiondestock/api/v1/articles/showAll
  async getAllArticles() {
    return await this.get('/showAll');
  }

  // GET /gestiondestock/api/v1/articles/id/{idArticle}
  async getArticleById(idArticle) {
    return await this.get(`/id/${idArticle}`);
  }

  // GET /gestiondestock/api/v1/articles/code/{codeArticle}
  async getArticleByCode(codeArticle) {
    return await this.get(`/code/${codeArticle}`);
  }

  // DELETE /gestiondestock/api/v1/articles/delete/{idArticle}
  async deleteArticle(idArticle) {
    return await this.delete(`/delete/${idArticle}`);
  }
}