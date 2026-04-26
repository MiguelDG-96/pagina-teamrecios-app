import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactApiResponse, ContactMessage } from '../models/contact.model';
import { ContactMapper } from '../mappers/contact.mapper';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly baseUrl = `${environment.apiUrl}/contact`;

  constructor(private readonly http: HttpClient) {}

  sendMessage(payload: Partial<ContactMessage>): Observable<ContactMessage> {
    const body = ContactMapper.toApi(payload);
    return this.http
      .post<ContactApiResponse>(this.baseUrl, body)
      .pipe(map(res => ContactMapper.fromApi(res)));
  }

  getAll(): Observable<ContactMessage[]> {
    return this.http
      .get<ContactApiResponse[]>(this.baseUrl)
      .pipe(map(res => ContactMapper.fromApiList(res)));
  }

  markAsRead(id: number): Observable<ContactMessage> {
    return this.http
      .patch<ContactApiResponse>(`${this.baseUrl}/${id}/read`, {})
      .pipe(map(res => ContactMapper.fromApi(res)));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
