const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    const events = await Event.find().populate('user', "name");

    res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async(req, res = response) => {
    const evento = new Event(req.body);
    evento.user = req.uid;
    
    try {
        const eventSave = await evento.save();
        res.status(201).json({
            ok: true,
            evento: eventSave
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar evento'
        })
    }
}

const updateEvent = async(req, res = response) => {
    const eventID = req.params.id;

    try {
        const evento = await Event.findById(eventID);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }
        
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Operacion invalida al editar el evento'
            })
        }

        const nuevoEvento = { ...req.body, user:req.uid }
        const eventoUpt = await Event.findByIdAndUpdate(eventID, nuevoEvento, {new: true});

        res.status(200).json({
            ok: true,
            evento: eventoUpt
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar evento'
        })
    }
}

const deleteEvent = async(req, res = response) => {
    const eventID = req.params.id;

    try {
        const evento = await Event.findById(eventID);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }
        
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Operacion invalida al editar el evento'
            })
        }

        await Event.findByIdAndDelete(eventID)
        res.status(200).json({
            ok: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar evento'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}