const documentModel = require('../models/document.model');

exports.save = async (data) => {
    const doc = new documentModel(data);
    return await doc.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await documentModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.findOne = async (data) => {
    return await documentModel.findOne(data).lean();
};

exports.findAll = async () => {
    return await documentModel.find();
};

exports.count = async (data) => {
    return await documentModel.count(data);
};