export class User {
  id: number;
  name: string;
  displayname: string;
  twitter: string;
  twitch: string;
  youtube: string;
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
