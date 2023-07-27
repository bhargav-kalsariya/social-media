const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbconnect = require('./dbconnect');
const authRouter = require('./routers/authRouter');
const postsRouter = require('./routers/postsRouter');
const morgan = require('morgan');

dotenv.config('./.env');
dbconnect();

app.use(express.json());
app.use(morgan('common'));

// Routers //
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});