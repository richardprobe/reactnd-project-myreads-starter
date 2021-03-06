import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage.js';
import MainPage from './MainPage';
import {Route} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemoveAllSearchResult = this.handleRemoveAllSearchResult.bind(this);
  }

  state = {
    books: [],
    searchBooks: [{'bookContent': {'authors': 'Richard Hsu', 'title': 'My Book', 'imageLinks': {'thumbnail' : ''}}, 'category': 'Currently Reading'}],
    categories: ['Currently Reading', 'Want to Read', 'Finished Reading', 'Results', 'Uncategorized'] // not sure if i need this...
  };

  handleChangeCategory(bookId, newCategory) {
    this.handleRemoveAllSearchResult();
    const [targetBookContent] = this.state.books.filter( (mappedBook) => (mappedBook.bookContent.id === bookId)).map( (mappedBook) => (mappedBook.bookContent));

    this.setState( (prevState) => ({
      books: [...this.state.books.filter( (mappedBook) => (mappedBook.bookContent.id !== bookId)), {'category' : newCategory, 'bookContent' : targetBookContent}]
    }));

    BooksAPI.update(bookId, newCategory)
  }

  handleRemoveAllSearchResult() {
    this.setState( (prevState) => ({
      books: [...prevState.books.filter( (mappedBook) => (mappedBook.category !== this.state.categories[3]))]
    }));
  }

  handleSearch(query) {
    this.handleRemoveAllSearchResult();
    BooksAPI.search(query)
    .then( (books) => (books===undefined || books.error==='empty queue') ? console.log(`no match for ${query}`) : books.map( (book) => ({'category' : this.state.categories[3], 'bookContent' : book}))  )
    .catch(e => {console.log(e)})
    .then( (mappedBooks) => {
      if (mappedBooks !== undefined) {
        this.setState( (prevState) => ({
          books: [...prevState.books, ...mappedBooks]
        }));
      }
    });
  }
  
  // once mounted, retrieve all books from server
  componentDidMount() {
      BooksAPI.getAll()
        .then( (books) => books.map( (book) => ({'category' : this.state.categories[4], 'bookContent' : book})))
        .then( (mappedBooks) => {
            this.setState( (prevState) => ({
              books: mappedBooks
            }));
            console.log(this.state.books);
        });
  }

  doNothing() {
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
          <MainPage books={this.state.books} handleChangeCategory={this.handleChangeCategory}/>
        )} /> 
        <Route exact path='/search' render={ () => (

          <SearchPage books={this.state.books === undefined? this.doNothing() : this.state.books.filter( (book) => (book.category === this.state.categories[3]))} handleSearch={this.handleSearch} handleRemoveAllSearchResult={this.handleRemoveAllSearchResult} handleChangeCategory={this.handleChangeCategory}/>
        )} />
      </div>
    )
  }
}

export default App;
