const jobModel = require("../models/jobRole.model");

exports.save = async (data) => {
    const job = new jobModel(data);
    return await job.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await jobModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.updateOne = async (matchQuery, updateData) => {
    const update = await jobModel.findOneAndUpdate(matchQuery, updateData);
    return update;
};

exports.findOne = async (data) => {
    return await jobModel.findOne(data).lean();
};

exports.findAll = async () => {
    return await jobModel.find();
};

exports.deleteOne = async (data) => {
    return await jobModel.findOneAndDelete(data);
};

exports.findAllByFilter = async (filter) => {
    return await jobModel.find(filter);
};

exports.findOneByFilter = async (filter) => {
    return await jobModel.findOne(filter).lean();
};