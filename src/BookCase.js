import React  from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

function BookCase (props){


     BookCase.PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      currentlyReading : PropTypes.array.isRequired,
      read: PropTypes.array.isRequired,
      wantToRead : PropTypes.array.isRequired,
      getBookShelf: PropTypes.func.isRequired

  }  
    
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>        
        <div className="list-books-content">
          <div>

            <BookShelf
              getBookShelf={props.getBookShelf}
              handleChange={props.handleChange}
              books={props.currentlyReading}
              listFormattedName='Currently Reading'
            />
            <BookShelf 
             getBookShelf={props.getBookShelf}
              handleChange={props.handleChange}  
              books={props.read}  
              listFormattedName='Read' 
            />
            <BookShelf  
              getBookShelf={props.getBookShelf}
              handleChange={props.handleChange} 
              books={props.wantToRead}   
              listFormattedName='Want to Read' 
            />
          
          </div>
        </div>              
      </div>                
    )
  }

 
    
    
export default BookCase