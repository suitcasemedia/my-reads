import React ,{Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component{

    render(){
        const{id, style, authors, title, shelf, Book} = this.props


        return(
            <li key={id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={style}></div>
                            <div className="book-shelf-changer">                   
             
               
                                <select defaultValue={shelf} className="browser-default" onClick={(event) => this.props.handleChange(event, Book)} >
                                <option  value="currentlyReading"> Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option  value="read">Read</option>
                                <option value="none">None</option>
                                </select>
                            
               
            
                            </div>
                        </div>
                    <div className="book-title">{title}</div>
                <div className="book-authors">{authors}
                </div>
                </div>
            </li>



        )

    }
}
  
    