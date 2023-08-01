const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { error } = require('../utils/responseWrapper');
const User = require('../models/User');

dotenv.config('./.env');

module.exports = async (req, res, next) => {

    try {

        if (
            !req.headers ||
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer')
        ) {

            return res.send(error(401, 'Authorization headers is Required'));

        };

        const accessToken = req.headers.authorization.split(' ')[1];

        try {

            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_PRIVATE_KEY
            );
            req._id = decoded._id;

            const user = await User.findById(req._id);

            if (!user) {

                return res.send(error(404, "User not found"));

            };

            next();

        } catch (e) {

            console.log(e);
            return res.send(error(401, 'Invalid Access Token'));

        }


    } catch (e) {

        console.log(e);

    }

};