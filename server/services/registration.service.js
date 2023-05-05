const userRegistrationModel = require('../models/userCourseRegister.model');

exports.isUserAlreadyErolledToCourse = async (userId, courseCode) => {
    return await userRegistrationModel.findOne({ userId: userId, courseCode: courseCode  }).count() > 0;
}

exports.enrollUserToCourse = async (data) => {
    const courseEnrollData = new userRegistrationModel(data);
    return await courseEnrollData.save();
}

exports.mergeUserDataForEmail = async (userId, courseCode) => {
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
        userId: userId,
        courseCode: courseCode
    }
    const mongoQuery = [
        {
          $match: matchQuery
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "id",
            as: "user"
          }
        },
        {
          $lookup: {
            from: "documents",
            localField: "userId",
            foreignField: "userId",
            as: "document"
          }
        },
        {
            $unwind: "$user",
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
               input: "$document",
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