import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import ErrorFourZeroFour from './ErrorFourZeroFour'
// mport {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import { Switch } from 'react-router'


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



   handleSearchChange = (newSearchEvent) =>{
    this.setState({ newSearchQuery: newSearchEvent}) 

    if (this.state.newSearchQuery !==  this.state.searchQuery){
     
        BooksAPI.search(this.state.newSearchQuery)  
         
        .then((searchBooks) =>{
            this.setSearchBooks(searchBooks)
        })
        this.updateSearchQuery(this.state.newSearchQuery )     
    }       
  
  } 

/*****************************************************************
 *  add the shelf that the book is on to your search results
 *****************************************************************/

  getBookShelf = (book) => {
  const existingBook = this.state.books.find(b => b.id === book.id)
  if (existingBook) return existingBook.shelf
  return book.shelf
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
     // console.log(this.state.books.map (book)=> book.title )
    })
    
  }
  

  handleChange = (event, book) =>{
   
     BooksAPI.update(book, event).then(() => {
        book.shelf = event

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    
  }
 
  

  render() {
    const {searchQuery, searchBooks, newSearchQuery, books} = this.state;
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const read = books.filter(book => book.shelf === 'read')
    return (
    
    
      <div className="app">
        <Switch>
        <Route 
          exact
          path="/search" 
          render={() => (
          <SearchBooks
             getBookShelf={this.getBookShelf} 
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
              wantToRead={wantToRead}
              currentlyReading={currentlyReading}
              read={read}
             />
           )}
          /> 
          <Route component={ErrorFourZeroFour}/>
        </Switch>     
      </div>
    )
  }
}

export default BooksApp
