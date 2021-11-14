const mongoose = require("mongoose")

mongoose
    .connect("mongodb+srv://sebastian:6ZPGMkayH3se0cSk@cluster0.x5aim.mongodb.net/products?retryWrites=true&w=majority",{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then((db)=> console.log("Db is conected"))
    .catch((err)=>console.error(err));


