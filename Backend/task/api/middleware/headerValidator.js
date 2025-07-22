const common = require("../config/common");
const lang = require("../config/language");
const Codes = require("../config/status_codes");

const headerValidator = {
  //Function for extract accept language from request header and set in req globaly
  extractHeaderLanguage: async (req, res, next) => {
    try {
      const language = (req.headers['accept-language'] !== undefined && req.headers['accept-language'] !== '') ? "en" : "en";
      req.language = language;
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = headerValidator;