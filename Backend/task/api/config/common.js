const Validator = require("Validator");
const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Utf8.parse(process.env.KEY);
const iv = CryptoJS.enc.Utf8.parse(process.env.IV);

var common = {
  //function for send Response
  sendResponse: async (res, resCode, msgKey, resData) => {
    try {
      const responsejson = {
        code: resCode,
        message: msgKey,
      };
      if (resData != null) {
        responsejson.data = resData;
      }
      // const result = await common.encryption(responsejson);
      // return res.status(resCode).send(JSON.stringify(result));
      return res.status(resCode).send(responsejson);
    } catch (error) {
      console.log(error);
    }       
  },

  //check Validation Rules
  checkValidationRules: async (request, rules) => {
    try {
      const v = Validator.make(request, rules);
      const validator = {
        status: true,
      }
      if (v.fails()) {
        const ValidatorErrors = v.getErrors();
        validator.status = false
        for (const key in ValidatorErrors) {
          validator.error = ValidatorErrors[key][0];
          break;
        }
      }
      return validator;
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = common;