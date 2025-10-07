import { BaseApiService } from "./api/BaseApiService";

export class FournisseurService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/fournisseurs');
  }

  // PUT /gestiondestock/api/v1/fournisseurs/update/{idFournisseur}
  async updateFournisseur(idFournisseur, fournisseurData) {
    return await this.put(`/update/${idFournisseur}`, fournisseurData);
  }

  // POST /gestiondestock/api/v1/fournisseurs/create
  async createFournisseur(fournisseurData) {
    return await this.post('/create', fournisseurData);
  }

  // GET /gestiondestock/api/v1/fournisseurs/{idFournisseur}
  async getFournisseurById(idFournisseur) {
    return await this.get(`/${idFournisseur}`);
  }

  // GET /gestiondestock/api/v1/fournisseurs/showAll
  async getAllFournisseurs() {
    return await this.get('/showAll');
  }

  // DELETE /gestiondestock/api/v1/fournisseurs/delete/{idFournisseur}
  async deleteFournisseur(idFournisseur) {
    return await this.delete(`/delete/${idFournisseur}`);
  }
}