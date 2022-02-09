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
    'GET /{{name}}-{{projectId}}/service/storage/download/:id' : '{{name}}-{{projectId}}/service/StorageController.download',
    'POST /{{name}}-{{projectId}}/service/storage/upload/:id' : '{{name}}-{{projectId}}/service/StorageController.upload',

    'GET /{{name}}-{{projectId}}/service/currency/get': '{{name}}-{{projectId}}/service/StorageController.get',
};