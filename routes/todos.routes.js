const express = require('express');
const TodosModel = require("../models/Todos.model");
const authentication = require('../middleware/authentication');
const todosController = express.Router();

//Getting todos
todosController.get("/", authentication, async (req, res) => {
    const { userId } = req.body;
    const todos = await TodosModel.find({ userId });
    try {
        res.status(200).json({ data: todos })
    }
    catch {
        res.status(404).json({ message: "Something went wrong" })
    }
})

//Posting todos
todosController.post("/", authentication, async (req, res) => {
    let { todo, userId, done } = req.body;
    let date = new Date().toISOString().slice(0, 10)
    let todos = new TodosModel({
        todo,
        done,
        date,
        userId
    })
    try {
        await todos.save();
        res.status(200).send({ message: "Todo created sucessfully" })
    }
    catch {
        res.status(404).send({ message: "Something went wrong" })
    }
})


// Updating status
todosController.get("/status/:id", authentication, async (req, res) => {
    let id=req.params.id
    const data = await TodosModel.findOne({_id:id});
    let updatedStatus = await TodosModel.findOneAndUpdate({ _id:id}, { status: !data.status }, { new: true });
    try {
        await updatedStatus.save();
        res.status(200).json({ message: "Updated status" })
    }
    catch {
        res.status(404).json({ message: "Something went wrong" })
    }
})

//Editing todos
todosController.patch("/:id/edit", authentication, async (req, res) => {
    let id = req.params.id;
    let { todo } = req.body;
    let date = new Date().toISOString().slice(0, 10)
    let updatedTodo = await TodosModel.findOneAndUpdate({ _id: id }, { todo: todo, date: date }, { new: true });
    try {
        await updatedTodo.save();
        res.status(200).json({ message: "Updated todo" ,updatedTodo})
    }
    catch {
        res.status(404).json({ message: "Something went wrong" })
    }
})

//Deleting todo
todosController.delete("/:id", authentication, async (req, res) => {
    let  id  = req.params.id;
    let deleted = await TodosModel.findOneAndDelete({ _id: id });
    try {
        res.status(200).send({ messege: "Deleted note", deleted })
    }
    catch
    {
        res.status(404).send({ messege: "Something went wrong", deleted })
    }

})

module.exports = todosController;
