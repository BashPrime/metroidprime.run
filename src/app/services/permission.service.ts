import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserPermissions } from '../model/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionsFetched = false;

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

  setPermissions(permissions: UserPermissions) {
    this.permissionsFetched = true;
    this.permissionsSubject.next(permissions);
  }

  resetPermissions() {
    if (this.permissionsFetched) {
      this.permissionsFetched = false;
      this.permissionsSubject = new ReplaySubject<UserPermissions>(1);
      this.permissions$ = this.permissionsSubject.asObservable();
    }
  }

  setGame(game: string) {
    this.gameSubject.next(game);
  }

  resolvePermissions() {
    if (!this.permissionsFetched) {
      this.fetch();
    }

    return this.permissions$.pipe(map(data => {
      return true;
    }));
  }

  hasPermission(key: string, forGame?: boolean): Observable<boolean> {
    if (!this.permissionsFetched) {
      this.fetch();
    }

    if (forGame) {
      return combineLatest(this.permissions$, this.game$).pipe(map(([userPermissions, game]) => {
        // userPermissions may not necessarily be defined, such as if no user is logged into client
        return userPermissions && userPermissions.hasPermissionKey(key) && userPermissions.isAuthorizedForGame(game);
      }));
    }

    return this.permissions$.pipe(map(userPermissions => {
      // userPermissions may not necessarily be defined, such as if no user is logged into client
      return userPermissions && userPermissions.hasPermissionKey(key);
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
}

@Injectable()
export class PermissionObjectResolve implements Resolve<Object> {
  constructor(private permissionService: PermissionService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.permissionService.resolvePermissions();
  }
}
