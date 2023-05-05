const countryModel = require("../models/country.model");

exports.save = async (data) => {
    const country = new countryModel(data);
    return await country.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await countryModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.updateOne = async (matchQuery, updateData) => {
    const country = await countryModel.findOneAndUpdate(matchQuery, updateData);
    return country;
};

exports.findOne = async (data) => {
    return await countryModel.findOne(data).lean();
};

exports.findAll = async ({ page, limit }) => {
    const mongoQuery = [
        { $project: { __v: 0, _id: 0 } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
    ]
    return await countryModel.aggregate(mongoQuery)
};

exports.deleteOne = async (data) => {
    return await countryModel.findOneAndDelete(data);
};

exports.findAllByFilter = async (filter) => {
    return await adminModel.find(filter);
};

exports.findOneByFilter = async (filter) => {
    return await adminModel.findOne(filter).lean();
};