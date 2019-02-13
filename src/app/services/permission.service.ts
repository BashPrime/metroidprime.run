import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { UserPermissions } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: UserPermissions;
  private permissionsSubject = new ReplaySubject<UserPermissions>(1);
  permissions$ = this.permissionsSubject.asObservable();

  // "Current Game". If defined, this is used to enforce moderator permissions.
  private game: string;
  private gameSubject = new ReplaySubject<string>(1);
  game$ = this.gameSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetch() {
    this.http.get('/api/permissions').subscribe(res => {
      const data = res['data'] as UserPermissions;
      this.permissionsSubject.next(data);
      this.permissions = data;
    });
  }

  setGame(game: string) {
    this.game = game;
    this.gameSubject.next(game);
  }
}
