const { gql } = require("apollo-server-express");
const queryDefs = gql`
  type Query {
    getPoints(id: ID!): Points!
  }
`;

module.exports = queryDefs;
