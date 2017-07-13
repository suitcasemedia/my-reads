import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookCase from './ListBooks'
import BookShelf from './ListBooks'
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
           // console.log("number of books is: " + searchBooks.length)
           // console.log(searchBooks.map((searchBook) =>  (searchBook.title)))
            // console.log(searchBooks.map((searchBook) =>  (searchBook)))

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
             
              <ol className="books-grid">
                 { typeof searchBooks.map === "function"  && searchBooks.map((book) => (
                        <li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
                        <div className="book-shelf-changer">                   
                        <select  className="browser-default" onClick={(event) => this.props.handleSearchChange(event, book ,event.target.value)} >
                            <option value="none" disabled>Move to...</option>
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