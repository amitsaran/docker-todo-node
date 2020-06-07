const mongoose = require("mongoose");

async function connect(mongoURI = "mongodb+srv://amit:amit@cluster0-sw1lq.mongodb.net/todo-tdd?retryWrites=true&w=majority"){
    try{
        await mongoose.connect(
            mongoURI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            } 
        );

        return mongoose.connection;

    } catch(err){
        console.log("Error connecting to mongodb cluster");
        console.log(err);
    }
}
//mongodb+srv://amit:<password>@cluster0-sw1lq.mongodb.net/test?retryWrites=true&w=majority

module.exports = { connect };