const universityModel = require('../models/university.model');

exports.save = async (data) => {
    const university = new universityModel(data);
    return await university.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await universityModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.exists = async (universityId) => {
    return await universityModel.find({'id': { "$in": universityId}}).count() > 0
}

exports.rmUniversity = async (universityId) => {
    return await universityModel.deleteOne({ id: universityId })
}

exports.modifyUniversity = async (id, data) => {
    return await universityModel.findOneAndUpdate({ id: id }, data)
}

exports.findOne = async (data) => {
    return await universityModel.find(data).lean();
};

exports.findAllUniversities = async ({page, limit}) => {
    const mongoQuery = [
        { $project: { "_id": 0 } },
        {
          $facet: {
            universities: [{ $skip: (page - 1) * limit }, { $limit: +limit }],
            totalCount: [{ $count: 'count' }]
          }
        },
        {
          $project: {
            universities: 1,
            totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
          }
        }
      ];
    return await universityModel.aggregate(mongoQuery)
};

exports.deleteOne = async (data) => {
    return await universityModel.deleteOne(data);
}

exports.count = async (data) => {
    return await universityModel.count(data);
};

exports.getUniversityByCountryService = async ({countryId, page, limit}) => {
    const matchQuery = {
        countryId: countryId
    }
    const mongoQuery = [
        {$match: matchQuery},
        {$project: { __v: 0, _id: 0}},
        { $skip: (page - 1) * limit },
        { $limit: limit }
    ]
    return await universityModel.aggregate(mongoQuery)
}

exports.filterUniversity = async (data) => {
    let query = {};
    return await universityModel.aggregate(query)
}