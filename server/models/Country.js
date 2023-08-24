const { Schema, model } = require("mongoose");

const countrySchema = new Schema({
  countries: [
    {
      type: String,
      required: true,
    },
  ],
  countryId: {
    type: String,
    required: true,
  },
});

const Country = model("Country", countrySchema);

module.exports = Country;
