const { mergeResolvers } = require("@graphql-tools/merge");
const player = require("./player");
const point = require("./point");

module.exports = mergeResolvers([player, point]);
