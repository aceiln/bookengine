const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("thoughts");
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            if (!user) {
                throw AuthenticationError;
            }
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw AuthenticationError;
            }
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return ({ token, user });
        },
        saveBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return Book.findOneAndUpdate(
                    { _id: bookID },
                    { $addToSet: { Book: bookId } }
                );
            }
        },
        deleteBook: async (parent, { user, body }, context) => {
          if (context.user) {
            return Book.findOneAndUpdate({ _id: User });
          }
          throw AuthenticationError;
        },
      },
    };
    
    module.exports = resolvers;