export interface Merchant {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  merchant: Merchant;
}

export interface AuthContextType {
  merchant: Merchant | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
  merchant: Merchant;
}