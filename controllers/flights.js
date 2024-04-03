const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show
}

function newFlight(req, res) {
    res.render('flights/new', { errorMsg: ''});
}

async function create(req, res) {
    // Trims white space off input airline
    req.body.airline = req.body.airline.trim();
    try {
        await Flight.create(req.body);
        res.redirect('/flights');
    } catch (err) {
        console.log(err);
        res.redirect('/flights/new');
    }
}

async function index(req, res) {
    const flights = await Flight.find({});
    res.render('flights/index', {
        flights
    })
}

async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        const tickets = await Ticket.find({ flight: flight._id });
        flight.destinations.sort((a, b) => a.arrival - b.arrival);
        await flight.save();
        res.render('flights/show', { title: 'Flight Detail', flight, tickets });
    } catch (err) {
        console.log(err);
        res.redirect('/flights'); 
    }
}