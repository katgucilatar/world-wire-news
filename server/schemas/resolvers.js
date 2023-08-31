const { User, News } = require("../models");
const { signToken, AuthenticationError } = require("../utils");

const {
  generateResetToken,
  sendResetEmail,
  hashPassword,
} = require("../utils/helpers");

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
    news: async (parent, { email }) => {
      const params = email ? { email } : {};
      return News.find(params).sort({ latest_publish_date: -1 });
    },
  },

  Mutation: {
    register: async (
      parent,
      { firstName, lastName, email, password, userDefaultNews, selectedCountry }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        userDefaultNews,
        selectedCountry,
      });
      const token = signToken(user);
      return { token, currentUser: user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
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
      throw new AuthenticationError(
        "You need to be logged in to perform this action"
      );
    },

    deleteNews: async (parent, { newsId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedNews: newsId } },
          { new: true }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to perform this action"
      );
    },

    forgotPassword: async (parent, { email }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("No account associated with this email address.");
      }

      const resetToken = generateResetToken();

      user.resetToken = resetToken;
      await user.save();

      const emailStatus = await sendResetEmail(email, resetToken);

      if (!emailStatus) {
        return {
          success: false,
          message: "Error sending reset email. Please try again.",
        };
      }

      return {
        success: true,
        message: "Reset email sent successfully.",
      };
    },

    resetPassword: async (parent, { token, newPassword }) => {
      const user = await User.findOne({ resetToken: token });

      if (!user) {
        throw new Error("Invalid or expired token.");
      }

      const hashedPassword = await hashPassword(newPassword);

      user.password = hashedPassword;
      user.resetToken = null; // Clear the reset token
      await user.save();

      return {
        success: true,
        message: "Password reset successfully.",
      };
    },
  },
};

module.exports = resolvers;
