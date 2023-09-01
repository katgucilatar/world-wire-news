const crypto = require("crypto");
const { User, News } = require("../models");
const { signToken, AuthenticationError } = require("../utils");
const { sendResetEmail } = require("../utils/helpers");

function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}

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
          { _id: context.user._id },
          { $pull: { savedNews: newsId } },
          { new: true }
        );
      }
      throw new AuthenticationError("User not authenticated");
    },

    forgotPassword: async (parent, { email }) => {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          success: false,
          message: "No account with this email address exists.",
        };
      }

      // Generate reset token
      const resetToken = generateResetToken();
      const resetTokenExpires = Date.now() + 3600000; // 1 hour time frame

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpires;

      await user.save();

      // reset email
      const emailSent = await sendResetEmail(email, resetToken);

      if (!emailSent) {
        return {
          success: false,
          message:
            "Error sending the password reset email. Please try again later.",
        };
      }

      return {
        success: true,
        message: "Password reset token generated successfully.",
      };
    },
  },
};

module.exports = resolvers;
