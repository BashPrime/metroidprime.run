function generateConfig() {
    var fs = require('fs-extra');
    var path = require('path');
    try {
        fs.copySync(path.resolve(__dirname,'./resources/example-config.js'), './config.js');
        console.log("Generated config.js in application root directory.");
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    generateConfig: generateConfig
};