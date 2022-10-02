import jwt from 'jsonwebtoken'
import { Resolvers, User } from './generated/graphql'
import { UserModel } from './models/User'

export const resolvers: Resolvers = {
  Query: {
    async user(parent, { username, password }, context, info) {
      const maybeUser = await UserModel.findOne({
        username,
        password,
      })
      if (!maybeUser) return
      const token = jwt.sign(
        { username: maybeUser.username ?? '' },
        'secretkeyappearshere',
        { expiresIn: '1h' },
      )
      console.log('token', token)
      return maybeUser || ({} as User)
    },
  },
}
