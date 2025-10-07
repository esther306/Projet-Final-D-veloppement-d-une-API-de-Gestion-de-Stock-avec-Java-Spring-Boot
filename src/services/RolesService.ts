import { BaseApiService } from "./api/BaseApiService";

export class RolesService extends BaseApiService {
  constructor() {
    super('/gestiondestock/api/v1/roles');
  }

  // PUT /gestiondestock/api/v1/roles/update/{idRole}
  async updateRole(idRole, roleData) {
    return await this.put(`/update/${idRole}`, roleData);
  }

  // POST /gestiondestock/api/v1/roles/create
  async createRole(roleData) {
    return await this.post('/create', roleData);
  }

  // GET /gestiondestock/api/v1/roles/{idRole}
  async getRoleById(idRole) {
    return await this.get(`/${idRole}`);
  }

  // GET /gestiondestock/api/v1/roles/showAll
  async getAllRoles() {
    return await this.get('/showAll');
  }

  // DELETE /gestiondestock/api/v1/roles/delete/{idRole}
  async deleteRole(idRole) {
    return await this.delete(`/delete/${idRole}`);
  }
}
