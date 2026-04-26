import { AuthApiResponse, User } from '../models/auth.model';

/**
 * AuthMapper — Converts raw JWT API response ↔ clean domain model.
 */
export class AuthMapper {
  static userFromApi(raw: AuthApiResponse): User {
    return {
      id:        raw.user.id,
      name:      raw.user.name,
      email:     raw.user.email,
      role:      raw.user.role as 'admin' | 'editor' | 'viewer',
      avatarUrl: raw.user.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(raw.user.name)}&background=4F46E5&color=fff`,
    };
  }

  static expiresAt(raw: AuthApiResponse): number {
    return Date.now() + raw.expires_in * 1000;
  }
}
