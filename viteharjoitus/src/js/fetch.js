// fetch.js
const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || 'Something went wrong');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast(error.message, 'error');
    }
  };
  
  // Show toast notification
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };
  
  export { fetchData, showToast };
  