const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Use apiRoutes
app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


io.on('connection', (socket) => {
  socket.on('book-saved', bookTitle => {
    // send to all clients except sender client
    socket.broadcast.emit('book-saved', { book: bookTitle });
  });
});


server.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});



