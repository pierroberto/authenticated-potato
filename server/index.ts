import { ApolloServer } from "apollo-server";
import { readFileSync } from "node:fs";
import { resolvers } from "./resolvers";

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

const typeDefs = readFileSync("./server/schema/schema.graphql", "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`⚡️[Server]: Server is running at ${url}`);
});
