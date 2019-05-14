# ALL NPM MODULES WE USE

# REGULAR DEPENDENCIES

- express -> main framework for the backend
- express-validator -> data validation when we make a post request, if there's field it will raise an error
- mongoose -> layer that sits on top of database so we can interact with it
- bcryptjs -> password hashing so we don't store plain password in database
- config -> global variables
- gravatar -> profile avatars, if user signs up they can use an email that's associated with gravatar and it will show them profile image automatically
- jsonwebtoken -> JWT for validator
- request -> module that allows us to make http requests to another API ( for github repo listen on profiles )

# DEV DEPENDENCIES

- nodemon -> constantly watches server when we refreshes
- concurrently -> allows to run backend and react frontend at the same time
