import { fetchData, showToast } from './fetch.js';

const fetchUsers = async () => {
  const users = await fetchData('http://127.0.0.1:3000/api/users');
  
  const tableBody = document.querySelector('#usersTable tbody');
  tableBody.innerHTML = ''; // Clear current rows

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

  addButtonEventListeners();
};

// Add event listeners to buttons for Info and Delete
const addButtonEventListeners = () => {
  document.querySelectorAll('.check').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const userId = event.target.dataset.id;
      const user = await fetchData(`http://127.0.0.1:3000/api/users/${userId}`);
      openModal(user); // Open modal with user data
    });
  });

  document.querySelectorAll('.del').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const userId = event.target.dataset.id;
      await deleteUser(userId);
    });
  });
};

// Open the modal with user details
const openModal = (user) => {
  document.getElementById('userId').textContent = user.id;
  document.getElementById('userName').textContent = user.username;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userRole').textContent = user.role;

  document.getElementById('userModal').style.display = 'block'; // Show modal
};

// Close the modal when clicking on the close button
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('userModal').style.display = 'none'; // Hide modal
});

// Close the modal if the user clicks outside of the modal
window.addEventListener('click', (event) => {
  const modal = document.getElementById('userModal');
  if (event.target === modal) {
    modal.style.display = 'none'; // Hide modal
  }
});

// Function to delete a user
const deleteUser = async (userId) => {
  try {
    await fetchData(`http://127.0.0.1:3000/api/users/${userId}`, { method: 'DELETE' });
    showToast('User deleted successfully');
    fetchUsers(); // Refresh the user list
  } catch (error) {
    showToast('Failed to delete user', 'error');
  }
};

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
    fetchUsers(); // Refresh the user list
  } catch (error) {
    showToast('Failed to add user', 'error');
  }
};

export { fetchUsers, addUser };
