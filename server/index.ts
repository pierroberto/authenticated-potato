import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import path from "path";
import { Resolvers } from "./generated/graphql";
import { resolvers } from "./resolvers";

dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster1.btwswt7.mongodb.net/?retryWrites=true&w=majority`;

const typeDefs = readFileSync("./server/schema/schema.graphql", "utf8");

async function startApolloServer(typeDefs: string, resolvers: Resolvers) {
  const port = process.env.PORT;
  if (!port) {
    throw new Error("PORT not set");
  }
  const app = express();
  const httpServer = http.createServer(app);

  app.get("/", (req, res) => {
    console.log("Current location: ", __dirname);
    return res.sendFile(path.join(__dirname, "..", "client", "index.html"));
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(() => {
    return mongoose
      .connect(MONGO_URL, { dbName: "session" })
      .then(() => {
        console.log("⚡️[MongoDB]: MongoDB is connected");
        return httpServer.listen({ port });
      })
      .then(() => {
        console.log(
          `⚡️[Server]: Server ready at http://localhost:${port}${server.graphqlPath}`
        );
      });
  });
}

startApolloServer(typeDefs, resolvers);
