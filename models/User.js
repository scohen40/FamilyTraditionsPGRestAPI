const {Schema, model} = require('mongoose');
const {compare, genSalt, hash} = require('bcryptjs');

const userSchema = new Schema({
    userId:{ 
        type:Number, 
        required:true, 
        unique:true, 
        trim:true},
    username:{ 
        type:String, 
        required:[true, 'Username is required'], 
        unique:true, 
        trim:true },
    password:{ 
        type:String, 
        required:[true, 'Password is required'], 
        trim:true },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        trim:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is not valid'],
    },
    firstName:{ 
        type:String,
        required:[true, 'First name is required'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required'],
        trim:true
    },
    imageUrl:{
        type:String,
        default:'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        match:[/^https?:\/\/.*/, 'URL is not valid']
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

}, {timestamps:true});

userSchema.pre('save', async function(next){
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(password){
    return await compare(password, this.password);
}
module.exports = model('User', userSchema);