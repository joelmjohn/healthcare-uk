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
    return await documentModel.findOne(data);
};

exports.exists = async ({userId}) => {
  return await documentModel.find({ userId: userId }).count() > 0;
};

exports.findAllDocuments = async ({page, limit}) => {
    const query = [
        { $project: { "__v": 0, "updatedAt": 0, "createdAt": 0, "_id": 0 } },
        {
            $facet: {
              documents: [{ $skip: (page - 1) * limit }, { $limit: +limit }],
              totalCount: [
                {
                  $count: 'count'
                }
              ]
            }
        },
        {
            $project: {
              documents: 1,
              totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
            }
        }
      ];
    // const query = [
    //   {
    //     $unwind: "$cloudStorage"
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       cloudStorage: {
    //         $push: "$cloudStorage"
    //       }
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       cloudStorage: 1,
    //       count: {
    //         $size: "$cloudStorage"
    //       }
    //     }
    //   }
    // ];
    return await documentModel.aggregate(query);
}


exports.removeDocument = async ({ eTag, userId }) => {
  return await documentModel.updateOne(
    { userId: userId, "cloudStorage.etag": eTag },
    { $pull: { cloudStorage: { etag: eTag } } }
  )
}

exports.removeExactDocument = async (id) => {
  return await documentModel.deleteOne(id)
}

exports.findAll = async () => {
    return await documentModel.find();
};

exports.count = async (data) => {
    return await documentModel.count(data);
};
