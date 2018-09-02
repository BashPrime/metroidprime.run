import { copySync } from 'fs-extra';
import * as path from 'path';

export class Utilities {
    static generateConfig() {
        try {
            copySync(path.resolve(__dirname, './resources/config.json'), './config.json');
            console.log('Generated config.json in application root directory.');
        } catch (err) {
            console.error(err);
        }
    }

    static handleQueryParams(params, allowedParams, queryBuilder) {
        const queryKeys = Object.keys(params).filter(function (e) { return this.indexOf(e) > -1; }, Object.keys(allowedParams));
        for (let i = 0; i < queryKeys.length; i++) {
            const queryParam = queryKeys[i];
            if (i === 0) {
                queryBuilder.where(allowedParams[queryParam], 'in', params[queryParam]);
            } else {
                queryBuilder.andWhere(allowedParams[queryParam], 'in', params[queryParam]);
            }
        }

        if (params.orderBy) {
            const splitOrderBy = params.orderBy.split(' ');
            queryBuilder.orderBy(splitOrderBy[0], splitOrderBy[1]);
        }

        if (params.limit) {
            queryBuilder.limit(params.limit);
        }

        return queryBuilder;
    }
}
