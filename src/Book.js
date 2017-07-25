import React  from 'react'
import PropTypes from 'prop-types'


function Book(props){
       
 Book.PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      book : PropTypes.array.isRequired,
      getBookShelf : PropTypes.func.isRequired
     
  }
 
    const {book, getBookShelf} =  props   
   
    return (
        
     
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={book.imageLinks && { width: 128, height: 193,  backgroundImage: "url(" + book.imageLinks.thumbnail + ")" ,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}></div>
            <div className="book-shelf-changer">                   
                          
                <select defaultValue={ getBookShelf(book.id) } className="browser-default" onChange={(event) => props.handleChange(event.target.value, book)} >
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
    
    )    
   
      
  }


 
    
    
export default Book