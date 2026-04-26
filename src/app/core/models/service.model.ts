/** Represents a service/product offering */
export interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  badge: string | null;
  order: number;
}

/** Raw API payload */
export interface ServiceApiResponse {
  id: number;
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  badge: string | null;
  sort_order: number;
}
