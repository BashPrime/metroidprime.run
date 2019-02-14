export class User {
  id: number;
  name: string;
  displayname: string;
  twitter: string;
  twitch: string;
  youtube: string;
}

export class LoggedInUser extends User {
  private role: any;
  private permissions: any[];
  private games: any[];
  private readonly MODERATOR_ROLE = 'moderator';

  hasPermission(permissionKey: string, gameAbbr?: any): boolean {
    // Check if user has permissions
    if (!this.permissions || !this.role) {
      return false;
    }

    // Check if user has matching wildcard permission for permission module.
    // Permissions are always formatted as 'module.permission'.
    const wildCardPerms = this.permissions.map(permission => permission.value).filter(permission => permission.indexOf('*') > -1);
    if (wildCardPerms) {
      // Get permission module and append wildcard to it
      const wildCardKey = permissionKey.split('.')[0] + '.*';
      if (wildCardPerms.find(permission => permission === wildCardKey)) {
        return true;
      }
    }

    // If no wildcards are found, check for an exact match.
    const permissionFound = this.permissions.find(permission => permission.value === permissionKey);
    
    // If the user is a moderator and a game is passed into the function, verify the moderator is assigned to the game.
    if (permissionFound && gameAbbr && this.role.name === this.MODERATOR_ROLE) {
      return this.games.find(game => game.abbreviation === gameAbbr);
    }

    // Otherwise, this is a sitewide permission check
    return permissionFound;
  }

  setPermissions(permissionObj) {
    Object.assign(this, permissionObj);
  }
}

export class UserPermissions {
  private role: any;
  private permissions: any[];
  private games: any[];
  
  hasPermissionKey(key: string) {
    // Check if user has permissions
    if (!this.permissions) {
      return false;
    }

    // Check if user has matching wildcard permission for permission module.
    // Permissions are always formatted as 'module.permission'.
    // Get permission module and append wildcard to it
    const wildcardKey = key.split('.')[0] + '.*';
    if (this.permissions.map(permission => permission.value).includes(wildcardKey)) {
      return true;
    }

    // If no wildcards are found, check if user has exact permission key
    return this.permissions.map(permission => permission.value).includes(key);
  }

  isAuthorizedForGame(gameAbbr: string) {
    const MODERATOR_ROLE = 'moderator';

    // If user is a moderator, return if they're assigned to game
    if (this.role.name === MODERATOR_ROLE) {
      return this.games.map(game => game.abbreviation).includes(gameAbbr);
    }

    // User is not a moderator. Use with hasPermissionKey() for sitewide permissions
    return true;
  }

  isModeratorForGame(gameAbbr: string) {
    const MODERATOR_ROLE = 'moderator';
    return this.role.name === MODERATOR_ROLE && this.games.map(game => game.abbreviation).includes(gameAbbr);
  }
}
