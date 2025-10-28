import PropTypes from 'prop-types';

const Book = ({ book, doMoveBook }) => {
  // Destructure book object
  const { id = 0, title = 'Untitled', bookShelf = 'none', authors = [], imageLinks = {} } = book || {};

  // Validation check for authors ensuring authorsList is always an array of author strings, or an empty array.
  const authorsList = Array.isArray(authors) ? authors : authors ? [authors] : [];

  // Destructure imageLinks object
  const { thumbnail = '' } = imageLinks || {};

  /**
   * @description Handles onChange evernt for select element invoking doMoveBook function.
   * @param {Event} Event - Browser Event
   */
  const handleChange = (evt) => {
    const shelf = evt.target.value;
    doMoveBook(book, shelf);
  };

  return (
    <div className="book" data-id={id}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`,
          }}></div>
        <div className="book-shelf-changer">
          <select onChange={handleChange} value={bookShelf} aria-label={`Change shelf for ${title}`}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authorsList.length > 0 && <div className="book-authors">{authorsList.join(', ')}</div>}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    bookShelf: PropTypes.string,
    authors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
  doMoveBook: PropTypes.func.isRequired,
};

export default Book;
