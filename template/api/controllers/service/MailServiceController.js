const nodemailer = require("nodemailer");


module.exports = {

    send: async function (req, res, next) {
        var config = req.body.config;
        const cr = require("crypto-js");
        var userDecode = cr.AES.decrypt(config.auth.user, sails.config.models.dataEncryptionKeys.default).toString(cr.enc.Utf8);
        var passDecode = cr.AES.decrypt(config.auth.pass, sails.config.models.dataEncryptionKeys.default).toString(cr.enc.Utf8);
        config.auth.user = userDecode;
        config.auth.pass = passDecode;
        let transporter = nodemailer.createTransport(config);

        let info = await transporter.sendMail({
            from: config.auth.user,
            to: req.body.mail.to,
            subject: req.body.mail.subject,
            html: req.body.mail.message,
        });
        res.json({ err: false, code: 'mail/send', message: info });
    },
    


}
