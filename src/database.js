const mongoose = require("mongoose")

mongoose
    .connect("mongodb://Localhost/mean-products",{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then((db)=> console.log("Db is conected"))
    .catch((err)=>console.error(err));


