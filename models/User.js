/* This code snippet is defining a Mongoose schema for a user in a Node.js application. Here's a
breakdown of what each part of the code is doing: */
const {Schema, model} = require('mongoose');

const {compare, genSalt, hash} = require('bcryptjs');
const bcrypt = require('bcryptjs')


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
    isAdmin:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        required: true,
        default:true
    }

}, {timestamps:true});

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    // console.log(this);
    // console.log('entered password');
    // console.log(enteredPassword);
    // console.log('this password');
    // console.log(this.password);
    // console.log(await compare(enteredPassword, this.password));
    return await compare(enteredPassword, this.password);
    
}

module.exports = model('User', userSchema);