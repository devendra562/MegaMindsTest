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

  // Decrypt user request
  decryption: async (req) => {
    try {
      if (req.body != undefined && Object.keys(req.body).length !== 0) {
        const decrypted = CryptoJS.AES.decrypt(req.body, key, { iv: iv });
        const request = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        request.language = req.language;
        return request;
      } else {
        return {};
      }
    } catch (error) {
      console.log('Error:', error);
      return {};
    }
  },

  // Encrypt user request
  encryption: async (data) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
      return encrypted.toString();
    } catch (error) {
      return "";
    }
  },

  // Encrypt plain data
  encryptPlain: function (data) {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
      return encrypted.toString();
    } catch (error) {
      return "";
    }
  },

  // Decrypt plain data
  decryptPlain: function (data) {
    try {
      const decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log("Decryption Error: ", error);
      return "";
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