import React ,{Component} from 'react'
import *  as BooksAPI  from './BooksAPI'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'





class BookShelf extends Component{
       
  static PropTypes = {
      
      handleChange : PropTypes.func.isRequired,
      moveToCurrentlyReading : PropTypes.func.isRequired,
      moveToRead : PropTypes.func.isRequired,
      moveToWantToRead : PropTypes.func.isRequired,
      books : PropTypes.array.isRequired,
      listFormattedName : PropTypes.string.isRequired,
      listName : PropTypes.string.isRequired

  }


  render(){    
    const listFormattedName = this.props.listFormattedName
    const books = this.props.books      
    return (<div className="bookshelf">
            <h2 className="bookshelf-title">{listFormattedName}</h2>   
    <ol className="books-grid">
          
    {books.filter ((book) =>  book.shelf === this.props.listName ).map(book => (
        
      <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}></div>
            <div className="book-shelf-changer">                   
              <select  className="browser-default" onClick={(event) => this.props.handleChange(event, book)} >
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
    ))}     
    </ol>
    <div className="open-search">
    <Link to="/add-a-book">Add a book</Link>
    </div>  
  </div>  
      
  )}
}

class BookCase extends Component{
  state = {books : []}

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
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

  render(){

    
    //const books = this.props.books;
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>        
        <div className="list-books-content">
          <div>

            <BookShelf handleChange={this.handleChange} moveToCurrentlyReading={this.moveToCurrentlyReading}   moveToRead={this.moveToRead} moveToWantToRead={this.moveToWantToRead}  books={this.state.books} listFormattedName='Currently Reading' listName='currentlyReading'/>
            <BookShelf handleChange={this.handleChange} moveToCurrentlyReading={this.moveToCurrentlyReading}   moveToRead={this.moveToRead} moveToWantToRead={this.moveToWantToRead}  books={this.state.books}  listFormattedName='Read' listName='read'/>
            <BookShelf  handleChange={this.handleChange} moveToCurrentlyReading={this.moveToCurrentlyReading}   moveToRead={this.moveToRead} moveToWantToRead={this.moveToWantToRead} books={this.state.books}   listFormattedName='Want to Read' listName='wantToRead'/>
          
          </div>
        </div>              
      </div>                
    )
  }
}
 
    
    
export default BookCase