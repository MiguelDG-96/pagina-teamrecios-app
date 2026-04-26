import { ServiceApiResponse, Service } from '../models/service.model';

/**
 * ServiceMapper — Converts raw API data ↔ clean domain model.
 */
export class ServiceMapper {
  static fromApi(raw: ServiceApiResponse): Service {
    return {
      id:          raw.id,
      slug:        raw.slug,
      icon:        raw.icon,
      title:       raw.title,
      description: raw.description,
      features:    raw.features,
      badge:       raw.badge,
      order:       raw.sort_order,
    };
  }

  static fromApiList(list: ServiceApiResponse[]): Service[] {
    return list.map(item => ServiceMapper.fromApi(item));
  }
}
