import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) { }

  GET(url: string, data?: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(environment.API_BASE + url, { headers: headers })
  }
}
