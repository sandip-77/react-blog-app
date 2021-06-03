const mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    }

    
}, { timestamps: true})


module.exports = mongoose.model("Category", CatagorySchema);