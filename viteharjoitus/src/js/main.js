import '/src/css/style.css'
import javascriptLogo from '/src/javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from '/src/counter.js'
// main.js
import { fetchItems } from './items.js';
import { fetchUsers, addUser } from './users.js';

document.querySelector('#fetchItemsBtn').addEventListener('click', fetchItems);
document.querySelector('#fetchUsersBtn').addEventListener('click', fetchUsers);
document.querySelector('.formpost').addEventListener('submit', addUser);


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))