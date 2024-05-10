const {Schema, model} = require('mongoose');

const recipeBookSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required']
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    banner_image_url: {
        type: String,
        default: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        match: [/^https?:\/\/.*/, 'URL is not valid']
    }
});

module.exports = model('RecipeBook', recipeBookSchema);