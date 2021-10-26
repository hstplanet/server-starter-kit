module.exports = function Error(sails) {


    return {
        authorization: {
            code: "authorization",
            message: "Unauthorized request",
            defination: "Yapış olduğunuz istek için yetkiniz yok. HST sistemlerinde yapılacak işlemler bazı yetkiler gerektirir. Eğer bu yetkiye sahip olduğunuzu düşünüyorsanız bizim ile iletişime geçebilirsiniz."
        },
        notcreategateway: {
            code: "not-create-gateway",
            message: "Could not be created",
            defination: "Gateway oluşturulurken bir hata oluştu. Lütfen bilgileri kontrol ederek tekrar deneyin."
        },
    };

};

