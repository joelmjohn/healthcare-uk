const universityModel = require('../models/university.model');

exports.save = async (data) => {
    const doc = new universityModel(data);
    return await doc.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await universityModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.exists = async (universityCode) => {
    return await universityModel.find({'universityCode': { "$in": universityCode}}).count() > 0
}

exports.rmUniversity = async (universityCode) => {
    return await universityModel.deleteOne({ universityCode: universityCode })
}

exports.modifyUniversity = async (id, data) => {
    return await universityModel.findOneAndUpdate({ universityCode: id }, data)
}

exports.findOne = async (data) => {
    return await universityModel.find(data).lean();
};

exports.findAllUniversities = async ({page, limit}) => {
    const mongoQuery = [
        {$project: { __v: 0, _id: 0}},
        { $skip: (page - 1) * limit },
        { $limit: limit }
    ]
    return await universityModel.aggregate(mongoQuery)
};

exports.deleteOne = async (data) => {
    return await universityModel.deleteOne(data);
}

exports.count = async (data) => {
    return await universityModel.count(data);
};

exports.filterUniversity = async (data) => {
    let query = {};
    return await universityModel.aggregate(query)
}