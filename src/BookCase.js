import React ,{Component} from 'react'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'





class BookCase extends Component{
    static PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      currentlyReading : PropTypes.array.isRequired,
      read: PropTypes.array.isRequired,
      wantToRead : PropTypes.array.isRequired

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
              books={this.props.currentlyReading}
              listFormattedName='Currently Reading'
            />
            <BookShelf 
              handleChange={this.props.handleChange}  
              books={this.props.read}  
              listFormattedName='Read' 
            />
            <BookShelf  
              handleChange={this.props.handleChange} 
              books={this.props.wantToRead}   
              listFormattedName='Want to Read' 
            />
          
          </div>
        </div>              
      </div>                
    )
  }
}
 
    
    
export default BookCase