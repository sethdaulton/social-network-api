const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    console.log("Hit")
    Thought.find()
    .sort({createdAt:-1})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought by id
  getSingleThought(req, res) {
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

    addReaction(req, res) {
        Reaction.create(req.body)
          .then((reactionData) => {
            return User.findOneAndUpdate (
                {_id:req.body.userId },
                {$push:{reactions:reactionData._id}},
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
                message: "Reaction created"
            })
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      removeReaction(req, res) {
        Reaction.findOneAndRemove({
            _id: req.params.thoughtId
        })
        .then ((reactionData)=>{
            if (!reactionData){
                return res.status(404).json({
                    message: "No reaction with this id"
                })
            }
            return User.findOneAndUpdate(
            {_id:req.params.reactionId},
            {$pull:{reactions:req.params.reactionId}},
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
                message: "Reaction deleted"
            })
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
        },

}

module.exports = thoughtController


