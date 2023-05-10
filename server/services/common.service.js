const countryModel = require("../models/country.model");
const userModel = require("../models/user.model");
const courseModel = require("../models/course.model");
const documentModel = require("../models/document.model")

exports.getCountryNameFromId = async(countryCode) => {
    return await countryModel.findOne({countryCode: countryCode});
}

exports.getUserDetailsFromId = async (userId) => {
    const matchQuery = {
        userId: userId
    }
    const mongoQuery = [
        {
            $match: matchQuery
        },
        {
            $project : { "__v": 0, "createdAt":0, "updatedAt": 0, "_id": 0 }
        }
    ]
    return await userModel.aggregate(mongoQuery);
}

exports.getUniversityDetailsFromId = async (data) => {

}

exports.getDocumentDetailsFromId = async (data) => {

}