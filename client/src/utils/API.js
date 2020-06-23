import axios from "axios";


export default {
  searchBooks: function(query) {
    return axios.get("/api/search", { params: { q: query } });
  },

  getSavedBooks: function() {
    return axios.get("/api/books");
  },

  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },

  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  }
};







 
