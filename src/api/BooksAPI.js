const api = 'https://reactnd-books-api.udacity.com';

let token = localStorage.token;

if (!token) {
  // Old code which is not cryptographically secure.
  // token = localStorage.token = Math.random().toString(36).substr(-8);

  // Modern code which uses crypto for stronger randomness.
  // token = crypto.randomUUID();

  // Using hardcoded code ensuring to use the same data while testing.
  token = 'udacity-reactnd-myreads-2025-jp';
}

const headers = {
  Accept: 'application/json',
  Authorization: `${token}`,
};

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => data.book)
    .catch((error) => {
      console.error('Fetch error:', error.message);
      throw error;
    });

export const getAsync = async (bookId) => {
  try {
    const res = await fetch(`${api}/books/${bookId}`, { headers });
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data.book;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => data.books)
    .catch((error) => {
      console.error('Fetch error:', error.message);
      throw error;
    });

export const getAllAsync = async () => {
  try {
    const res = await fetch(`${api}/books`, { headers });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    // console.log('Name:', error.name); // Type of error (e.g., ReferenceError)
    // console.log('Message:', error.message); // Error message
    // console.log('Stack:', error.stack); // Stack trace (non-standard but widely supported)

    // Rethrow the error for higher-level handling
    throw error;
  }
};

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      return res.json();
    })
    .catch((error) => {
      console.error('Fetch error:', error.message);
      throw error;
    });

export const updateAsync = async (book, shelf) => {
  if (!book) {
    throw new Error('Book object is NULL');
  }

  if (!shelf) {
    throw new Error('Shelf NULL');
  }

  try {
    const res = await fetch(`${api}/books/${book.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ shelf }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => data.books)
    .catch((error) => {
      console.error('Fetch error:', error.message);
      throw error;
    });

export const searchAsync = async (query, maxResults) => {
  try {
    const res = await fetch(`${api}/search`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, maxResults }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

export default {
  get,
  getAsync,
  getAll,
  getAllAsync,
  update,
  updateAsync,
  search,
  searchAsync,
};
