const { random } = require("lodash");

module.exports = function Util(sails) {


    return {
        createId: function () {
            var id = "";
            for (let index = 0; index < 10; index++) {
                id += random(0 , 9);
            }
            return id;
        },

        isAuthorization : async function (token) {
            var findUser = await User.findOne({
                signToken: token,
                isLogin: true,
                isSuperAdmin: true,
                isDisable: false
            });
            if (findUser) {
                return true;
            }
            return false;
        }
    };


};

