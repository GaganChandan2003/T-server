const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();

//Connection
const connection = require("./config/db");

//Controllers
const userController = require('./routes/user.routes');
const todosController = require('./routes/todos.routes');

//Routes
app.get("/", (req, res) => {res.send("Homepage")})
app.use("/user",userController);
app.use("/todos",todosController);

//Listening to server
app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected with server")
    }
    catch {
        console.log("Disconnected with server")
    }
    console.log("listening on port http://localhost:8080")
})