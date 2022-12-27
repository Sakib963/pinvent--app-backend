const mongoose = require("mongoose");


const customerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    name:{
        type: String,
        required: [true, "Please add a name"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Please add a description"],
        trim: true
    },
    
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;