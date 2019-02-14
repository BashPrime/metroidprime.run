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

  private permissions: UserPermissions;
  private permissionsSubject = new ReplaySubject<UserPermissions>(1);
  permissions$ = this.permissionsSubject.asObservable();

  // "Current Game". If defined, this is used to enforce moderator permissions.
  private game: string;
  private gameSubject = new ReplaySubject<string>(1);
  game$ = this.gameSubject.asObservable();

  constructor(private http: HttpClient) {
    this.gameSubject.next(null);
  }

  fetch() {
    this.permissionsFetched = true;
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

  hasPermission(key: string): Observable<boolean> {
    if (!this.permissionsFetched) {
      this.fetch();
    }

    return this.permissions$.pipe(map(data => {
      // Check if user has permissions
      if (!data.permissions || !data.role) {
        return false;
      }

      // Check if user has matching wildcard permission for permission module.
      // Permissions are always formatted as 'module.permission'.
      const wildCardPerms = data.permissions.map(permission => permission.value).filter(permission => permission.indexOf('*') > -1);
      if (wildCardPerms) {
        // Get permission module and append wildcard to it
        const wildCardKey = key.split('.')[0] + '.*';
        if (wildCardPerms.includes(wildCardKey)) {
          return true;
        }
      }

      // If no wildcards are found, check if user has exact permission key
      return data.permissions.includes(key);
    }));
  }

  hasPermissions(keys: string[]): Observable<boolean> {
    const sources: Observable<boolean>[] = [];
    for(const key of keys) {
      sources.push(this.hasPermission(key));
    }

    return combineLatest(sources).pipe(map(data => {
      return data.includes(true) && !data.includes(false);
    }));
  }
}
