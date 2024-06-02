const {connect} = require('mongoose');

module.exports = async function(){
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined. Please check your environment variables.');
        return;
    }
    try{
        const res = await connect(process.env.MONGO_URI);
        console.log(`DB connected: ${res.connection.host}`.yellow.underline);
    }
    catch(err){
        console.log(`DB Not connected: ${err.message}`.red);
    }
}