import React from 'react'
//import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './ListBooks'
import SearchBooks from './SearchBooks'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'





class BooksApp extends React.Component {
 
  render() {
    return (
    <BrowserRouter>
      <div className="app">
        <Route path="/add-a-book" exact component={SearchBooks}/> 
        <Route path="/" exact component={BookCase}/>      
      </div>
    </BrowserRouter>
    )
  }
}

export default BooksApp
