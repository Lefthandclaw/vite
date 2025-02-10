// users.js
import { fetchData, showToast } from './fetch.js';

// Fetch users and create the user table
const fetchUsers = async () => {
  const users = await fetchData('http://127.0.0.1:3000/api/users');
  
  const tableBody = document.querySelector('#usersTable tbody');
  tableBody.innerHTML = ''; // Clear previous rows

  users.forEach((user) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>
        <button class="check" data-id="${user.id}">Info</button>
        <button class="del" data-id="${user.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Add event listeners for Info and Delete buttons
  addButtonEventListeners();
};

// Add event listeners for Info and Delete buttons
const addButtonEventListeners = () => {
  document.querySelectorAll('.check').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const userId = event.target.dataset.id;
      const user = await fetchData(`http://127.0.0.1:3000/api/users/${userId}`);
      alert(`User Info: ${JSON.stringify(user)}`);
    });
  });

  document.querySelectorAll('.del').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const userId = event.target.dataset.id;
      await deleteUser(userId);
    });
  });
};

// Delete user
const deleteUser = async (userId) => {
  try {
    await fetchData(`http://127.0.0.1:3000/api/users/${userId}`, { method: 'DELETE' });
    showToast('User deleted successfully');
    fetchUsers(); // Refresh user list
  } catch (error) {
    showToast('Failed to delete user', 'error');
  }
};

// Add user through form
const addUser = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;

  const newUser = {
    username,
    password,
    email,
  };

  try {
    await fetchData('http://127.0.0.1:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    });
    showToast('User added successfully');
    fetchUsers(); // Refresh user list
  } catch (error) {
    showToast('Failed to add user', 'error');
  }
};

export { fetchUsers, addUser };
