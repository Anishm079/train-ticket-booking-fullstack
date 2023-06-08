const mongoose = require("mongoose");

const trainTickets = new mongoose.Schema({
    seats:[Boolean]
})

module.exports = mongoose.model('trainTickets',trainTickets);