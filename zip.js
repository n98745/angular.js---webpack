
var packageInfo = require('./package.json');
var zip = packageInfo.name + "_" + packageInfo.version;

var zipper = require('zip-local');
zipper.sync.zip("dist/").compress().save(zip + ".zip");