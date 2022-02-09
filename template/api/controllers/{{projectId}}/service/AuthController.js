module.exports = {

    signin: async function (req, res, next) {
        if (req.query.target === "local") {
            var userRecord = await User.updateOne({
                emailAddress: req.body.emailAddress.toLowerCase(),
            }).set({ isLogin: true, signToken: await sails.helpers.strings.random('url-friendly') });

            if (!userRecord) {
                res.json({ err: true, code: 'auth/user-found', message: "Kullanıcı bulunamadı." });
                return;
            }

            try {
                await sails.helpers.passwords.checkPassword(req.body.password, userRecord.password)
                    .intercept('incorrect', 'badCombo');
            } catch (error) {
                res.json({ err: true, code: 'auth/wrong-password', message: "E Posta veya şifre hatalı." });
                return;
            }

            req.session.userId = userRecord.id;
            res.json({ token: userRecord.signToken })
        } else {
            // Yönlendirme
        }
    },

    signup: async function (req, res) {
        if (req.query.target === "local") {
            sails.config.custom.auth = req.body.auth;
            var newEmailAddress = req.body.emailAddress.toLowerCase();
            try {
                var newUserRecord = await User.create(_.extend({
                    emailAddress: newEmailAddress,
                    password: await sails.helpers.passwords.hashPassword(req.body.password),
                    signToken: await sails.helpers.strings.random('url-friendly'),
                    tosAcceptedByIp: req.ip,
                    isLogin: true
                }, sails.config.custom.auth.emailVerification ? {
                    emailProofToken: await sails.helpers.strings.random('url-friendly'),
                    emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
                    emailStatus: 'unconfirmed'
                } : {}))
                    .intercept('E_UNIQUE', 'emailAlreadyInUse')
                    .intercept({ name: 'UsageError' }, 'invalid')
                    .fetch();

                req.session.userId = newUserRecord.id;
                res.json({ token: newUserRecord.signToken });
                return;
            } catch (err) {
                if (err.raw === 'emailAlreadyInUse') {
                    res.json({ err: true, code: 'emailAlreadyInUse', message: "Bu Email adresi kullanılıyor." });
                    return;
                }
            }
            res.json({ err: true, code: 'emailAlreadyInUse', message: "Bu Email adresi kullanılıyor." });
        } else {
            // Yönlendirme
        }
    },

    resetPassword: async function (req, res) {
        if (req.query.target === "local") {
            var userRecord = await User.findOne({ emailAddress: req.body.email });
            if (!userRecord) {
                res.json({ err: true, code: 'auth/invalid-email', message: "Kullanıcı bulunamadı." });
                return;
            }
            var token = await sails.helpers.strings.random('url-friendly');
            await User.updateOne({ id: userRecord.id })
                .set({
                    passwordResetToken: token,
                    passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
                });
            res.json({ code: 'email/send-email', message: "Sıfırlama E Postası gönderildi.", token: token, fullName: userRecord.fullName });
        } else {
            // Yönlendirme
        }
    },

    delete: async function (req, res) {
        if (req.query.target === "local") {
            var email = req.body.emailAddress;
            var userRecord = await User.findOne({ emailAddress: email });
            if (!userRecord) {
                res.json({ err: true, code: 'auth/invalid-email', message: "Kullanıcı bulunamadı." });
                return;
            }

            await User.destroyOne({ id: userRecord.id });
            res.json({ err: false, code: 'auth/delete-user', message: "Kullanıcı sistemden silindi." });
        } else {
            // Yönlendirme
        }
    },

    logout: async function (req, res) {
        if (req.query.target === "local") {
            var updateUserRecord = await User.updateOne({
                signToken: req.body.token,
                isLogin: true
            }).set({ isLogin: false });

            delete req.session.userId;

            if (updateUserRecord === undefined) {
                res.json({ err: true, code: "auth-logout-err", message: "Oturum kapatılamadı." });
                return;
            }

            res.json({ code: "auth-logout-ok", message: "Oturum başarılıyla kapatıldı." });
        } else {
            // Yönlendirme
        }
    },

    update: async function (req, res) {
        if (req.query.target === "local") {
            var data = {}
            if (req.body.token !== undefined || req.body.token !== null) {
                if (req.body.name !== undefined && req.body.name.length > 0) {
                    data.name = req.body.name;
                    data.lastname = req.body.lastname;
                    data.fullName = data.name + " " + data.lastname;
                }

                if (req.body.city !== undefined && req.body.city.length > 0) {
                    data.city = req.body.city;
                }

                if (req.body.town !== undefined && req.body.town.length > 0) {
                    data.town = req.body.town;
                }

                if (req.body.address !== undefined && req.body.address.length > 0) {
                    data.address = req.body.address;
                }

                if (req.body.phone !== undefined && req.body.phone.length > 0) {
                    data.phone = req.body.phone;
                }

                if (req.body.photoURL !== undefined) {
                    data.photoURL = req.body.photoURL;
                }

                if (req.body.profile !== undefined) {
                    var profile = req.body.profile;
                    await Profile.update({id : profile.id}).set(profile).fetch();
                }

                var newUserRecord = await User.updateOne({
                    signToken: req.body.token
                }).set(data);


                req.session.userId = newUserRecord.id;

                res.json({ code: "auth-update-ok", message: "Profil başarıyla güncellendi." , user : newUserRecord });
            } else {
                res.json({ err: true, code: "auth-update-nok", message: "Kullanıcı bulunamadı." });
            }
        } else {
            // Yönlendirme
        }
    },

    onAuthStateChanged: async function (req, res) {
        if (req.query.target === "local") {
            var userRecord = await User.findOne({
                signToken: req.body.token,
                isLogin: true
            }).populateAll();
            if (userRecord === undefined) {
                res.json({ err: true, code: "auth-onChanged-found", message: "Kullanıcı bulunamadı." })
                return;
            }
            res.json(userRecord);
        } else {
            // Yönlendirme
        }
    },

    sendEmailVerification: async function (req, res) {
        if (req.query.target === "local") {
            var UserRecord = await User.findOne({
                signToken: req.body.token
            });
            var config = req.body.config;
            const cr = require("crypto-js");
            var userDecode = cr.AES.decrypt(config.auth.user, sails.config.models.dataEncryptionKeys.default).toString(cr.enc.Utf8);
            var passDecode = cr.AES.decrypt(config.auth.pass, sails.config.models.dataEncryptionKeys.default).toString(cr.enc.Utf8);
            config.auth.user = userDecode;
            config.auth.pass = passDecode;
            const nodemailer = require("nodemailer");
            let transporter = nodemailer.createTransport(config);
            let info = await transporter.sendMail({
                from: req.body.config.auth.user,
                to: UserRecord.emailAddress,
                subject: "Lütfen Hesabınızı Doğrulayın.",
                html: req.body.message,
            });

            await User.updateOne({ id: UserRecord.id }).set({
                emailProofToken: await sails.helpers.strings.random('url-friendly'),
                emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
                emailStatus: 'unconfirmed'
            });

            res.json({ code: 'email/send-email', message: "Onaylama E Postası gönderildi." });
        } else {
            // Yönlendirme
        }
    },

    emailVerification: async function (req, res) {
        if (req.query.target === "local") {
            var token = req.body.token;
            console.log(token);
            var user = await User.findOne({ signToken: token });
            console.log(user);
            if (!user || user.emailProofTokenExpiresAt <= Date.now()) {
                res.json({ err: true, code: "invalidOrExpiredToken", message: "Bu anahtarın kullanım süresi dolmuş." });
                return;
            }
            if (user.emailStatus === 'unconfirmed') {
                await User.updateOne({ id: user.id }).set({
                    emailStatus: 'confirmed',
                    emailProofToken: '',
                    emailProofTokenExpiresAt: 0
                });
                console.log( user.id);
                req.session.userId = user.id;
                res.json({ code: "verification", message: "Email adresiniz onaylandı." });
                return;
            } else {
                res.json({ err: true, code: "emailChangeCandidate", message: "Onaylama anahtarı bulunamadı." });
                return;
            }
        } else {
            // Yönlendirme
        }
    },

    sendNewPassword: async function (req, res) {
        if (req.query.target === "local") {
            var token = req.body.token;
            const cr = require("crypto-js");
            var password = cr.AES.decrypt(req.body.password, sails.config.models.dataEncryptionKeys.default).toString(cr.enc.Utf8);

            if (!token) {
                res.json({ err: true, code: "invalidOrExpiredToken", message: "Onaylama anahtarı bulunamadı." });
                return;
            }
            var userRecord = await User.findOne({ passwordResetToken: token });

            if (!userRecord || userRecord.passwordResetTokenExpiresAt <= Date.now()) {
                res.json({ err: true, code: "invalidOrExpiredToken", message: "Bu anahtarın kullanım süresi dolmuş." });
                return;
            }

            var hashed = await sails.helpers.passwords.hashPassword(password);
            await User.updateOne({ id: userRecord.id })
                .set({
                    password: hashed,
                    passwordResetToken: '',
                    passwordResetTokenExpiresAt: 0
                });
            res.json({ code: "new-password", message: "Şifreniz değiştirildi." });
        } else {
            // Yönlendirme
        }

    }

}