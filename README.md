# Google Books
Google Books is a React-based book search app. 

On Search page, the app will query books via the Google Books API and display books based on user searches. 

User has the option to "View" a book, bringing them to the book on Google Books, or "Save" a book, saving it to the Mongo database.

On Saved Books page, the app will display all saved books. 

User has the option to "View" the book, bringing them to the book on Google Books, or "Delete" a book, removing it from the Mongo database.


## Technologies Used 
The app is single page application created with [Create React App](https://github.com/facebook/create-react-app) and uses react-router-dom to navigate.

The back end uses Node.js along with below NPM packages:
 * axios
 * express
 * if-env
 * mongoose

The app also uses socket.io to create a notification to other users whenever a user saves a book.


## Deployed Link
https://sleepy-bastion-03890.herokuapp.com/


## Motivation
The purpose of this project was to practice React in a full stack application.


## Contributor
The app is developed by [SunnyTong2019](https://github.com/SunnyTong2019).


## License
[MIT](https://choosealicense.com/licenses/mit/)

