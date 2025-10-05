import { BaseApiService } from "./api/BaseApiService";

export class ClientService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/clients');
  }

  // PUT /gestiondestock/api/v1/clients/update/{idClient}
  async updateClient(idClient, clientData) {
    return await this.put(`/update/${idClient}`, clientData);
  }

  // POST /gestiondestock/api/v1/clients/create
  async createClient(clientData) {
    return await this.post('/create', clientData);
  }

  // GET /gestiondestock/api/v1/clients/{idClient}
  async getClientById(idClient) {
    return await this.get(`/${idClient}`);
  }

  // GET /gestiondestock/api/v1/clients/showAll
  async getAllClients() {
    return await this.get('/showAll');
  }

  // DELETE /gestiondestock/api/v1/clients/delete/{idClient}
  async deleteClient(idClient) {
    return await this.delete(`/delete/${idClient}`);
  }
}