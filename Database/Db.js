const mongoose = require('mongoose')
const url = process.env.MONGODB_URL
// const url = 'mongodb://0.0.0.0:27017/jobareaDB'

const Connection = async ()=>{
    try{
        mongoose.connect(url)
        console.log('mongodb connected');
    }catch(err){
        console.log(err);
    }
}

module.exports = Connection;