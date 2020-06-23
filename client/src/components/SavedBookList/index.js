import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";



export function SavedBookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}


export function SavedBookListItem(props) {
  return (
    props.books.map((book) =>
      <li className="list-group-item" key={book._id}>
        <Container>
          <Row>
            <Col size="xs-4 sm-2">
              <Thumbnail src={book.image} />
            </Col>
            <Col size="xs-8 sm-9">
              <h3>{book.title}</h3>
              <p>
                Author(s): {book.authors.join(", ")}
              </p>
              <p>
                {book.description}
              </p>
              <a className="btn btn-success mr-3" target="_blank" href={book.infoLink} role="button">View Book</a>

              <button className="btn btn-success" onClick={() => props.handleDeleteBook(book._id)}>Delete Book</button>
            </Col>
          </Row>
        </Container>
      </li>
    )

  )
}
