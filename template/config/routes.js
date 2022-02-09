/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'GET /{{name}}/service/storage/download/:id' : '{{name}}/service/StorageController.download',
    'POST /{{name}}/service/storage/upload/:id' : '{{name}}/service/StorageController.upload',

    'GET /{{name}}/service/currency/get': '{{name}}/service/StorageController.get',
};