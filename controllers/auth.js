const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

const addUser = async(req, res = response) => {
    const { name, email, password } = req.body;

    try {
        let usuario = await User.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
     
        const salt = bcrypt.genSaltSync();
        usuario = new User( req.body );
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrarse'
        });
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        let usuario = await User.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y password no coinciden'
            });
        }
    
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al logearse'
        });
    }
}

const revalidateToken = async(req, res) => {
    const uid = req.uid;
    const name = req.name;
    
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    addUser,
    loginUser,
    revalidateToken,
};