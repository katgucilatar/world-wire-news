const { Schema } = require('mongoose');

const newsSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    source_country: {
        type: String,
        required: true,
    },
    newsId: {
        type: String,
        required: true,
      },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    language: {
        type: String
    }

});

module.exports = newsSchema;

// BASED OFF ENDPOINTS OF SEARCH NEWS FROM WORLD NEWS API