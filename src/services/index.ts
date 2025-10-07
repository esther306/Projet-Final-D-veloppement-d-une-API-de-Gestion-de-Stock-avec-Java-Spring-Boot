import { ArticleService } from './ArticleService';
import { AuthService } from './AuthService';
import { CategorieService } from './CategorieService';
import { ClientService } from './ClientService';
import { CommandeClientService } from './CommandeClientService';
import { CommandeFournisseurService } from './CommandeFournisseurService';
import { EntrepriseService } from './EntrepriseService';
import { FournisseurService } from './FournisseurService';
import { MvtStkService } from './MvtStkService';
import { RolesService } from './RolesService';
import { UtilisateurService } from './UtilisateurService';
import { VentesService } from './VentesServices';

export { BaseApiService } from './api/BaseApiService';
export { apiClient, API_CONFIG } from './api/config';

// Service instances - Ready to use in your components
export const authService = new AuthService();
export const ventesService = new VentesService();
export const utilisateurService = new UtilisateurService();
export const rolesService = new RolesService();
export const mvtStkService = new MvtStkService();
export const fournisseurService = new FournisseurService();
export const entrepriseService = new EntrepriseService();
export const commandeFournisseurService = new CommandeFournisseurService();
export const commandeClientService = new CommandeClientService();
export const clientService = new ClientService();
export const categorieService = new CategorieService();
export const articleService = new ArticleService();