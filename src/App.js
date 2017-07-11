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
        newSearchQuery: ''
        
    }

 
// event loop for listing books

 
  
  updateSearchQuery = (query) => {
    
        this.setState({ searchQuery: query}) 
        
  }



  updateNewSearchQuery = (newQuery) => {
    if(newQuery){
       this.setState({ newSearchQuery: newQuery}) 

    }
        
  }

  clearSearchQuery = () => {
      this.setState({searchQuery: ''})
  }

  componentWillUpdate(){
   
    if (this.state.newSearchQuery !==  this.state.searchQuery){
      
        BooksAPI.search(this.state.searchQuery)  
        .then((searchBooks) =>{
            
        })
        this.updateSearchQuery(this.state.newSearchQuery )
        
    }       
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
            />

        )}    
             
         
          
        />

        <Route path="/" exact books={this.state.books} component={BookCase}/>      
      </div>
    </BrowserRouter>
    )
  }
}

export default BooksApp
