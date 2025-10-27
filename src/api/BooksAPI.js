const api = 'https://reactnd-books-api.udacity.com';

let token = localStorage.token;

if (!token) {
  // Old code which is not cryptographically secure.
  // token = localStorage.token = Math.random().toString(36).substr(-8);

  // Modern code which uses crypto for stronger randomness.
  // token = crypto.randomUUID();

  // Modern code which uses crypto for stronger randomness.
  token = 'udacity-reactnd-myreads-2025-jp';
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAsync = async (bookId) => {
  const res = await fetch(`${api}/books/${bookId}`, { headers });
  const data = await res.json();
  return data.book;
};

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const updateAsync = async (book, shelf) => {
  const res = await fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  });

  return await res.json();
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
    .then((res) => res.json())
    .then((data) => data.books);

export const searchAsync = async () => {
  const res = await fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, maxResults }),
  });

  const data = await res.json();
  return data.books;
};
