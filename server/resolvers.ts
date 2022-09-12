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

const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return users.find((user) => user.id === args.id);
    },
  },
};

export default resolvers;
