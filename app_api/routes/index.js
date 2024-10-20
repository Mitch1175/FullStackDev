const express = require('express'); // Express app
const router = express.Router();    // Router login
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);


// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) //GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

    // GET Method routes tripsFindByCode - require parameter
    router
        .route('/trips/:tripCode')
        .get(tripsController.tripsFindByCode)
        .put(auth, tripsController.tripsUpdateTrip);

    module.exports = router;

