var mongoose = require('mongoose');

// require model
require('../models/task');

var Task = mongoose.model('Task');

module.exports = {
    index : (req, res) => {
        Task.find({}, function(err, task){
            if(err){
                console.log('Returned error', err);
                res.json({message: 'Error', error: err})
            } else {
                res.json({message: 'Success', data: task})
            }
        })
    },
    task: (req, res) => {
        Task.find({_id: req.params.id}, function(err, task){
            if(err){
                console.log('Returned error', err);
                res.json({message: 'Error', error: err})
            } else {
                res.json({message: 'Success there', data: task})
            }
        })
    },
    create: (req, res) => {
        Task.create(req.body, function(err, newtask){
            if(err){
                console.log('Returned error', err);
                res.json({message: 'Error', error: err})
            } else {
                console.log('Successful addition')
                res.json({result: newtask});
            }
        })
    },
    update: (req, res) => {
        Task.findByIdAndUpdate(req.params.id,{$set: req.body}, function(err, updatedtask){
          console.log('Updating');
          if(err){
                console.log('Returned error', err);
                res.json({message: 'Error', error: err})
            } else {
                updatedtask.title = req.body.title;
                updatedtask.description = req.body.description;
                res.json({message: 'Success', data: updatedtask})
            }
        })
    },
    delete: (req, res) => {
        Task.deleteOne({_id: req.params.id}, function(err, deltask){
            if(err){
                console.log('Returned error', err);
                res.json({message: 'Error', error: err})
            } else {
                res.json({message: 'Success',result: deltask})
            }
        })
    }
}