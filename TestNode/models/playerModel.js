const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: String,
        required: true
    }
})

const Player = mongoose.model('Player', playerSchema )

module.exports = Player