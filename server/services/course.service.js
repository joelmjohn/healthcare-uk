const courseModel = require('../models/course.model');

exports.save = async (data) => {
    const doc = new courseModel(data);
    return await doc.save();
};

exports.update = async (matchQuery, updateData) => {
    const update = await courseModel.updateMany(matchQuery, {
        $set: updateData
    });
    return update;
};

exports.exists = async (courseCode) => {
    return await courseModel.find({'courseCode': { "$in": courseCode}}).count() > 0
}

exports.findOne = async (data) => {
    return await courseModel.find(data).lean();
};

exports.rmCourse = async (courseCode) => {
    return await courseModel.deleteOne({ courseCode: courseCode })
};

exports.findAll = async (data) => {
    return await courseModel.find();
};

exports.getAllCourses = async(data) => {
    const mongoQuery = [
        { $project: { "__v": 0, "updatedAt": 0, "createdAt": 0, "_id": 0 } },
        {
            $facet: {
              course: [{ $skip: (page - 1) * limit }, { $limit: +limit }],
              totalCount: [
                {
                  $count: 'count'
                }
              ]
            }
        },
        {
            $project: {
              course: 1,
              totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
            }
        }
    ]

    return await courseModel.aggregate(mongoQuery);
}



exports.count = async (data) => {
    return await courseModel.count(data);
};

exports.modifyCourse = async (id, data) => {
    return await courseModel.findOneAndUpdate({ courseCode: id }, data)
}