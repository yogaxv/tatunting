require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const socketio = require('socket.io');
const jwt = require('jwt-simple');

const db = require('./utils/database');
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

(async function () {
    try {
        await db.authenticate();
        console.log('DB Connection has been established successfully.');
    } catch (error) {
        throw new Error(error);
    }
})();

app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    if (err.name === 'MulterError') {
        if (err.message === 'File too large') {
            return res
                .status(400)
                .send({ error: 'Your file exceeds the limit of 10MB.' });
        }
    }

    res.status(err.statusCode || 500).send({
        error:
            err.statusCode >= 500 && !err.message
                ? 'An unexpected error ocurred, please try again later.'
                : err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});
