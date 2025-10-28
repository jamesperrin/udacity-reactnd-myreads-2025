import PropTypes from 'prop-types';
import Book from '../components/Book';

const Bookshelf = ({ bookShelfTitle, readingBooksList, doMoveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {readingBooksList.map((book) => (
            <li key={book.id}>
              <Book book={book} doMoveBook={doMoveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  bookShelfTitle: PropTypes.string.isRequired,
  readingBooksList: PropTypes.object.isRequired,
  doMoveBook: PropTypes.func.isRequired,
};

export default Bookshelf;
