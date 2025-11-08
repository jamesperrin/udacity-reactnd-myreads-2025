import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import BooksAPI from './api/BooksAPI';
import SweetalertHelper from './lib/SweetalertHelper';
import './App.css';

function App() {
  const [readingList, setReadingList] = useState([]);

  /**
   * @description Book shelves object
   */
  const bookShelves = [
    { title: 'Currently Reading', category: 'currentlyReading' },
    { title: 'Want to Read', category: 'wantToRead' },
    { title: 'Read', category: 'read' },
  ];

  useEffect(() => {
    let isMounted = true;

    const getBooksList = async () => {
      /*
          Exmaple code using Promises

          BooksAPI.getAll()
            .then((books) => {
              if (!books) {
                throw new Error('No books returned.');
              }

              setReadingList(books.sort((a, b) => a.title.localeCompare(b.title)));
            })
            .catch((error) => {
              console.error(error);
            });
      */

      try {
        /*
          Exmaple code using Promises with await
          const books = await BooksAPI.getAll();
        */

        const books = await BooksAPI.getAllAsync();

        if (isMounted) {
          // Sort Books by the 'title' property alphabetically
          setReadingList(books.sort((a, b) => a.title.localeCompare(b.title)));
        }
      } catch (error) {
        if (isMounted) {
          setReadingList([]);
        }

        SweetalertHelper.showSwalError(error, `Failed to get books data.`);
        console.error(error);
      }
    };
    getBooksList();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * @description Updates book's shelf location
   * @param {object} Book - JSON Object
   * @param {string} shelf - Bookshelf location
   */
  const doMoveBook = async (book, shelf) => {
    try {
      await BooksAPI.updateAsync(book, shelf);

      // Updating local state avoiding repeated network calls.
      setReadingList((prev) => {
        const updatedBook = { ...book, shelf };

        // Check if book exists in current state.
        const exists = prev.find((b) => b.id === book.id);

        // If book exists, updates book state
        if (exists) {
          return prev.map((b) => (b.id === book.id ? updatedBook : b));
        }

        return [...prev, updatedBook];
      });
    } catch (error) {
      SweetalertHelper.showSwalError(error, 'Failed to move Book');
      console.error(error);
    }
  };

  return (
    <main className="app">
      <Routes>
        <Route
          path="/"
          exact
          element={<HomePage readingList={readingList} bookShelves={bookShelves} doMoveBook={doMoveBook} />}
        />
        <Route path="search" element={<SearchPage readingList={readingList} doMoveBook={doMoveBook} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
