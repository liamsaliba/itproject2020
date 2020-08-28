// Router for user
// Operators: CRUD (Create, Read, Update, Delete)
// Author: Josh (joshnguyen99)

// Create a new router
const router = require('express').Router();

// Get the User schema
let User = require('../models/user.model')

// Find all users
router.route('/').get((_req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err))
});


// Create a user and add it to the database
router.route('/add').post((req, res) => {
  // Create a new user
  const username = req.body.username;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const newUser = new User({ username, firstName, middleName, lastName });

  // Save the new User to the database
  newUser.save()
    .then(() => res.json(`New user added!`))
    .catch(err => res.status(400).json(err));
})


// Find a user by ID
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});


// Update user by id
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      // User found, so update and save it
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.middleName = req.body.middleName;
      user.lastName = req.body.lastName;

      user.save()
        .then(() => res.json("User updated."))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => req.status(400).json(err));
})


// Delete user by id
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

module.exports = router;