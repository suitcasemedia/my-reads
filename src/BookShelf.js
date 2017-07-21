import React  from 'react'

import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'





function BookShelf (props){
       
 BookShelf.PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      books : PropTypes.array.isRequired,
      listFormattedName : PropTypes.string.isRequired,
  }
 
    const listFormattedName = props.listFormattedName
    const books = props.books      
    return (<div className="bookshelf">
            <h2 className="bookshelf-title">{listFormattedName}</h2>   
    <ol className="books-grid">
          
    {books.map(book => (
        
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={book.imageLinks && { width: 128, height: 193,  backgroundImage: "url(" + book.imageLinks.thumbnail + ")" ,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}></div>
            <div className="book-shelf-changer">                   
             
               
                 <select defaultValue={book.shelf} className="browser-default" onChange={(event) => this.props.handleChange(event.target.value, book)} >
                  <option  value="currentlyReading"> Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option  value="read">Read</option>
                  <option value="none">None</option>
                  </select>
                
               
              
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    ))}     
    </ol>
    <div className="open-search">
    <Link to="/search">Add a book</Link>
    </div>  
  </div>  
      
  )}


 
    
    
export default BookShelf