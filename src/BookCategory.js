import React, {Component} from 'react';
import Book from './Book.js';

// Require props: CategoryName, Books (which match the category)
class BookCategory extends Component {
    render() {
        const categoryName = this.props.categoryName;
        const books = this.props.books;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{categoryName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { books.map( (book) => (
                            book.bookContent.imageLinks === undefined ? 
                            <Book key={book.bookContent.title+book.bookContent.authors+book.bookContent.id} 
                            id={book.bookContent.id}
                            title={book.bookContent.title} 
                            authors={book.bookContent.authors} 
                            currentCategory={categoryName} 
                            url=''
                            handleChangeCategory={this.props.handleChangeCategory}/>
                            :
                            <Book key={book.bookContent.title+book.bookContent.authors+book.bookContent.id} 
                                id={book.bookContent.id}
                                title={book.bookContent.title} 
                                authors={book.bookContent.authors} 
                                currentCategory={categoryName} 
                                url={`url(${book.bookContent.imageLinks.smallThumbnail})`} 
                                handleChangeCategory={this.props.handleChangeCategory}/>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookCategory;