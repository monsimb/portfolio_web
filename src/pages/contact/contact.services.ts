import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  position: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private endpoint = '/api/contact';

  send(payload: ContactPayload): Observable<void> {
    return this.http.post<void>(this.endpoint, payload);
  }
}
