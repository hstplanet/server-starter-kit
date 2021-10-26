/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const orm = require('../Functions/Orm');

module.exports = {

    orm: async function (req, res) {
        var model = ""+req.query.table;
        orm.functionSelect(sails.models[model.toLowerCase()], req.body).then(response => {
            res.json(response);
        });
    },
};