import { BaseApiService } from "./api/BaseApiService";

export class MvtStkService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/mvtstk');
  }

  // PUT /gestiondestock/api/v1/mvtstk/update/{idMvtStk}
  async updateMouvement(idMvtStk, mouvementData) {
    return await this.put(`/update/${idMvtStk}`, mouvementData);
  }

  // POST /gestiondestock/api/v1/mvtstk/create
  async createMouvement(mouvementData) {
    return await this.post('/create', mouvementData);
  }

  // GET /gestiondestock/api/v1/mvtstk/{idMvtStk}
  async getMouvementById(idMvtStk) {
    return await this.get(`/${idMvtStk}`);
  }

  // GET /gestiondestock/api/v1/mvtstk/showAll
  async getAllMouvements() {
    return await this.get('/showAll');
  }

  // DELETE /gestiondestock/api/v1/mvtstk/delete/{idMvtStk}
  async deleteMouvement(idMvtStk) {
    return await this.delete(`/delete/${idMvtStk}`);
  }
}