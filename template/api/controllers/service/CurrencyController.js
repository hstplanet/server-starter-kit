const axios = require('axios')
var parseString = require('xml2js').parseString;
module.exports = {

    get: async function (req, res, next) {
        axios.get("https://www.tcmb.gov.tr/kurlar/today.xml").then(cr => {
            parseString(cr.data, function (err, result) {
                res.send(result.Tarih_Date.Currency);
            });
        });
    },
}
