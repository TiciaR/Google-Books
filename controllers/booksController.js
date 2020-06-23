const db = require("../models");
const mongoose = require("mongoose");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/googlebooks"
);

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Book
      .find({})
      .sort({ date: -1 })
      .then(dbModel => {
        res.json(dbModel)
      }
      )
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Book
      .find({ title: req.body.title }) // find first to see if the book is already saved
      .then(
        function (dbModel) {
          if (dbModel.length > 0) { // if book is already saved, just return a message
            res.send("Already Saved"); }
          else { // if not, then save the book
            db.Book
              .create(req.body)
              .then(dbModel => res.json(dbModel))
              .catch(err => res.status(422).json(err));
          }
        }

      )
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
