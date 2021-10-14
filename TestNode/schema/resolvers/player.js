const PlayerModel = require("../../models/playerModel");
const PointModel = require("../../models/pointModel");
const bcrypt = require("bcryptjs");
module.exports = {
  Mutation: {
    async addPlayer(root, data) {
      try {
        data.password = await bcrypt.hash(data.password, 8);
        const storingPlayer = new PlayerModel(data);
        const storingPoints = new PointModel({ user: storingPlayer.id });
        await storingPlayer.save();
        await storingPoints.save();
        return "Player Created";
      } catch (err) {
        return err;
      }
    },
    async getPlayer(root, { email, password }) {
      try {
        const playerData = await PlayerModel.findOne({
          email: email,
        });
        const valid = await bcrypt.compare(password, playerData.password);
        if (!valid) {
          throw new Error("Not Authorized");
        }
        return playerData._id;
      } catch (err) {
        return err;
      }
    },
  },
};
