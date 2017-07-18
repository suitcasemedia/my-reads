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
        console.log("this.state.searchQuery = " + this.state.searchQuery)
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
     // console.log(this.state.books.map (book)=> book.title )
    })
    
  }
  handleSearchChange = (event, book, shelf) =>{
    if (book.shelf !=shelf) {
      BooksAPI.update(book, shelf).then( 
      
        book =>{
        this.setState(state => ({
          books : state.books.concat([book])
        }))
      }
      
      )
      this.handleChange = (event, book)
    }
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
        <Route 
          exact
          path="/search" 
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
              wantToRead={wantToRead}
              currentlyReading={currentlyReading}
              read={read}
             />
           )}
          />      
      </div>
    )
  }
}

export default BooksApp
