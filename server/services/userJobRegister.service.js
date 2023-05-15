const jobRegisterModel = require("../models/userJobRegister.model");

exports.save = async (data) => {
    const job = new jobRegisterModel(data);
    return await job.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await jobRegisterModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.updateOne = async (matchQuery, updateData) => {
    const job = await jobRegisterModel.findOneAndUpdate(matchQuery, updateData);
    return job;
};

exports.findOne = async (data) => {
    return await jobRegisterModel.findOne(data).lean();
};
exports.findAll = async ({ page, limit }) => {
    const mongoQuery = [
        { $project: { "_id": 0 } },
        {
          $facet: {
            jobRegistrations: [{ $skip: (page - 1) * limit }, { $limit: +limit }],
            totalCount: [{ $count: 'count' }]
          }
        },
        {
          $project: {
            jobRegistrations: 1,
            totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
          }
        }
      ];
    return await jobRegisterModel.aggregate(mongoQuery)
};

exports.deleteOne = async (data) => {
    return await jobRegisterModel.findOneAndDelete(data);
};

exports.findAllByFilter = async (filter) => {
    return await jobRegisterModel.find(filter);
};

exports.findOneByFilter = async (filter) => {
    return await jobRegisterModel.findOne(filter).lean();
};


