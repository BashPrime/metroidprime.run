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
    const routePerms = route.data.permissions;

    // If permissions are game-based, get game parameter from route parent (since we can't resolve the game yet)
    if (routePerms.forGame && !this.permissionService.hasGameSet()) {
      let currentRoute = route;
      for(let i = 0; i < route.data.levelsToGameParent; i++) {
        currentRoute = route.parent;
      }
      this.permissionService.setGame(currentRoute.params.game);
    }

    return this.permissionService.hasPermissions(routePerms.keys, routePerms.forGame);
  }
}
