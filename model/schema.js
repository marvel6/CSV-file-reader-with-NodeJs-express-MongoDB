const mongoose = require('mongoose')


const regSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:[true,'please provide your first name']
    },
    lname:{
        type:String,
        required:[true,'please provide your last name']
    },
    level:{
        type:String,
        required:[true,'please provide your level']
    },
    matric:{
        type:String,
        required:[true,'please provide your matric number']
    },
    semester:{
        type:String,
        required:[true,'please provide your matric number']
    },
    createdWhen:{
        type:String
    }
});


module.exports = mongoose.model('registration Page',regSchema)