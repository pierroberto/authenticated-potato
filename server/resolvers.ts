import { Resolvers } from './generated/graphql'
import { UserModel } from './models/User'

export const resolvers: Resolvers = {
  Query: {
    async user(parent, { username, password }, context, info) {
      return await UserModel.findOne({
        username,
        password,
      })
    },
  },
}
