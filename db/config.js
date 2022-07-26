const mongoose = require('mongoose');
require('dotenv').config();

const env = process.env;

const dbConnection = async() => {
    try {
        await mongoose.connect(env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Online")

    } catch (error) {
        console.log(error)
        throw new Error("Error al conectar DB")
    }
}

module.exports = {
    dbConnection
}