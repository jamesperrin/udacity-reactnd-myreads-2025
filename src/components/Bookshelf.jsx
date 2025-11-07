import Book from '../components/Book';
import PropTypes from 'prop-types';

const Bookshelf = ({ title, readingBooksList, doMoveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
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
  title: PropTypes.string.isRequired,
  readingBooksList: PropTypes.object.isRequired,
  doMoveBook: PropTypes.func.isRequired,
};

export default Bookshelf;
