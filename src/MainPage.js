import React, {Component} from 'react';
import BookCategory from './BookCategory.js';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

// stateless function
function MainPageHeader(props) {
    return (
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
    );
}


// Requires props: categories, books, handleChangeCategory
class MainPage extends Component {

    getCategorizedBooks(categoryName) {
        //this.getCategorizedBooks('Currenting reading')
        return this.props.books.filter( (book) => (book.category === categoryName) );
    }

    render() {
        return (
            <div className="list-books">
                <MainPageHeader />
                
                <div className="list-books-content">
                    <BookCategory categoryName='Currently Reading' books={this.getCategorizedBooks('Currently Reading')} handleChangeCategory={this.props.handleChangeCategory}/> 
                    <BookCategory categoryName='Want to Read' books={this.getCategorizedBooks('Want to Read')} handleChangeCategory={this.props.handleChangeCategory}/> 
                    <BookCategory categoryName='Finished Reading' books={this.getCategorizedBooks('Finished Reading')} handleChangeCategory={this.props.handleChangeCategory}/>
                    <BookCategory categoryName='Uncategorized' books={this.getCategorizedBooks('Uncategorized')} handleChangeCategory={this.props.handleChangeCategory}/>
                </div>
                
                <div className="open-search">
                    <Link to='/search'>
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default MainPage;