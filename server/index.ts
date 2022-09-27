import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import { resolvers } from "./resolvers";

dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.btwswt7.mongodb.net/?retryWrites=true&w=majority`;

const typeDefs = readFileSync("./server/schema/schema.graphql", "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("⚡️[MongoDB]: MongoDB is connected");
    return server.listen();
  })
  .then((serverInfo) => {
    console.log(`⚡️[Server]: Server is running at ${serverInfo.url}`);
  });
