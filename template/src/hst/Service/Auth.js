import axios from "axios";
import hst from "hst/index";
import ejs from "ejs";
import register from "pages/Mail/Register.ejs";
import resetMail from "pages/Mail/Reset.ejs"
import cr from 'crypto-js';

class Auth {

    onAuthStateChanged() {
        return new Promise((resolve, reject) => {
            axios.post(hst.conf.server + "service/auth/onAuthStateChanged?target=" + hst.conf.serverTarget, { token: hst.util.LocalStorage.getItem("auth") }).then(user => {
                if (user.data.err !== undefined && user.data.err) {
                    reject(user.data);
                } else {
                    resolve(user.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    };

    signInWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            axios.post(hst.conf.server + "service/auth/signin?target=" + hst.conf.serverTarget, { emailAddress: email, password: password }).then(token => {
                if (token.data.err !== undefined && token.data.err) {
                    hst.util.notify.create({
                        message: token.data.message,
                        color: "red"
                    });
                    reject(token.data);
                } else {
                    hst.util.LocalStorage.set("auth", token.data.token);
                    resolve(token.data);
                }
            }).catch(err => {
                hst.util.notify.create({
                    message: err.message,
                    color: "#F30"
                })
                reject(err);
            });
        });

    };

    createUserWithEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            axios.post(hst.conf.server + "service/auth/signup?target=" + hst.conf.serverTarget, { emailAddress: email, password: password, auth: hst.conf.auth }).then(token => {
                if (token.data.err !== undefined && token.data.err) {
                    hst.util.notify.create({
                        message: token.data.message,
                        color: "red"
                    });
                    reject(token.data);
                } else {
                    hst.util.LocalStorage.set("auth", token.data.token);
                    if (hst.conf.auth.emailVerification) {
                        this.sendEmailVerification().then(res => {
                            resolve(token);
                        });
                    } else {
                        resolve(token);
                    }
                }
            }).catch(err => {
                hst.util.notify.create({
                    message: err.message,
                    color: "#F30"
                })
                reject(err);
            });
        });
    };

    updateProfile(update) {
        return new Promise((resolve, reject) => {
            update.token = hst.util.LocalStorage.getItem("auth");
            axios.post(hst.conf.server + "service/auth/update?target=" + hst.conf.serverTarget, update).then(res => {
                if (res.data.err) {
                    reject(res.data);
                } else {
                    resolve(res.data)
                }
            });
        })
    };

    sendEmailVerification() {
        return new Promise((resolve, reject) => {
            this.onAuthStateChanged().then(user => {
                var res = {
                    fullName: user.fullName,
                    url: hst.conf.host + hst.conf.auth.emailVerificationURL + "?token=" + hst.util.LocalStorage.getItem("auth")
                }
                var message = ejs.render(register, res);
                hst.conf.mailConfig.auth.pass = cr.AES.encrypt(hst.conf.mailConfig.auth.pass, hst.conf.hstcloud.key).toString();
                hst.conf.mailConfig.auth.user = cr.AES.encrypt(hst.conf.mailConfig.auth.user, hst.conf.hstcloud.key).toString();
                axios.post(hst.conf.server + "service/auth/sendEmailVerification?target=" + hst.conf.serverTarget, { token: hst.util.LocalStorage.getItem("auth"), message: message, config: hst.conf.mailConfig }).then(mail => {
                    resolve(mail);
                }).catch(err => {
                    reject(err);
                });
            });
        })
    };

    logout() {
        return new Promise((resolve, reject) => {
            axios.post(hst.conf.server + "service/auth/logout?target=" + hst.conf.serverTarget, { token: hst.util.LocalStorage.getItem("auth") }).then(logout => {
                hst.util.LocalStorage.remove("auth");
                resolve(logout.data);
            }).catch(err => {
                reject(err);
            });
        });
    };

    emailVerification() {
        return new Promise((resolve, reject) => {
            axios.post(hst.conf.server + "service/auth/emailVerification?target=" + hst.conf.serverTarget, { token: hst.util.LocalStorage.getItem("auth") }).then(verification => {
                resolve(verification.data);
            }).catch(err => {
                reject(err);
            });
        });
    };

    resetPassword(email) {
        return new Promise((resolve, reject) => {
            axios.post(hst.conf.server + "service/auth/resetPassword?target=" + hst.conf.serverTarget, { email: email }).then(reset => {
                var res = {
                    fullName: reset.data.fullName,
                    url: hst.conf.host + hst.conf.auth.resetPasswordURL + "?token=" + reset.data.token
                }
                var message = ejs.render(resetMail, res);
                hst.conf.mailConfig.auth.pass = cr.AES.encrypt(hst.conf.mailConfig.auth.pass, hst.conf.hstcloud.key).toString();
                hst.conf.mailConfig.auth.user = cr.AES.encrypt(hst.conf.mailConfig.auth.user, hst.conf.hstcloud.key).toString();
                var mail = {
                    subject: "E Mail Sıfırmala",
                    message: message,
                    to: email
                }
                axios.post(hst.conf.server + "service/mailservice/send", { mail: mail, config: hst.conf.mailConfig }).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        })
    };

    sendNewPassword(token, password) {
        return new Promise((resolve, reject) => {
            password = cr.AES.encrypt(password, hst.conf.hstcloud.key).toString();
            axios.post(hst.conf.server + "service/auth/sendNewPassword?target=" + hst.conf.serverTarget, { token: token, password: password }).then(reset => {
                resolve(reset.data);
            }).catch(err => {
                reject(err);
            });
        });
    };

    #errorCode() { };

}

export default new Auth();