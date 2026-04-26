/** Raw API response shape for a contact form submission */
export interface ContactApiResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  service: string | null;
  created_at: string;
  status: 'pending' | 'read' | 'replied';
}

/** Clean domain model used inside the app */
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  createdAt: Date;
  status: 'pending' | 'read' | 'replied';
}
