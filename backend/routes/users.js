// requireing express router and the models we created
const router = require('express').Router();
let User = require('../models/user.model');

// first API endpoint handling incoming http requests
// if it is a get request than this happens
// .find() gets list of all users from Mongo DB data base and returns a promise and json format
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// second endpoint handling incoming http post requests
// .save saves the new user to the database
// returns user added in json to show it worked 
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;