const mongoose = require('mongoose')
const { Schema } = mongoose

const organizer = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    email: String
});

const eventSchema = new Schema({
    title: String,
    organizer: organizer,
    attendees: Array,
    start: Date,
    end: Date,
    location: String,
    description: String,
},
    {
        timestamps: true
    }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;