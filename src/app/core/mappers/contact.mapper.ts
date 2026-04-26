import { ContactApiResponse, ContactMessage } from '../models/contact.model';

/**
 * ContactMapper — Converts raw API data ↔ clean domain model.
 */
export class ContactMapper {
  /** Map API response → domain model */
  static fromApi(raw: ContactApiResponse): ContactMessage {
    return {
      id:        raw.id,
      name:      raw.name,
      email:     raw.email,
      phone:     raw.phone ?? '',
      message:   raw.message,
      service:   raw.service ?? '',
      createdAt: new Date(raw.created_at),
      status:    raw.status,
    };
  }

  /** Map domain model → API payload (for POST/PUT) */
  static toApi(model: Partial<ContactMessage>): Partial<ContactApiResponse> {
    return {
      name:    model.name,
      email:   model.email,
      phone:   model.phone   ?? null,
      message: model.message,
      service: model.service ?? null,
    };
  }

  /** Map array of API responses */
  static fromApiList(list: ContactApiResponse[]): ContactMessage[] {
    return list.map(item => ContactMapper.fromApi(item));
  }
}
