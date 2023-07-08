const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});
/*
  title: { type: String, required: true},
  firstname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  surname: { type: String, required: true, minlength: 3},
  phone: { type: Number, required: true},
  email: { type: String, required: true},
  addressOne: { type: String, required: true},
  addressTwo: {type: String, required: false},
  town: { type: String, required: true},
  city: { type: String, required: true},
  eircode: { type: String, required: false},

*/

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const phone = req.body.phone;
  const email = req.body.email;
  const addressOne = req.body.addressOne;
  const addressTwo = req.body.addressTwo;
  const town = req.body.town;
  const city = req.body.city;
  const eircode = req.body.eircode;
  const job = req.body.job;
  const dob = req.body.dob;
  const parent = req.body.parent;
  const virtual = req.body.virtual;
  const gender = req.body.gender;

  const newUser = new User({
    title,
    firstname,
    surname,
    phone,
    email,
    addressOne,
    addressTwo,
    town,
    city,
    eircode,
    job,
    dob,
    parent,
    virtual,
    gender

  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.title = req.body.title;
      user.firstname = req.body.firstname;
      user.surname = req.body.surname;
      user.phone = req.body.phone;
      user.email = req.body.email;
      user.addressOne = req.body.addressOne;
      user.addressTwo = req.body.addressTwo;
      user.town = req.body.town;
      user.city = req.body.city;
      user.job = req.body.job;
      user.eircode = req.body.eircode;
      user.dob = req.body.dob;
      user.parent = req.body.parent;
      user.virtual = req.body.virtual;
      user.gender = req.body.gender;

      user.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;