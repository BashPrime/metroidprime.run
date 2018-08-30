import { copySync } from 'fs-extra';
import * as path from 'path';

export class Utilities {
    static generateConfig() {
        try {
            copySync(path.resolve(__dirname, './resources/example-config.js'), './config.js');
            console.log('Generated config.js in application root directory.');
        } catch (err) {
            console.error(err);
        }
    }
}
