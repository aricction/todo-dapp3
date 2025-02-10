const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title:{type: "String", require:true},
    description:{type:"String"},

    priority:{ type:String, enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    completed:{
        type:Boolean,
        default: false
    },
    aiEnhancedDetails:{
        type: Object,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
