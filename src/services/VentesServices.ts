import { BaseApiService } from "./api/BaseApiService";

export class VentesService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/ventes');
  }

  // PUT /gestiondestock/api/v1/ventes/update/{idVente}
  async updateVente(idVente, venteData) {
    return await this.put(`/update/${idVente}`, venteData);
  }

  // POST /gestiondestock/api/v1/ventes/create
  async createVente(venteData) {
    return await this.post('/create', venteData);
  }

  // GET /gestiondestock/api/v1/ventes/{idVente}
  async getVenteById(idVente) {
    return await this.get(`/${idVente}`);
  }

  // GET /gestiondestock/api/v1/ventes/showAll
  async getAllVentes() {
    return await this.get('/showAll');
  }

  // GET /gestiondestock/api/v1/ventes/code/{codeVente}
  async getVenteByCode(codeVente) {
    return await this.get(`/code/${codeVente}`);
  }

  // DELETE /gestiondestock/api/v1/ventes/delete/{idVente}
  async deleteVente(idVente) {
    return await this.delete(`/delete/${idVente}`);
  }
}