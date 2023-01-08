const mongoose = require('mongoose');

//Schema
const todosModel=mongoose.Schema({
    todo:{type:String,required:true},
    status:{type:Boolean,required:true,default:false},
    date:{type:String,required:true},
    userId:{type:String,required:true},
})

//Model
const TodosModel=mongoose.model("todo",todosModel);
module.exports=TodosModel;