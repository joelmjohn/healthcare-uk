const userRegistrationModel = require('../models/userCourseRegister.model');

exports.isUserAlreadyEnrolledToCourse = async (email, courseId) => {
  return await userRegistrationModel.findOne({ email: email, courseId: courseId }).count() > 0;
}

exports.enrollUserToCourse = async (data) => {
  const courseEnrollData = new userRegistrationModel(data);
  return await courseEnrollData.save();
}

exports.getAllRegistrations = async ({ page, limit }) => {
  const mongoQuery = [
    { $project: { "_id": 0 } },
    {
      $facet: {
        courseRegistrations: [{ $skip: (page - 1) * limit }, { $limit: +limit }],
        totalCount: [{ $count: 'count' }]
      }
    },
    {
      $project: {
        courseRegistrations: 1,
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
      }
    }
  ];
  const courseRegistrations = await userRegistrationModel.aggregate(mongoQuery);
  if (courseRegistrations) {
    return courseRegistrations[0]
  } else {
    return false
  }
}

exports.mergeUserDataForEmail = async (email, courseId) => {
  // Required Format
  // const data = {
  //     firstName: "name",
  //     lastName: "lastName",
  //     email: "email",
  //     gender: "Male",
  //     dateOfBirth: "",
  //     country: "India",
  //     education: [],
  //     experience: [],
  //     awards: [],
  //     profileImg,
  //     university,
  //     documents: []
  // }
  const matchQuery = {
    email: email,
    courseId: courseId
  }
  const mongoQuery = [
    {
      $match: matchQuery
    },
    {
      $lookup: {
        from: "users",
        localField: "email",
        foreignField: "email",
        as: "user"
      }
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "documents",
        localField: "user.id",
        foreignField: "userId",
        as: "documents"
      }
    },
    {
      $project: {
        _id: 0,
        firstName: "$user.firstName",
        lastName: "$user.lastName",
        email: "$user.email",
        designation: "$user.designation",
        dob: "$user.dob",
        country: "$user.country",
        education: 1,
        experience: 1,
        awards: 1,
        profileImg: 1,
        documents: {
          $map: {
            input: "$documents",
            as: "document",
            in: {
              name: "$$document.name",
              cloudStorage: "$$document.cloudStorage",
            },
          },
        },
      }
    },
  ];

  return userRegistrationModel.aggregate(mongoQuery)
}

exports.findOne = async (data) => {
  return await userRegistrationModel.findOne(data).lean();
};
