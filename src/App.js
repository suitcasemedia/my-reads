import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './ListBooks'
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
      // alert(book)
    if(event.target.value === 'currentlyReading'){
      let shelf = "currentlyReading"
       BooksAPI.update(book,shelf).then( 
      this.moveToCurrentlyReading(book)
       )
    }
    else if(event.target.value === 'read'){
       let shelf = "read"
       BooksAPI.update(book,shelf).then( 
      this.moveToRead(book)
       )
    }
    else if(event.target.value === 'wantToRead'){
       let shelf = "wantToRead"
       BooksAPI.update(book,shelf).then( 
        this.moveToWantToRead(book)
       )
    }
     else if(event.target.value === 'none'){
       let shelf = "none"
       BooksAPI.update(book,shelf).then( 
        this.moveToNone(book)
       )
    }
  }

  moveToCurrentlyReading = (book) => {
     
    this.setState((state) =>{
      book.shelf = "currentlyReading"
    })
   
  }
  moveToRead = (book) => {
    this.setState((state) =>{
        book.shelf = "read"
      
    })

  }
  moveToWantToRead = (book) => {
    this.setState((state) =>{
        book.shelf = "wantToRead"
      
    })
  }
  moveToWantToRead = (book) => {
    this.setState((state) =>{
        book.shelf = "none"
      
    })
  }

  render() {
    const {searchQuery, searchBooks, newSearchQuery} = this.state;
    return (
    <BrowserRouter>
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
              moveToCurrentlyReading={this.moveToCurrentlyReading} 
              moveToRead={this.moveToRead}
              moveToWantToRead={this.moveToWantToRead}
              books={this.state.books} 
              listFormattedName='Currently Reading' 
              listName='currentlyReading'

             />
           )

           }
          
          />      
      </div>
    </BrowserRouter>
    )
  }
}

export default BooksApp
