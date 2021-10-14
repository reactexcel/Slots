const PointModel = require("../../models/pointModel");
module.exports = {
  Mutation: {
    async alterPoints(root, data) {
      try {
        const update = await PointModel.findOneAndUpdate(
          { user: data.id },
          { point: data.point, attempts: data.attempts },
          { new: true }
        );
        return {
          points: update.point,
          attempts: update.attempts,
        };
      } catch (err) {
        return err;
      }
    },
  },
  Query: {
    async getPoints(root, { id }) {
      const pointData = await PointModel.findOne({ user: id });
      return {
        points: pointData.point,
        attempts: pointData.attempts,
      };
    },
  },
};
