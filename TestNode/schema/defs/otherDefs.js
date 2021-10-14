const { gql } = require("apollo-server-express");
const otherDefs = gql`
  type Points {
    points: Int
    attempts: Int
  }
`;

module.exports = otherDefs;
