const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['JFK', 'LAX', 'ORD', 'SEA'],
    },
    arrival: Date,
});

const flightSchema = new Schema({
    airline: String,
    airport: String,
    flightNo: Number,
    departs: Date,
    destinations: [destinationSchema],
});

module.exports = mongoose.model('Flight', flightSchema);