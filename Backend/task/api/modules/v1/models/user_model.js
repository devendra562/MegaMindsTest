const { log } = require("console");
const common = require("../../../config/common");
const lang = require("../../../config/language");
const Codes = require("../../../config/status_codes");
const fs = require('fs');
const path = require('path');

const user_model = {

    //////////////////////////////////////////////////////////////////////////////////////////
    /////                                  ListData                                      /////
    //////////////////////////////////////////////////////////////////////////////////////////
    async listData(req, res) {
        try {
            const dataPath = path.join(__dirname, '../../../config/data.json');
            const jsonData = fs.readFileSync(dataPath, 'utf8');
            const data = JSON.parse(jsonData);

            return await common.sendResponse(res, Codes.SUCCESS, lang[req.language]['rest_keywords_user_listing_succ'], data);
        } catch (error) {
            return await common.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language]['rest_keywords_user_something_wrong'], null);
        }
    },

    //////////////////////////////////////////////////////////////////////////////////////////
    /////                                  updateData                                    /////
    //////////////////////////////////////////////////////////////////////////////////////////
    async updateData(body, res) {
        try {
            const { updatedEntry } = body;
            const dataPath = path.join(__dirname, '../../../config/data.json');
            const jsonData = fs.readFileSync(dataPath, 'utf8');
            const parsedData = JSON.parse(jsonData);
            const datasArray = parsedData.Datas;

            let updatedCount = 0;

            // Loop through each data entry from frontend
            for (const newData of updatedEntry.Datas) {
                const index = datasArray.findIndex(entry =>
                    new Date(entry.SamplingTime).getTime() == new Date(newData.SamplingTime).getTime()
                );
                if (index !== -1) {
                    datasArray[index] = newData;
                    updatedCount++;
                }
            }

            if (updatedCount === 0) {
                return await common.sendResponse(res, Codes.NOT_FOUND, 'Entry not found', null);
            }

            // Write back the updated data
            fs.writeFileSync(dataPath, JSON.stringify(parsedData, null, 2), 'utf8');

            return await common.sendResponse(res, Codes.SUCCESS, 'Data updated successfully', datasArray);
        } catch (error) {
            console.error("Error in updateData:", error);
            return await common.sendResponse(res, Codes.INTERNAL_SERVER_ERROR, 'Something went wrong', null);
        }
    }

}

module.exports = user_model;