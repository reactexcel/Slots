const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require('./schema/resolvers')
const typeDefs = require('./schema/defs')
require('dotenv').config()
const mongoose = require("mongoose");


const connectToDatabase= async ()=>{
    try{
        const uri = process.env.MONGODB_URI;
        const connection = await mongoose.connect(uri);
        if(connection){
            return `Database is connected`
        }
    }catch(error){
        return error
    }
}

const startServer = async()=>{
    console.log(await connectToDatabase())
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start()
    const app = express();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}
startServer()

