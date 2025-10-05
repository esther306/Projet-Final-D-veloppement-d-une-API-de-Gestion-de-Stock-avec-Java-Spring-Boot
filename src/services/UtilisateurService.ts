import { BaseApiService } from "./api/BaseApiService";

export class UtilisateurService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/utilisateurs');
  }

  // PUT /gestiondestock/api/v1/utilisateurs/update/{idUtilisateur}
  async updateUtilisateur(idUtilisateur, userData) {
    return await this.put(`/update/${idUtilisateur}`, userData);
  }

  // POST /gestiondestock/api/v1/utilisateurs/create
  async createUtilisateur(userData) {
    return await this.post('/create', userData);
  }

  // GET /gestiondestock/api/v1/utilisateurs/{idUtilisateur}
  async getUtilisateurById(idUtilisateur) {
    return await this.get(`/${idUtilisateur}`);
  }

  // GET /gestiondestock/api/v1/utilisateurs/showAll
  async getAllUtilisateurs() {
    return await this.get('/showAll');
  }

  // DELETE /gestiondestock/api/v1/utilisateurs/delete/{idUtilisateur}
  async deleteUtilisateur(idUtilisateur) {
    return await this.delete(`/delete/${idUtilisateur}`);
  }
}