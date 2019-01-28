import { Model } from './model';

export class PermissionModel extends Model {
    tableName = 'permissions';
    rolesTable = 'roles';
    moderatorsGamesTable = 'moderators_games';
    rolesPermissionsTable = 'roles_permissions';
    usersRolesTable = 'users_roles';
}
