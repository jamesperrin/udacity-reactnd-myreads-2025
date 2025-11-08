import Bookshelf from '../components/Bookshelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomePage = ({ readingList, bookShelves, doMoveBook }) => {
  /**
   * @description Filters list of books based on shelf
   * @param {string} bookShelf - book shelf
   * @returns {Array} Filtered array of books by shelf category
   */
  const readingBooksList = (bookShelf) => readingList.filter((book) => book.shelf === bookShelf);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {readingList.length > 0 && (
        <div className="list-books-content" aria-live="polite">
          {bookShelves.map((bookShelf) => (
            <Bookshelf
              key={bookShelf.category}
              title={bookShelf.title}
              readingBooksList={readingBooksList(bookShelf.category)}
              doMoveBook={doMoveBook}
            />
          ))}
        </div>
      )}
      <div className="open-search">
        <Link to="/search" relative="path">
          Add a book
        </Link>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  readingList: PropTypes.object.isRequired,
  bookShelves: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  doMoveBook: PropTypes.func.isRequired,
};

export default HomePage;
