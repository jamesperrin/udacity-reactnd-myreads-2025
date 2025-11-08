import { useState } from 'react';
import Book from '../components/Book';
import BooksAPI from '../api/BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SweetalertHelper from '../lib/SweetalertHelper';

const SearchPage = ({ readingList, doMoveBook }) => {
  const [query, setQuery] = useState('');
  const [bookSearchList, setBookSearchList] = useState([]);

  /**
   *
   * @description  Handles onChange event for input element, sets state, and invoke searchBooks function.
   * @param {Event} evt - Browser Event
   */
  const handleChange = (evt) => {
    const searchQuery = evt.target.value;
    setQuery(searchQuery);
    searchBooks(searchQuery);
  };

  /**
   *
   * @description Retrieves a filtered list of books from remote API based on title.
   * @param {string} rawQuery - Search query
   */
  const searchBooks = async (rawQuery) => {
    const searchQuery = (rawQuery || '').trim();

    if (!searchQuery || rawQuery.length < 1) {
      setBookSearchList([]);
      return;
    }

    try {
      const searchList = await BooksAPI.searchAsync(searchQuery);

      if (!Array.isArray(searchList) || searchList.length < 1) {
        setBookSearchList([]);
        return;
      }

      /*
        ORIGINAL CODE

        searchList.forEach((bookResult) => {
          readingList.forEach((readingBook) => {
            if (bookResult.id === readingBook.id) {
              bookResult.shelf = readingBook.shelf;
            }
          });
        });

        setBookSearchList(searchList);
     */

      // Creates a Map for lookups vs iterating over the entire readingList data collection
      const shelfById = new Map(readingList.map((b) => [b.id, b.shelf]));

      // Creates a new array with merged shelf info (immutably)
      // Arrow fuction creates new object using spread operator to update existing records
      const merged = searchList.map((book) => ({
        ...book,
        shelf: shelfById.get(book.id) ?? book.shelf ?? 'none',
      }));

      setBookSearchList(merged);
    } catch (error) {
      SweetalertHelper.showSwalError(error, `Failed to search for Books ${error.message}`);
      console.error(error);
      setBookSearchList([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title" value={query} onChange={handleChange} />
        </div>
      </div>
      <div className="search-books-results" aria-live="polite">
        {bookSearchList.length === 0 ? (
          <p className="search-books-results__no-data">No results to display.</p>
        ) : (
          <ol className="books-grid">
            {bookSearchList.map((book) => {
              return (
                <li key={book.id}>
                  <Book book={book} doMoveBook={doMoveBook} />
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  readingList: PropTypes.object.isRequired,
  doMoveBook: PropTypes.func.isRequired,
};

export default SearchPage;
