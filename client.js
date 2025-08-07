const axios = require('axios');

async function addBook(title, author) {
  try {
    const response = await axios.post('http://localhost:3000/books', {
      title,
      author
    });
    console.log('✅ Book Added:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addBook("The Alchemist", "Paulo Coelho");

