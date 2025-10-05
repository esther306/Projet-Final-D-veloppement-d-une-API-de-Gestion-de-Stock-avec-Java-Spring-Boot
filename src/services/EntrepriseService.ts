import { BaseApiService } from "./api/BaseApiService";

export class EntrepriseService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/entreprises');
  }

  // PUT /gestiondestock/api/v1/entreprises/update/{idEntreprise}
  async updateEntreprise(idEntreprise, entrepriseData) {
    return await this.put(`/update/${idEntreprise}`, entrepriseData);
  }

  // POST /gestiondestock/api/v1/entreprises/create
  async createEntreprise(entrepriseData) {
    return await this.post('/create', entrepriseData);
  }

  // GET /gestiondestock/api/v1/entreprises/{idEntreprise}
  async getEntrepriseById(idEntreprise) {
    return await this.get(`/${idEntreprise}`);
  }

  // GET /gestiondestock/api/v1/entreprises/showAll
  async getAllEntreprises() {
    return await this.get('/showAll');
  }

  // DELETE /gestiondestock/api/v1/entreprises/delete/{idEntreprise}
  async deleteEntreprise(idEntreprise) {
    return await this.delete(`/delete/${idEntreprise}`);
  }
}