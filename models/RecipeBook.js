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
        default: function() {
            return this.userId; // use the passed-in user_id as the default value
        },
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


// default: function() {
        //     // Add logic here to get the logged-in user's ID from the JWT token
        //     const userData = await verify(accessToken);
        //     // console.log(userData);
        //     // console.log("User Data: ", accessToken, userData);
        //     const user = await User.findById(userData.user_id);

        //     const token = /* Replace 'token' with the actual code to get the JWT token */;
        //     const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
        //     const loggedInUserId = decodedToken.user_id;
        //     return loggedInUserId;
        // },
        // validate: {
        //     validator: async function (value) {
        //         const user = await User.findById(value);
        //         return user !== null;
        //     },
        //     message: 'Owner must be an existing user'
        // }