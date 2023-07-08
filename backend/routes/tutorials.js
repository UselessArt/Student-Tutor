const router = require('express').Router();
let Tutorial = require('../models/tutorial.model');

router.route('/').get((req, res) => {
  Tutorial.find()
    .then(tutorials => res.json(tutorials))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
date: { type: Date, required: true },
time: { type: Number, required: true },
students: { type: String, required: true },
tutor: { type: String, required: true },
fee: { type: Number, required: true },
tutorialNum: { type: Number, required: true },
attendance: { type: String, required: true },
subject: { type: String, required: true },
notes: { type: String, required: true }

*/

router.route('/add').post((req, res) => {
  const date = Date.parse(req.body.date);
  const time = Number(req.body.time);
  const students = req.body.students;
  const tutor = req.body.tutor;
  const fee = Number(req.body.fee);
  const tutorialNum = Number(req.body.tutorialNum);
  const attendance = req.body.attendance;
  const subject = req.body.subject;
  const notes = req.body.notes;

  

  const newTutorial = new Tutorial({
    date,
    time,
    students,
    tutor,
    fee,
    tutorialNum,
    attendance,
    subject,
    notes
  });

  newTutorial.save()
  .then(() => res.json('Tutorial added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Tutorial.findById(req.params.id)
    .then(tutorial => res.json(tutorial))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Tutorial.findByIdAndDelete(req.params.id)
    .then(() => res.json('Tutorial deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Tutorial.findById(req.params.id)
    .then(tutorial => {
      tutorial.date = Date.parse(req.body.date);
      tutorial.time = req.body.time;
      tutorial.students = req.body.students;
      tutorial.tutor = req.body.tutor;
      tutorial.fee = req.body.fee;
      tutorial.tutorialNum = req.body.tutorialNum;
      tutorial.attendance = req.body.attendance;
      tutorial.subject = req.body.subject;
      tutorial.notes = req.body.notes;
      

      tutorial.save()
        .then(() => res.json('Tutorial updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;