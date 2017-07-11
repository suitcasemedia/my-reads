import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
//import *  as BooksAPI  from './BooksAPI'

class SearchBooks extends Component{
    static PropTypes ={
        
        
        onSearchQuery : PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim()})
    }

    render(){
        const {searchBooks, onSearchQuery, searchQuery, newSearchQuery} = this.props
        const {query} = this.state
        
            
        console.log("query is : " + newSearchQuery)
        if(searchBooks){
            console.log("number of books is: " + searchBooks.length)
            console.log(searchBooks.map((searchBook) =>  (searchBook.title)))

        }
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
                        onSearchQuery(event.target.value);
                        }
                    }
                    
                />
                 
                </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
             
            </div>
        </div>
        )
    }
}

export default SearchBooks