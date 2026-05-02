export interface AuthApiResponse {
  token: string;
  tipo: string;
  expiresIn: number;
  usuario: {
    id: number;
    nombre: string;
    email: string;
    role: string;
    rolNombre?: string;
  };
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
}
