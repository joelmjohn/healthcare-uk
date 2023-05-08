const userModel = require("../models/user.model");

exports.save = async (data) => {
    const user = new userModel(data);
    return await user.save();
};

exports.exists = async (email) => {
    return await userModel.find({email: email}).count() > 0
}

exports.update = async (matchQuery, updateData) => {
    const update = await userModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.updateOne = async (matchQuery, updateData) => {
    const update = await userModel.findOneAndUpdate(matchQuery, updateData);
    return update;
};

exports.findOne = async (data) => {
    return await userModel.findOne(data).lean();
};

exports.findAll = async ({ page, limit }) => {
    const mongoQuery = [
        { $project: { __v: 0, _id: 0 } },
        { $skip: (page - 1) * limit },
        { $limit: limit }
    ]
    return await userModel.aggregate(mongoQuery)
};

exports.deleteOne = async (data) => {
    return await userModel.findOneAndDelete(data);
};

exports.findAllByFilter = async (filter) => {
    return await userModel.find(filter);
};

exports.findOneByFilter = async (filter) => {
    return await userModel.findOne(filter).lean();
};