const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');

// Insert a event, with an user related to it
const insertEvent = async (req, res) => {
    const reqUser = req.user;
    const user = await User.findById(reqUser._id).select('-password');

    // Check date validity
    if(req.body.start >= req.body.end) {
        res.status(422).json({ errors: ['A data de início deve ser anterior à data de término!'] });
        return;
    }

    const newEvent = await Event.create({
        title: req.body.title,
        organizer: user,
        attendees: req.body.attendees,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        description: req.body.description
    });

    // If event was created successfully, return success message
    if (!newEvent) {
        res.status(422).json({ errors: ['Houve um erro, por favor tente mais tarde!'] });
        return;
    }

    res.status(201).json(newEvent);
}

// Update event
const editEvent = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    // Check date validity
    if(req.body.start >= req.body.end) {
        res.status(422).json({ errors: ['A data de início deve ser anterior à data de término!'] });
        return;
    }

    try {
        const event = await Event.findById(id);

        // Check if event exists
        if (!event) {
            res.status(404).json({ errors: ['Evento não encontrado!'] });
            return;
        }
        // Check if event organizer matches logged in user
        if (!event.organizer._id.equals(reqUser._id)) {
            res.status(401).json({ errors: ['Você não tem permissão para editar este evento!'] });
            return;
        }
        
        event.title = req.body.title || event.title;
        event.attendees = req.body.attendees || event.attendees;
        event.start = req.body.start || event.start;
        event.end = req.body.end || event.end;
        event.location = req.body.location || event.location;
        event.description = req.body.description || event.description;

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ errors: ['Evento não encontrado!'] });
        return;
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const event = await Event.findById(id);

        // Check if event exists
        if (!event) {
            res.status(404).json({ errors: ['Evento não encontrado!'] });
            return;
        }

        // Check if event organizer matches logged in user
        if (!event.organizer._id.equals(reqUser._id)) {
            res.status(401).json({ errors: ['Você não tem permissão para deletar este evento!'] });
            return;
        }

        await Event.findByIdAndDelete(id);
        res.status(200).json({ id: id, message: 'Evento deletado com sucesso!' });

    } catch (error) {
        res.status(404).json({ errors: ['Evento não encontrado!'] });
        return;
    }

}

// Get all Events
const listAllEvents = async (req, res) => {
    const events = await Event.find().sort('-createdAt').exec();
    res.status(200).json(events);
}

// Get user Events
const listUserEvents = async (req, res) => {
    const reqUser = req.user;
    const events = await Event.find({ 'organizer._id': reqUser._id }).sort('-createdAt').exec();
    res.status(200).json(events);
}

// Get event by ID
const listEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        // Check if event exists
        if (!event) {
            res.status(404).json({ errors: ['Evento não encontrado!'] });
            return;
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ errors: ['Evento não encontrado!'] });
        return;
    }
}

module.exports = {
    insertEvent,
    editEvent,
    deleteEvent,
    listAllEvents,
    listUserEvents,
    listEventById,
};