/**
 * FindController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

    find: async function (req, res, next) {
        
        return res.json({
            todo: "Find"
        })
    },

    create: async function (req, res, next) {
        var findUser = await User.findOne({
            signToken: req.query.token,
            isLogin: true,
            isSuperAdmin: true,
            isDisable: false
        });
        if (findUser) {
            var projectId = sails.hooks.util.createId();
            var newGateWay = await Gateway.create(_.extend({
                apiKey: req.body.apiKey,
                projectId: req.body.apiKey + "-" + projectId,
                storageBucket: sails.hooks.util.createId(),
                messagingSenderId: sails.hooks.util.createId(),
                appId: "1:" + projectId + ":app:" + sails.hooks.util.createId(),
                measurementId: "H-" + sails.hooks.util.createId(),
            })).fetch();
            if (newGateWay) {
                return res.json(newGateWay);
            }
            return res.json(sails.hooks.error.notcreategateway)
        }
        return res.json(sails.hooks.error.authorization)
    }

};

