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
    
    alert('changing')
    BooksAPI.update(book, shelf).then( book => {
      this.setState(state => ({
        books : state.books.concat([book])
      }))
    })
  }

  handleChange = (event, book) =>{
    if(event.target.value === 'currentlyReading'){
      this.moveToCurrentlyReading(book)
    }
    else if(event.target.value === 'read'){
      this.moveToRead(book)
    }
    else if(event.target.value === 'wantToRead'){
        this.moveToWantToRead(book)
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
