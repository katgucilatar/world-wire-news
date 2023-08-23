const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils");

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
  },

  Mutation: {
    register: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, currentUser: user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, currentUser: user };
    },

    saveNews: async (parent, { userId, newsId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { savedNews: newsId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    deleteNews: async (parent, { newsId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id }, // added exception in eslintrc
          { $pull: { savedNews: newsId } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

saveNews: async (parent, { userId, newsId }, context) => {
  if (context.user) {
    return User.findOneAndUpdate(
      {_id: userId },
      {
        $addToSet: { savedNews: newsId },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  throw AuthenticationError;
},

deleteNews: async (parent, { newsId }, context) => {
  if (context.user) {
    return User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { savedNews: newsId } },
      { new: true }
    );
  }
  throw AuthenticationError;
    },
    
saveCountry: async (parent, { userId, countryId }, context) => {
  if (context.user) {
    return User.findOneAndUpdate(
      {_id: userId },
      {
        $addToSet: { savedCountries: countryId },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  throw AuthenticationError;
    },
    
  deleteCountry: async (parent, { countryId }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedCountries: countryId } },
        { new: true }
      );
    }
    throw AuthenticationError;
      },
  },
};

module.exports = resolvers;
