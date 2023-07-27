const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbconnect = require('./dbconnect');
const authRouter = require('./routers/authRouter');

dotenv.config('./.env');
dbconnect();

app.use('/auth', authRouter);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});