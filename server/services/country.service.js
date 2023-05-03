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

exports.findAll = async () => {
    return await countryModel.find();
};

exports.deleteOne = async (data) => {
    return await countryModel.findOneAndDelete(data);
};