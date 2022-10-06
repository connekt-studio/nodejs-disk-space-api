// create an express server on port 3000
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todo/all", (req, res) => {
  const todos = fs.readFileSync("todos.json");
  res.send({
    success: true,
    todos: JSON.parse(todos),
  });
});

app.post("/todo", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("todos.json"));

  const todo = req.body;
  todo.id = todos.length + 1;

  todos.push(todo);
  fs.writeFileSync("todos.json", JSON.stringify(todos));

  res.send({
    success: true,
    todo,
  });
});

app.put("/todo/:id", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("todos.json"));

  const id = req.params.id;
  const todo = req.body;
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    res.send({
      success: false,
      message: "Todo not found",
    });
  } else {
    todos[index] = todo;
    fs.writeFileSync("todos.json", JSON.stringify(todos));
    res.send({
      success: true,
      todo,
    });
  }
});

app.delete("/todo/:id", (req, res) => {
  const todos = JSON.parse(fs.readFileSync("todos.json"));

  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    res.send({
      success: false,
      message: "Todo not found",
    });
  } else {
    todos.splice(index, 1);
    fs.writeFileSync("todos.json", JSON.stringify(todos));
    res.send({
      success: true,
      message: "Todo deleted",
    });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
