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
}
