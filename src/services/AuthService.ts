import { BaseApiService } from "./api/BaseApiService";

export class AuthService extends BaseApiService {
  constructor() {
    super('/auth');
  }

  async login(credentials) {
    const response = await this.post('/login', credentials);
    
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  async register(userData) {
    return await this.post('/register', userData);
  }

  async logout() {
    const response = await this.post('/logout');
    
    if (response.success) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    
    return response;
  }

  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}