import * as fs from 'fs';
import * as path from 'path';

const configResource = path.join(__dirname, '../resources/config.json');
const configDestination = path.join(__dirname, '../config.json');

fs.copyFile(configResource, configDestination, (err) => {
    if (err) throw err;
    console.log('config.json has been successfully created in /src/server');
});
