import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, doMoveBook }) => {
  const [bookshelf, setBookshelf] = useState('none');
  const [authorsNames, setAuthorsNames] = useState('');
  const bookId = crypto.randomUUID();

  // Destructure book object
  const { id = bookId, title = 'Untitled', shelf = 'none', authors = [], imageLinks = {} } = book || {};

  // Destructure imageLinks object
  // const { thumbnail = 'https://placehold.co/128x193?text=image+not+available' } = imageLinks || {};
  const {
    thumbnail = `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`,
  } = imageLinks || {};

  useEffect(() => {
    let isMounted = true;

    const getAuthorsNames = async () => {
      try {
        if (isMounted) {
          if (Array.isArray(authors) && authors.length > 0) {
            setAuthorsNames(authors.join(', '));
          }

          if (typeof authors === 'string') {
            setAuthorsNames(authors);
          }

          setBookshelf(shelf);
        }
      } catch (error) {
        if (isMounted) {
          setAuthorsNames('');
        }

        console.error(`Error: Failed to get books authors. Book title: `, book.title);
        console.error(error);
      }
    };

    getAuthorsNames();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * @description Handles onChange event for select element invoking doMoveBook function.
   * @param {Event} evt - Browser Event
   */
  const handleChange = (evt) => {
    const shelf = evt.target.value;
    setBookshelf(shelf);
    doMoveBook(book, shelf);
  };

  return (
    <div className="book" data-book-id={id}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`,
          }}></div>
        <div className="book-shelf-changer">
          <select onChange={handleChange} value={bookshelf} aria-label={`Change shelf for ${title}`}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authorsNames && <div className="book-authors">{authorsNames}</div>}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    shelf: PropTypes.string,
    authors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string)]),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
  doMoveBook: PropTypes.func.isRequired,
};

export default Book;
