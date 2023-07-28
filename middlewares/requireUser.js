const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config('./.env');

module.exports = async (req, res, next) => {

    try {

        if (
            !req.headers ||
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer')
        ) {

            return res.status(401).send('Authorization headers is Required');

        };

        const accessToken = req.headers.authorization.split(' ')[1];

        try {

            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_PRIVATE_KEY
            );
            req._id = decoded._id;
            next();

        } catch (error) {

            console.log(error);
            return res.status(401).send('Invalid Access Token');

        }


    } catch (error) {

        console.log(error);

    }

};