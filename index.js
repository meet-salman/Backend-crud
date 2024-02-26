const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

//MIDDLEWARE
app.use(cors());
app.use(express.json());


const todos = [];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/todos', (req, res) => {
  res.send(todos)
})

app.post('/api/v1/todos', (req, res) => {
  const { title } = req.body;
  todos.push({
    title: title,
    id: Date.now()
  })
  res.send('Todo Added')
})

app.delete('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === Number(id))
  if (index === -1) {
    res.send('Todo Not Found!')
    return
  }
  todos.splice(index, 1);
  res.send('Todo Deleted')
})

app.put('/api/v1/todos/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === Number(id))
  if (index === -1) {
    res.send('Todo Not Found!')
    return
  }
  todos[index].title = title;
  res.send('Todo Updated')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})