const mongoose = require("mongoose");

async function connect(){
    try{
        await mongoose.connect(
            "mongodb+srv://amit:amit@cluster0-sw1lq.mongodb.net/todo-tdd?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            } 
        );

    } catch(err){
        console.log("Error connecting to mongodb cluster");
        console.log(err);
    }
}
//mongodb+srv://amit:<password>@cluster0-sw1lq.mongodb.net/test?retryWrites=true&w=majority

module.exports = { connect };