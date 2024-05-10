const {Schema, model} = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    ingredients: {
        type: String,
        trim: true
    },
    instructions: {
        type: String,
        trim: true
    },
    recipe_book_id: {
        type: Schema.Types.ObjectId,
        ref: 'RecipeBook',
        required: [true, 'Recipe Book is required']
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    image_url: {
        type: String,
        default: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        match: [/^https?:\/\/.*/, 'URL is not valid']
    }
});

module.exports = model('Recipe', recipeSchema);