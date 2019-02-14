import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionService: PermissionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const keys = route.data.permissions.keys;

    return this.permissionService.hasPermissions(keys);
  }
}
