import './App.css';
import { useState, useEffect } from 'react';
import BooksAPI from './api/BooksAPI';
import HomePage from './pages/HomePage';
import { showSwalError } from './lib/SweetAlert';

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
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
      // Exmaple code using Promises
      // BooksAPI.getAll()
      //   .then((books) => {
      //     if (!books) {
      //       throw new Error('No books returned.');
      //     }

      //     setReadingList(books.sort((a, b) => a.title.localeCompare(b.title)));
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });

      try {
        // Exmaple code using Promises with await
        // const books = await BooksAPI.getAll();

        const books = await BooksAPI.getAllAsync();

        if (isMounted) {
          // Sort by the 'title' property alphabetically
          setReadingList(books.sort((a, b) => a.title.localeCompare(b.title)));
        }
      } catch (error) {
        if (isMounted) {
          setReadingList([]);
        }

        showSwalError(error, `Failed to get books data.`);
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
   * @param {Object} Book - JSON Object
   * @param {string} shelf - Bookshelf location
   */
  const doMoveBook = async (book, shelf) => {
    try {
      await BooksAPI.updateAsync(book, shelf);

      // Updating local state avoiding repeated network calls.
      setReadingList((prev) => {
        const updatedBook = { ...book, shelf };
        const exists = prev.find((b) => b.id === book.id);

        if (exists) {
          return prev.map((b) => (b.id === book.id ? updatedBook : b));
        }

        return [...prev, updatedBook];
      });
    } catch (error) {
      showSwalError(error, 'Failed to move Book');
      console.error(error);
    }
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title, author, or ISBN" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <>
          <HomePage
            readingList={readingList}
            showSearchPage={showSearchPage}
            setShowSearchpage={setShowSearchpage}
            doMoveBook={doMoveBook}
            bookShelves={bookShelves}
          />
        </>
      )}
    </div>
  );
}

export default App;
