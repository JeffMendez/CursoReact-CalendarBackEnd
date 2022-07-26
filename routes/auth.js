const { Router } = require('express');
const { check } = require('express-validator');
const { addUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.post('/', 
    [
        check('email', 'Correo incorrecto').isEmail(),
        check('password', 'Mayor o igual de 5 caracteres').isLength({min: 6}),
        validateField
    ], 
    loginUser);

router.post('/new', 
    [
        check('name', 'Nombre obligatorio').not().isEmpty(),
        check('email', 'Correo incorrecto').isEmail(),
        check('password', 'Mayor o igual 5 caracteres').isLength({min: 6}),
        validateField
    ], 
    addUser);

router.get('/renew', [validarJWT], revalidateToken);

module.exports = router;