const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
},{
    timestamps: true
});

var Todos = mongoose.model('Todo', TodoSchema);

module.exports=Todos;