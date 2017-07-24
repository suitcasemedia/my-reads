import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'



class SearchBooks extends Component{
    static PropTypes ={       
       
        searchBooks: PropTypes.array.isRequired,
        getBookShelf : PropTypes.func.isRequired,
        newSearchQuery : PropTypes.string.isRequired,
        handleSearchChange : PropTypes.func.isRequired
    }

    render(){   
        const {searchBooks, newSearchQuery,  handleSearchChange} = this.props  
        return(      
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                    className="close-search"
                    to="/" >Close
                    </Link>
                    <div className="search-books-input-wrapper">
                    <input 
                        type="text"
                        placeholder="Search by title or author"
                        value={newSearchQuery}
                        onChange={(event) =>  {
                            event.preventDefault();
                            handleSearchChange(event.target.value);
                            }
                        }                 
                    />                  
                    </div>
                </div>
                <div className="search-books-results">
                
                <ol className="books-grid">
                    { searchBooks && typeof searchBooks.map === "function"  && searchBooks.map((book) => (
                    
                    
                        
                    <li key={book.id+book.title}>
                        <div className="book">
                        <div className="book-top">
                            <div className="book-cover" 
                                
                                
                                style={book && book.imageLinks && { width: 128, height: 193, backgroundImage:"url(" + book.imageLinks.thumbnail + ")" ,backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>


                            <div className="book-shelf-changer">                   
                            <select defaultValue={this.props.getBookShelf(book)} className="browser-default" onChange={(event) => this.props.handleSearchChange( event.target.value , book )} >
                            
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                    )
                    )  }
                            
                </ol>
                
                </div>
            </div>
        )
    }
}

export default SearchBooks