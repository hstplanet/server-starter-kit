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
    'GET /{{projectId}}/service/storage/download/:id' : '{{projectId}}/service/StorageController.download',
    'POST /{{projectId}}/service/storage/upload/:id' : '{{projectId}}/service/StorageController.upload',

    'GET /{{projectId}}/service/currency/get': '{{projectId}}/service/StorageController.get',
};