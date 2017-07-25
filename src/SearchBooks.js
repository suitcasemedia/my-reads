import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {debounce} from 'lodash'
import Book from './Book'


class SearchBooks extends Component{
    static PropTypes ={       
       
        searchBooks: PropTypes.array.isRequired,
        getBookShelf : PropTypes.func.isRequired,
        newSearchQuery : PropTypes.string.isRequired,
        handleSearchChange : PropTypes.func.isRequired,
        handleChange : PropTypes.func.isRequired
    }

    render(){   
       
        const {searchBooks, newSearchQuery,  handleSearchChange, handleChange, getBookShelf} = this.props 
        const handleChangeDebounced = debounce(handleSearchChange, 200); 
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
                             handleChangeDebounced(event.target.value);
                            }
                        }                 
                    />                  
                    </div>
                </div>
                <div className="search-books-results">
                
                <ol className="books-grid">
                    { searchBooks && typeof searchBooks.map === "function"  && searchBooks.map(book => (
                    
                    
                        
                    <li key={book.id+book.title}>
                        <Book
                        getBookShelf={getBookShelf}
                        handleChange={handleChange}
                        book={book}
                        />
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