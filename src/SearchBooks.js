import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import *  as BooksAPI  from './BooksAPI'

class SearchBooks extends Component{

 componentDidMount(){
     BooksAPI.search(this.state.query)
        .then((books) =>{
            this.setState({books})
        })
   //  if(this.state.query){
      //   this.updateBooks(this.state.query)
          
  //   }
 }


    state = {
        query: '',
        books: []
        
    }
    updateQuery = (query) => {
        this.setState({ query: query.trim()})
        //this.updateBooks();
       
    }
    thequery = this.state.query ;

    updateBooks = () => {
      this.componentDidMount()
    }
            
    

    
   


    clearQuery = () => {
        this.setState({query: ''})
    }

    render(){
        const {books, query} = this.state
        
        console.log("query is : " + query)
        console.log("number of books is: " + books.length)

    

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
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />
                 
                </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
              hello{books}
            </div>
        </div>
        )
    }
}

export default SearchBooks