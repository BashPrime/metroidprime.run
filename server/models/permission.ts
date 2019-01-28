import { Model } from './model';
import { GameModel } from './game';

export class PermissionModel extends Model {
    tableName = 'permissions';
    rolesTable = 'roles';
    moderatorsGamesTable = 'moderators_games';
    rolesPermissionsTable = 'roles_permissions';
    usersRolesTable = 'users_roles';
    permissionsTable = 'permissions';
    moderatorRole = 'moderator';

    async getUserPermissions(user, done) {
        const userPermissions: {
            role: any,
            permissions: string[],
            games?: any[]
        } = { role: undefined, permissions: undefined };

        const userRole = await this.getUserRoleSync(user.id);

        // Construct user permissions return object if user has a role
        if (userRole) {
            userPermissions.role = await this.getRoleByIdSync(userRole.roleid);

            // Get role permissions, then map permission IDs to array
            const rolePermissions = await this.getRolePermissionsSync(userRole.roleid);
            const permCollection = rolePermissions.map(permission => permission.permissionid);

            // Get raw permissions for the role
            userPermissions.permissions = await this.getPermissionsByCollectionSync(permCollection);

            // If user is a moderator, get their assigned games
            if (userPermissions.role.name === this.moderatorRole) {
                // Get assigned games and map to array
                const moderatorGames = await this.getAssignedModeratorGamesSync(userRole.userid);
                const gameIdCollection = moderatorGames.map(game => game.gameid);

                // Get games using game model
                const gameModel = new GameModel(this.connector);
                const columns = [
                    'id',
                    'name',
                    'abbreviation'
                ];
                userPermissions.games = await gameModel.getGamesByCollectionSync(gameIdCollection, columns);
            }

            return done(null, userPermissions);
        } else {
            return done(null, {});
        }
    }

    async getRoleByIdSync(roleId) {
        return await this.connector.knex.first()
            .from(this.rolesTable)
            .where('id', roleId);
    }

    async getPermissionsByCollectionSync(permissionCollection) {
        return await this.connector.knex.select()
            .from(this.permissionsTable)
            .whereIn('id', permissionCollection);
    }

    async getUserRoleSync(userId) {
        return await this.connector.knex.first()
            .from(this.usersRolesTable)
            .where('userid', userId);
    }

    async getRolePermissionsSync(roleId) {
        return await this.connector.knex.select()
            .from(this.rolesPermissionsTable)
            .where('roleid', roleId);
    }

    async getAssignedModeratorGamesSync(userId) {
        return await this.connector.knex.select()
            .from(this.moderatorsGamesTable)
            .where('moderatorid', userId);
    }
}
