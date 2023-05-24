const courseModel = require('../models/course.model');

exports.save = async (data) => {
  const course = new courseModel(data);
  return await course.save();
};

exports.update = async (matchQuery, updateData) => {
  const update = await courseModel.updateMany(matchQuery, {
    $set: updateData
  });
  return update;
};

exports.exists = async (courseId) => {
  return await courseModel.find({ 'id': { "$in": courseId } }).count() > 0
}

exports.findOne = async (data) => {
  return await courseModel.findOne(data).lean();
};

exports.rmCourse = async (courseId) => {
  return await courseModel.deleteOne({ id: courseId })
};

exports.findAllCourses = async ({ page, limit }) => {
  const mongoQuery = [
    { $skip: (page - 1) * limit },
    { $limit: +limit },
    {
      $group: {
        _id: null,
        courses: { $push: "$$ROOT" },
        totalCount: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        courses: 1,
        totalCount: 1
      }
    }
  ];
  const courses = await courseModel.aggregate(mongoQuery);
  if (courses) {
    return courses[0]
  } else {
    return false
  }
};

exports.getAllCourses = async (data) => {
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
  return await courseModel.findOneAndUpdate({ id: id }, data)
}