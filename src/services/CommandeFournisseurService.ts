import { BaseApiService } from "./api/BaseApiService";

export class CommandeFournisseurService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/commandesfournisseurs');
  }

  // PUT /gestiondestock/api/v1/commandesfournisseurs/update/{idCommandeFournisseur}
  async updateCommandeFournisseur(idCommandeFournisseur, commandeData) {
    return await this.put(`/update/${idCommandeFournisseur}`, commandeData);
  }

  // POST /gestiondestock/api/v1/commandesfournisseurs/create
  async createCommandeFournisseur(commandeData) {
    return await this.post('/create', commandeData);
  }

  // GET /gestiondestock/api/v1/commandesfournisseurs/{idCommandeFournisseur}
  async getCommandeFournisseurById(idCommandeFournisseur) {
    return await this.get(`/${idCommandeFournisseur}`);
  }

  // GET /gestiondestock/api/v1/commandesfournisseurs/showAll
  async getAllCommandesFournisseurs() {
    return await this.get('/showAll');
  }

  // GET /gestiondestock/api/v1/commandesfournisseurs/code/{codeCommandeFournisseur}
  async getCommandeFournisseurByCode(codeCommandeFournisseur) {
    return await this.get(`/code/${codeCommandeFournisseur}`);
  }

  // DELETE /gestiondestock/api/v1/commandesfournisseurs/delete/{idCommandeFournisseur}
  async deleteCommandeFournisseur(idCommandeFournisseur) {
    return await this.delete(`/delete/${idCommandeFournisseur}`);
  }
}