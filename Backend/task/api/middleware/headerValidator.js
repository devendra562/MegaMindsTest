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
  },

  //Function to validate API key of header (Note : Header keys are encrypted)
  validateHeaderApiKey: async (req, res, next) => {
    const bypassHeaderKey = [];
    
    try {
      const apiKey = req.headers['api-key'] ? common.decryptPlain(req.headers["api-key"]) : "";
  
      const pathData = req.path.split("/");
      if (!bypassHeaderKey.includes(pathData[2])) { 
        if (apiKey) { 
          if (apiKey === process.env.API_KEY) {
            return next();  // Use return here for consistency
          } else {
            return await common.sendResponse(res, Codes.UNAUTHORIZED, lang[req.language]["rest_keywords_invalid_api_key"], null);
          }
        } else {
          return await common.sendResponse(res, Codes.UNAUTHORIZED, lang[req.language]["rest_keywords_invalid_api_key"], null);
        }
      } else {
        return next(); // Continue without API key validation
      }
    } catch (error) {
      // logger.error(error);
      return await common.sendResponse(res, Codes.INTERNAL_ERROR, "An error occurred", null);
    }
  }
};

module.exports = headerValidator;