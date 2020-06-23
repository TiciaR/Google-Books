import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";



export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}


export function BookListItem(props) {
  return (
    props.books.map((book) =>
      <li className="list-group-item" key={book.id}>
        <Container>
          <Row>
            <Col size="xs-4 sm-2">
              <Thumbnail src={book.volumeInfo.imageLinks.thumbnail} />
            </Col>
            <Col size="xs-8 sm-9">
              <h3>{book.volumeInfo.title}</h3>
              <p>
                Author(s):
              {
              book.volumeInfo.authors ? 
              " " + book.volumeInfo.authors.join(", "):
              " Unknown"
              }
              </p>
              <p>
                {book.volumeInfo.description}
              </p>
              <a className="btn btn-success mr-3" target="_blank" href={book.volumeInfo.infoLink} role="button">View Book</a>

              <button className="btn btn-success" onClick={() => props.handleSaveBook({
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors || "Unknown",
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks.thumbnail,
                infoLink: book.volumeInfo.infoLink
              })}>Save Book</button>
            </Col>
          </Row>
        </Container>
      </li>
    )

  )
}
