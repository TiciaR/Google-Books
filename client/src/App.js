import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";
import { SavedBookList, SavedBookListItem } from "./components/SavedBookList";
import { Container, Row, Col } from "./components/Grid";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

var socket = io();

class App extends Component {
  state = {
    books: [],
    bookSearch: "",
    savedBooks: []
  };

  componentDidMount() {
    API.getSavedBooks() // get existing saved books when page loads
      .then(res => {
        this.setState({ savedBooks: res.data });
      })
      .catch(err => console.log(err));

    socket.on('book-saved', data => {
      API.getSavedBooks()
        .then(res => {
          this.setState({ savedBooks: res.data });
          alert('A book has been saved: ' + data.book);
        })
        .catch(err => console.log(err));
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchBooks(this.state.bookSearch)
      .then(res => {
        this.setState({
          books: res.data
        });
      })
      .catch(err => console.log(err));
  };

  handleSaveBook = (bookData) => {
    API.saveBook(bookData)
      .then(res => {

        if (res.data === "Already Saved") {
          toast.warning("Book '" + bookData.title + "' is already saved!");
        } else {

          API.getSavedBooks().then(res => {  // when user saves a new book, get all the saved books and update the state
            this.setState({ savedBooks: res.data });

            socket.emit('book-saved', bookData.title); // send a notification to server

            toast.success("Book '" + bookData.title + "' is saved successfully!");

          }).catch(err => console.log(err));

        }
      })
      .catch(err => console.log(err));
  };

  handleDeleteBook = (bookID) => {
    API.deleteBook(bookID)
      .then(res => {

        API.getSavedBooks().then(res => {  // when user deletes a saved book, get all the saved books and update the state
          this.setState({ savedBooks: res.data });
        })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Jumbotron />

          <Switch>
            {/* route for search page */}
            <Route exact path="/">
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
              />
              <Container>
                <Row>
                  <Col size="md-12">
                    <form>
                      <Container>
                        <Row>
                          <Col size="xs-9 sm-10">
                            <Input
                              name="bookSearch"
                              value={this.state.bookSearch}
                              onChange={this.handleInputChange}
                              placeholder="Search For a Book"
                            />
                          </Col>
                          <Col size="xs-3 sm-2">
                            <Button
                              onClick={this.handleFormSubmit}
                              type="success"
                              className="input-lg"
                            >
                              Search
                      </Button>
                          </Col>
                        </Row>
                      </Container>
                    </form>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col size="xs-12">
                    <BookList>
                      <BookListItem books={this.state.books} handleSaveBook={this.handleSaveBook} />
                    </BookList>
                  </Col>
                </Row>
              </Container>
            </Route>

            {/* route for saved page */}
            <Route path="/saved">
              <Container>
                {this.state.savedBooks.length > 0 ?
                  <Row>
                    <Col size="xs-12">
                      <SavedBookList>
                        <SavedBookListItem books={this.state.savedBooks} handleDeleteBook={this.handleDeleteBook} />
                      </SavedBookList>
                    </Col>
                  </Row> :
                  <h2 style={{ textAlign: 'center' }}>No Saved Books!</h2>
                }
              </Container>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
