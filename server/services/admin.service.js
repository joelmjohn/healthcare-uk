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

exports.exists = async (data) => {
    return await adminModel.findOne(data).count() > 0
}

exports.findAll = async ({ page, limit }) => {
    const mongoQuery = [
        { $project: { "_id": 0 } },
        {
          $facet: {
            admins: [{ $skip: (page - 1) * limit }, { $limit: +limit }],
            totalCount: [{ $count: 'count' }]
          }
        },
        {
          $project: {
            admins: 1,
            totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
          }
        }
      ];
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