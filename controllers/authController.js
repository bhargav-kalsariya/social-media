const User = require("../models/User");
const bcrypt = require('bcrypt');

const signupController = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('All fields are required');
        }

        let oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send('User is already Registered');
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            email,
            password: hasedPassword

        });

        return res.status(201).json({
            user
        });

    } catch (error) {

        console.log(error);

    };

};

const loginController = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('All fields are required');
        }

        let oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(404).send('User not found');
        }

        const matched = await bcrypt.compare(password, oldUser.password);

        if (!matched) {
            return res.status(404).send('Incorrect password');
        }

    } catch (error) {

        console.log(error);

    }

};

module.exports = {
    signupController,
    loginController
}