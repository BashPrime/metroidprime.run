import { DbConnector } from "../dbConnector";
import { PermissionModel } from "../models/permission";
import { UserPermissions } from '../../src/app/model/permission';

export function permit(keys: string[], dbConnector: DbConnector, gameParam?: string) {
    return async (req, res, next) => {
        if (req.user && await hasPermissions(keys, req.user, dbConnector, req.params[gameParam])) {
            next(); // user has allowed permissions, so continue on the next middleware
        } else {
            res.status(403).json({message: "Forbidden"}); // user is forbidden
        }
    };
}

async function hasPermissions(keys: string[], user, dbConnector: DbConnector, game?: string) {
    const permissionModel = new PermissionModel(dbConnector);

    // Build user permissions model
    let userPermissions: UserPermissions;
    const perms = await permissionModel.getUserPermissionsSync(user)
    if (perms) {
        userPermissions = new UserPermissions();
        Object.assign(userPermissions, perms);
    }

    if (userPermissions) {
        const permRes: boolean[] = [];
        for (const key of keys) {
            permRes.push(userPermissions.hasPermissionKey(key) && (!game || userPermissions.isAuthorizedForGame(game)));
        }
        return permRes.includes(true) && !permRes.includes(false);
    }

    return false;
}