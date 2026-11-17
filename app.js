
const express = require("express");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");

// Port
const PORT = 8080;

// Tasks array
let tasks = [];


// 1. Add a new task
app.post("/tasks", (req, res) => {

    let { title, description } = req.body;

    let newTask = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
    };

    tasks.push(newTask);

    res.redirect("/");
});


// 2. Delete a task
app.post("/tasks/:id/delete", (req, res) => {

    let { id } = req.params;

    tasks = tasks.filter((task) => task.id != id);

    res.redirect("/");
});


// 3. Open the Edit Task page
app.get("/tasks/:id/edit", (req, res) => {

    let { id } = req.params;

    let task = tasks.find((task) => task.id == id);

    if (!task) {
        return res.status(404).send("Task not found");
    }

    res.render("edit.ejs", { task });
});


// 4. Update an existing task
app.post("/tasks/:id/edit", (req, res) => {

    let { id } = req.params;

    let { title, description } = req.body;

    let task = tasks.find((task) => task.id == id);

    if (!task) {
        return res.status(404).send("Task not found");
    }

    task.title = title;
    task.description = description;

    res.redirect("/");
});


// 5. Mark a task as complete or incomplete
app.post("/tasks/:id/complete", (req, res) => {

    let { id } = req.params;

    let task = tasks.find((task) => task.id == id);

    if (task) {
        task.completed = !task.completed;
    }

    res.redirect("/");
});


// 6. Homepage
app.get("/", (req, res) => {

    res.render("index.ejs", { tasks });

});


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

