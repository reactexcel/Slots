const { gql } = require("apollo-server-express");
const mutationDefs = gql`
  type Mutation {
    addPlayer(email: String!, password: String!, dateOfBirth: String!): String!
    alterPoints(point: Int!, attempts: Int!, id: ID!): Points!
    getPlayer(email: String!, password: String!): ID!
  }
`;

module.exports = mutationDefs;
