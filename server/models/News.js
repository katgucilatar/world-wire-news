const { Schema } = require('mongoose');

const newsSchema = new Schema ({
    sourceCountry: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    language: {
        type: String
    },

    link: {
        type: String,
        required: true
    }

})

// BASED OFF ENDPOINTS OF SEARCH NEWS FROM WORLD NEWS API