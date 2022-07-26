const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/event');
const { isDate } = require('../helpers/isDate');
const { validateField } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use(validarJWT);

router.get('/', getEvents);

router.post('/', 
    [
        check('title', 'Titulo obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion obligatoria').custom(isDate),
        validateField
    ], 
    createEvent);

router.put('/:id', 
    [
        
    ]
    ,updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router; 