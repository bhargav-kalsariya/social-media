const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config('./.env');

let mongoUri = process.env.MONGOURL;

module.exports = async () => {

    try {

        const connect = await mongoose.connect(mongoUri);
        console.log(`mongodb connected to ${connect.connection.host}`);

    } catch (error) {

        console.log(error);
        process.exit(1);

    }

};