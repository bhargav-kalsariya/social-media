const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbconnect = require('./dbconnect');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const postsRouter = require('./routers/postsRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config('./.env');
dbconnect();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(morgan('common'));
app.use(cookieParser());

// Routers //

app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});