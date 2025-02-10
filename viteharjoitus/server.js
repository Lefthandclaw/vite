import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

let users = [
  { id: 1, username: 'john', email: 'john@example.com' },
  { id: 2, username: 'jane', email: 'jane@example.com' }
];

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API! Use the endpoints: /api/users or /api/items');
});


app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/users', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User added successfully', user: newUser });
});

app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully', user: deletedUser[0] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


app.get('/api/items', (req, res) => {
  res.json(items);
});

app.use((err, req, res, next) => {
  console.error(err.stack);  
  res.status(500).json({ message: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
