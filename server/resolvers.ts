import { Resolvers } from "./generated/graphql";
import { UserModel } from "./models/User";

export const resolvers: Resolvers = {
  Query: {
    async user(parent, args, context, info) {
      return await UserModel.findById(args.id);
    },
  },
};
