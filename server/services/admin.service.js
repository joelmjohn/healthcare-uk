const adminModel = require("../models/admin.model");

exports.save = async (data) => {
    const admin = new adminModel(data);
    return await admin.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await adminModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.updateOne = async (matchQuery, updateData) => {
    const admin = await adminModel.findOneAndUpdate(matchQuery, updateData);
    return admin;
};

exports.findOne = async (data) => {
    return await adminModel.findOne(data).lean();
};

exports.findAll = async ({ page, limit }) => {
    const mongoQuery = [
        { $project: { __v: 0, _id: 0 } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
    ]
    return await adminModel.aggregate(mongoQuery)
};

exports.deleteOne = async (data) => {
    return await adminModel.findOneAndDelete(data);
};

exports.findAllByFilter = async (filter) => {
    return await adminModel.find(filter);
};

exports.findOneByFilter = async (filter) => {
    return await adminModel.findOne(filter).lean();
};