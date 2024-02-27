const express = require('express');
var cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT;


// MiddleWare
app.use(cors());
app.use(express.json());


const users = [];

app.get('/', (req, res) => {
  res.send('Welcome!');
})

// Get Users
app.get('/api/v1/users', (req, res) => {
  res.send(users)
})

// Add Users
app.post('/api/v1/users', (req, res) => {
  const { name, email } = req.body;
  users.push({
    name: name,
    email: email,
    id: Date.now()
  })
  res.send('User Added!')
})

// Delete User
app.delete('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === Number(id));
  if (index === -1) {
    res.send('User Not Found!');
    return
  }
  users.splice(index, 1)
  res.send('User Deleted!')
})

// Update User
app.put('/api/v1/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const index = users.findIndex((user) => user.id === Number(id));
  if (index === -1) {
    res.send('User Not Found!');
    return
  }
  users[index].name = name;
  users[index].email = email;
  res.send('User Updated!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})