import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import { resolvers } from "./resolvers";

dotenv.config();

const users = [
  {
    id: "1",
    name: "Elizabeth Bennet",
  },
  {
    id: "2",
    name: "Fitzwilliam Darcy",
  },
];

const MONGO_URL = ``;

const typeDefs = readFileSync("./server/schema/schema.graphql", "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("⚡️ [MongoDB]: MongoDB is connected");
    return server.listen().then(({ url }) => {});
  })
  .then(() => {
    console.log(`⚡️[Server]: Server is running at ${url}`);
  });
