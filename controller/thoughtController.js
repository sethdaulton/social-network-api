const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .sort({createdAt:-1})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought by id
  getSingleThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughtData) => {
        if(!thoughtData){
            return res.status(404).json({ message: 'No thought with that ID' })
        }
          
          res.json(thoughtData)
        })
      .catch((err) => res.status(500).json(err));
  },
  // Post a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate (
            {_id:req.body.userId },
            {$push:{thoughts:thoughtData._id}},
            {new:true}
        )
      })
      .then ((userData) => {
        if (!userData){
            return res.status(404).json({
                message: "No user with this id"
            })
        }
        res.json({
            message: "Thought created"
        })
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Put a new user
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$set:req.body},
        {runValidators: true, new: true}
    )
      .then((thoughtData) => {
        if (!thoughtData){
            return res.status(404).json({
                message: "No thought with this id"
            })
        }
        res.json (thoughtData)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({
        _id: req.params.thoughtId
    })
    .then ((thoughtData)=>{
        if (!thoughtData){
            return res.status(404).json({
                message: "No thought with this id"
            })
        }
        return User.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$pull:{thoughts:req.params.thoughtId}},
        {new: true}
        )
    })
    .then((userData) => {
        if (!userData){
            return res.status(404).json({
                message: "No user with this id"
            })
        }
        res.json ({
            message: "Thought deleted"
        })
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

    

    //Add reaction and remove reaction 2 separate functions
}

module.exports = thoughtController


