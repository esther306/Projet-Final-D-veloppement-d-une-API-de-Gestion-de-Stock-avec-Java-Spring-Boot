import { BaseApiService } from "./api/BaseApiService";

export class CommandeClientService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/commandesclients');
  }

  // PUT /gestiondestock/api/v1/commandesclients/update/{idCommandeClient}
  async updateCommandeClient(idCommandeClient, commandeData) {
    return await this.put(`/update/${idCommandeClient}`, commandeData);
  }

  // POST /gestiondestock/api/v1/commandesclients/create
  async createCommandeClient(commandeData) {
    return await this.post('/create', commandeData);
  }

  // GET /gestiondestock/api/v1/commandesclients/{idCommandeClient}
  async getCommandeClientById(idCommandeClient) {
    return await this.get(`/${idCommandeClient}`);
  }

  // GET /gestiondestock/api/v1/commandesclients/showAll
  async getAllCommandesClients() {
    return await this.get('/showAll');
  }

  // GET /gestiondestock/api/v1/commandesclients/code/{codeCommandeClient}
  async getCommandeClientByCode(codeCommandeClient) {
    return await this.get(`/code/${codeCommandeClient}`);
  }

  // DELETE /gestiondestock/api/v1/commandesclients/delete/{idCommandeClient}
  async deleteCommandeClient(idCommandeClient) {
    return await this.delete(`/delete/${idCommandeClient}`);
  }
}