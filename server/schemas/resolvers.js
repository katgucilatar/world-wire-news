const { User, News } = require("../models");
const { signToken, AuthenticationError } = require("../utils");

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
    news: async (parent, { email }) => {
      const params = email ? { email } : {};
      return News.find(params).sort({ latest_publish_date: -1 });
    },
  },

  Mutation: {
    register: async (parent, { firstName, lastName, email, password, userDefaultNews, selectedCountry }) => {
      const user = await User.create({ firstName, lastName, email, password, userDefaultNews, selectedCountry });
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

    saveNews: async (parent, { saveNews }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedNews: saveNews },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        const token = signToken(updatedUser);
        return { token, currentUser: updatedUser };
      } else {
        throw new AuthenticationError("User not authenticated");
      }
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
  }
};

module.exports = resolvers;
