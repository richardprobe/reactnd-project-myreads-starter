import React, { Component } from 'react';

// Require props from parent: title, authors, url, currentCategory, handleChangeCategory
class Book extends Component{
    handleOnChange = (event) => {
        event.preventDefault();
        // call back to parent to change the book's category
        this.props.handleChangeCategory(this.props.title, event.target.value);
    }

    render() {
        const title = this.props.title;
        const authors = this.props.authors;
        const url = this.props.url;
        const currentCategory = this.props.currentCategory;

        return (
            <li key={title+authors+url}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: url }}></div>
                        <div className="book-shelf-changer">
                            <select value={currentCategory} onChange={this.handleOnChange} >
                                <option value="move" disabled>Move to...</option>
                                <option value="Currently Reading">Currently Reading</option>
                                <option value="Want to Read">Want to Read</option>
                                <option value="Finished Reading">Finished Reading</option>
                                <option value="Uncategorized">Uncategorized</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        );
    
    }
}

export default Book;