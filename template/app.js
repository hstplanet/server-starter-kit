/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);



// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
var sails;
var rc;
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}//-•


var mysql = require('mysql');
var fs = require("fs");

fs.readFile(process.cwd() + "/config/datastores.js", 'utf8', (err, data) => {
  var Module = module.constructor;
  var m = new Module();
  m._compile(data, '');
  if (m.exports.datastores.default !== undefined) {
    var url = m.exports.datastores.default.url.split("/");
    var con = mysql.createConnection({
      host: url[2].split(":")[1].split("@")[1],
      user: url[2].split(":")[0],
      password: url[2].split(":")[1].split("@")[0]
    });
    con.connect(function (err) {
      if (err) throw err;
      con.query("SHOW DATABASES", function (err, result) {
        if (err) throw err;
        var findDatabase = false;
        var count = 0;
        for (const element of result) {
          if (element.Database === url[3]) {
            findDatabase = true;
            // Start server
            sails.lift(rc('sails'));
            break;
          }
          count++;
        }
        if (!findDatabase || count === result.length) {
          con.query("CREATE DATABASE " + url[3], function (err, result) {
            if (err.errno === 1007) {
              // Start server
              sails.lift(rc('sails'));
            } else {
              // Start server
              sails.lift(rc('sails'));
            }
          });
        }
      });
    });
  } else {
    sails.lift(rc('sails'));
  }
});
