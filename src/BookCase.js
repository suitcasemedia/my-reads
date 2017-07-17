import React ,{Component} from 'react'
import *  as BooksAPI  from './BooksAPI'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'





class BookCase extends Component{
    static PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      books : PropTypes.array.isRequired,
      listFormattedName : PropTypes.string.isRequired,
      listName : PropTypes.string.isRequired

  }


  render(){

    
    //const books = this.props.books;
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>        
        <div className="list-books-content">
          <div>

            <BookShelf 
              handleChange={this.props.handleChange}
              books={this.props.books}
              listFormattedName='Currently Reading'
              listName='currentlyReading'/>
            <BookShelf 
              handleChange={this.props.handleChange}  
              books={this.props.books}  
              listFormattedName='Read' 
              listName='read'/>
            <BookShelf  
              handleChange={this.props.handleChange} 
              books={this.props.books}   
              listFormattedName='Want to Read' 
              listName='wantToRead'/>
          
          </div>
        </div>              
      </div>                
    )
  }
}
 
    
    
export default BookCase