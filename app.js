import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json())

let todos = []

app.get("/todos", (req, res) => {
    res.json(todos);
})

//POST
app.post("/todos", (req, res) => {
    const { text } = req.body
    if (!text) return res.status(400).json({error: "Brak tekstu zadania"})

    const newTodo = {id: Date.now(), text, done: false};
    todos.push(newTodo);
    res.status(201).json(newTodo)
})

//GET

app.get("/todos", (req, res) => {
    res.json(todos)
})

//PATCH

app.patch("/todos/:id", (req, res) => {
    const id = Number(req.params.id)
    const todo = todos.find(t => t.id === id)
    if (!todo) return res.status(404).json({ error: "Nieznalezionko"})
})

//DELETE

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: "Usunięto zadanie" });
});

app.listen(PORT,() => console.log(`Serwer działa na localhost:${PORT}`))