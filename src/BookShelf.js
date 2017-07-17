import React ,{Component} from 'react'
import *  as BooksAPI  from './BooksAPI'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'





class BookShelf extends Component{
       
  static PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      books : PropTypes.array.isRequired,
      listFormattedName : PropTypes.string.isRequired,
      listName : PropTypes.string.isRequired

  }


  render(){  
    const listFormattedName = this.props.listFormattedName
    const books = this.props.books      
    return (<div className="bookshelf">
            <h2 className="bookshelf-title">{listFormattedName}</h2>   
    <ol className="books-grid">
          
    {books.filter ((book) =>  book.shelf === this.props.listName ).map(book => (
        
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
            <div className="book-shelf-changer">                   
             
               
                 <select defaultValue={book.shelf} className="browser-default" onClick={(event) => this.props.handleChange(event, book)} >
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
    <Link to="/add-a-book">Add a book</Link>
    </div>  
  </div>  
      
  )}
}

 
    
    
export default BookShelf