const mongoose = require('mongoose');

async function connectDb(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/Tickets',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }) .then(()=>{console.log("connected to mongoDB")})
        .catch((err)=>console.log("connection failed with error",err))
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDb