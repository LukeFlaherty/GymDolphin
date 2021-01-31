const express = require('express');
const cors = require('cors');
// help us connect to the Mongo DB database
const mongoose = require('mongoose');

require('dotenv').config()

// creating express server
const app = express();
const port = process.env.PORT || 5000;

// cors middlewear our server send adn recieves json
app.use(cors());
app.use(express.json());

// from mongo db dashboard
const uri = process.env.ATLAS_URI;

// connecting passing in the uri
// flags deal with updates to mongo db
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

// once the connection is open than it logs that message
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// must require our routed files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// making sure the routed files are used when someone goes to our url/exercises and stuff
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// starts the server listening on a certain port
app.listen(port, () => {
    console.log("Server is running on Port: " + port);
});