import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecordsService {
  constructor(private http: HttpClient) { }

  getLatestRecords() {
    return this.http.get('/api/records/latest');
  }
}
