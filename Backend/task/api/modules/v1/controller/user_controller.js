const common = require('../../../config/common');
const user_model = require('../models/user_model');
const Codes = require('../../../config/status_codes');
const fs = require('fs').promises;
const path = require('path');
const { log } = require('console');

const listData = async (req, res) => {

    req.body.language = req.language;
    return user_model.listData(req.body, res);

};

const updateData = async (req, res) => {
    const rules = {
        updatedEntry: 'required'
    }
    req.body.language = req.language;
    const valid = await common.checkValidationRules(req.body, rules);

    if (valid.status) {
        return user_model.updateData(req.body, res);
    } else {
        return common.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
};


module.exports = {
    listData,
    updateData
}