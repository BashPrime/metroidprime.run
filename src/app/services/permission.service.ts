import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserPermissions } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionsFetched = false;
  private gameSet = false;

  private permissionsSubject = new ReplaySubject<UserPermissions>(1);
  permissions$ = this.permissionsSubject.asObservable();

  // "Current Game". If defined, this is used to enforce moderator permissions.
  private gameSubject = new ReplaySubject<string>(1);
  game$ = this.gameSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetch() {
    this.permissionsFetched = true;
    this.http.get('/api/permissions').subscribe(res => {
      const userPermissions = new UserPermissions();
      Object.assign(userPermissions, res['data']);
      this.permissionsSubject.next(userPermissions);
    });
  }

  setGame(game: string) {
    if (!this.gameSet) {
      this.gameSet = true;
    }
    this.gameSubject.next(game);
  }

  hasPermission(key: string, forGame?: boolean): Observable<boolean> {
    if (!this.permissionsFetched) {
      this.fetch();
    }

    if (forGame) {
      return combineLatest(this.permissions$, this.game$).pipe(map(([userPermissions, game]) => {
        return userPermissions.hasPermissionKey(key) && userPermissions.isAuthorizedForGame(game);
      }));
    }

    return this.permissions$.pipe(map(userPermissions => {
      return userPermissions.hasPermissionKey(key);
    }));
  }

  hasPermissions(keys: string[], forGame?: boolean): Observable<boolean> {
    const sources: Observable<boolean>[] = [];
    for(const key of keys) {
      sources.push(this.hasPermission(key, forGame));
    }

    return combineLatest(sources).pipe(map(data => {
      return data.includes(true) && !data.includes(false);
    }));
  }

  hasGameSet() {
    return this.gameSet;
  }
}
