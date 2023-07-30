const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { error, success } = require("../utils/responseWrapper");

dotenv.config('./.env');

// controllers //

const signupController = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.send(error(400, 'All fields are required'));
        }

        let oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.send(error(409, 'User is already Registered'));

        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            email,
            password: hasedPassword

        });

        return res.send(success(201, {
            user
        }));

    } catch (error) {

        console.log(error);

    };

};

const loginController = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.send(error(400, 'All fields are required'));
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.send(error(404, 'User not found'));
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.send(error(404, 'Incorrect password'));
        }

        const accessToken = generateAccessToken({ _id: user._id });

        const refreshToken = generateRefreshToken({ _id: user._id });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
        })

        return res.send(success(200, {
            accessToken: accessToken
        }));

    } catch (error) {

        console.log(error);

    }

};

const refreshAccessTokenController = (req, res) => {

    const cookies = req.cookies;

    if (!cookies.jwt) {

        return res.send(error(401, 'Refresh token in cookie required'));

    }

    const refreshToken = cookies.jwt;

    try {

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_PRIVATE_KEY
        )

        const _id = decoded._id;
        const accessToken = generateAccessToken({ _id });

        return res.send(success(201, {
            accessToken: accessToken
        }));

    } catch (error) {

        console.log(error);
        return res.send(error(401, 'Invalid Refresh Token'));

    }

};

// functions //

const generateAccessToken = (data) => {

    try {

        let token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '15s'
        });
        return token;

    } catch (error) {

        console.log(error);

    }

};

const generateRefreshToken = (data) => {

    try {

        let token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y'
        });
        return token;

    } catch (error) {

        console.log(error);

    }

};

// exports //

module.exports = {
    signupController,
    loginController,
    refreshAccessTokenController
}