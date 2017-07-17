import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
        
        searchBooks: [],
        searchQuery: '',
        newSearchQuery: '',
        books: []
        
    }

 
/*********************************************
 *  handle search results
 * ******************************************/
  updateSearchQuery = (query) => {
        this.setState({ searchQuery: query})       
  }

  updateNewSearchQuery = (newQuery) => { 
       this.setState({ newSearchQuery: newQuery})           
  }

  clearSearchQuery = () => {
      this.setState({searchQuery: ''})
  }

  componentWillUpdate(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
    })
    if (this.state.newSearchQuery !==  this.state.searchQuery){
      
        BooksAPI.search(this.state.searchQuery)  
        .then((searchBooks) =>{
            this.setSearchBooks(searchBooks)
        })
        this.updateSearchQuery(this.state.newSearchQuery )
        
    }       
  } 
  setSearchBooks(searchBooks){
  this.setState({searchBooks})
   
  }


  /*********************************************
 *  handle personal list
 * ******************************************/

 
 componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
    })
  }
  handleSearchChange = (event, book, shelf) =>{
    
    BooksAPI.update(book, shelf).then( 
    
      book =>{
      this.setState(state => ({
        books : state.books.concat([book])
      }))
    }
    
    )
    this.handleChange = (event, book)
  }

  handleChange = (event, book) =>{
    let shelf = event.target.value
     BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    
  }

  

  render() {
    const {searchQuery, searchBooks, newSearchQuery} = this.state;
    return (
    
    
      <div className="app">
        <Route 
          exact
          path="/add-a-book" 
          render={() => (
            <SearchBooks
             onSearchQuery={this.updateNewSearchQuery}     
             searchBooks={searchBooks}
             searchQuery={searchQuery}
             newSearchQuery={newSearchQuery}
             handleSearchChange={this.handleSearchChange}
            />

        )}    
             
         
          
        />

        <Route
           path="/" 
           exact 
          
           render={()=> (
             <BookCase
              handleChange={this.handleChange}
              books={this.state.books} 
              listFormattedName='Currently Reading' 
              listName='currentlyReading'

             />
           )

           }
          
          />      
      </div>
   
    )
  }
}

export default BooksApp
