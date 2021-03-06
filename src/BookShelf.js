import React  from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'





function BookShelf (props){
       
 BookShelf.PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      books : PropTypes.array.isRequired,
      listFormattedName : PropTypes.string.isRequired
     // getBookShelf: PropTypes.func.isRequired
  }
 
    
    const {books, getBookShelf, listFormattedName ,handleChange}  = props  
      
    return (<div className="bookshelf">
            <h2 className="bookshelf-title">{listFormattedName}</h2>   
    <ol className="books-grid">
          
    {books.map(book => (
      <li key={book.id+book.title}>
        <Book
          getBookShelf={getBookShelf}
          handleChange={handleChange}
          book={book}
        />
      </li>
      
    ))}     
    </ol>
    <div className="open-search">
    <Link to="/search">Add a book</Link>
    </div>  
  </div>  
      
  )}


 
    
    
export default BookShelf