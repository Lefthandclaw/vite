// items.js
import { fetchData } from './fetch.js';

const fetchItems = async () => {
  const items = await fetchData('http://127.0.0.1:3000/api/items');
  console.log(items);
};

export { fetchItems };
