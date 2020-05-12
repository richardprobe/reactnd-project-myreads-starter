import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookCategory from './BookCategory.js';

class SearchPage extends Component {
  state = {
    value: ''
  }

  handleOnChange = (event) => {
    event.preventDefault();
    this.setState({
      value: event.target.value
    });
    this.props.handleRemoveAllSearchResult();
    this.props.handleSearch(this.state.value);
  }

  getResults() {
    // TODO: implement retrieval
    // return this.props.books.
  }

  // how to update to clear state once returned?
  componentDidMount() {
    const pastResults = this.props.books.map( (book) => (book.bookContent.title) );
    pastResults.forEach(element => {
      this.props.handleChangeCategory(element, '');
    });
  }

  handleOnClick = (event) => {
    this.props.handleRemoveAllSearchResult();
  }

  render() {
      return (  
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'>
              <button className="close-search" onClick={this.handleOnClick}>Close</button>
            </Link>
            
            <div className="search-books-input-wrapper">
              <input type="text" value={this.state.value} placeholder="Search by title or author" onChange={this.handleOnChange}/>
            </div>
          </div>

          <div className="search-books-results">
            <BookCategory categoryName='Results' books={this.props.books} handleChangeCategory={this.props.handleChangeCategory}/> 

            <ol className="books-grid"></ol>
          </div>
        </div>
      );
  }
}

export default SearchPage;