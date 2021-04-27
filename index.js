const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

const configs = require('./configs');
const apiRoutes = require('./api/routes');

const app = express();

mongoose.connect(
    configs.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log(err);
            process.exit();
        }

        console.log('Database connection stablished');
    }
);
mongoose.Promise = global.Promise;

app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(configs.RUNNING_MODE));

app.use('/api', apiRoutes);

app.use(express.static('frontend'));

app.listen(configs.SERVER_PORT, () => {
    console.log(`Server listening on port ${configs.SERVER_PORT}`);
});
