import { AuthApiResponse, User } from '../models/auth.model';

/**
 * AuthMapper — Converts raw JWT API response ↔ clean domain model.
 */
export class AuthMapper {
  static userFromApi(raw: AuthApiResponse): User {
    return {
      id:     raw.usuario.id,
      nombre: raw.usuario.nombre,
      email:  raw.usuario.email,
      role:   raw.usuario.rolNombre || raw.usuario.role || 'admin',
    };
  }

  static expiresAt(raw: AuthApiResponse): number {
    return Date.now() + (raw.expiresIn || 86400) * 1000;
  }
}
