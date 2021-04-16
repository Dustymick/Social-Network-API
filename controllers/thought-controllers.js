const { Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
      Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    
    getThoughtsById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  

   // create thought
   // instead of req.body, body has been destructured
  createThoughts({ body }, res) {
      Thought.create( body )
      .then(({ _id, _doc }) => {
          return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } }
          ).then(res.json(_doc))
      })
      .catch(err => res.status(400).json(err));
  },

  
  updateThoughts({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));  
  },

  
  deleteThoughts({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = ThoughtController;