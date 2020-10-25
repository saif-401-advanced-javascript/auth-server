# auth-server

Creating an authentication API.

To start the sever you should have nodemon installed globally in you machine

```cmd
npm i -g nodemon
```

Used Libraries.

```cmd
npm i @types/jest
npm i base-64
npm i bcrypt
npm i dotenv
npm i express
npm i jsonwebtoken
npm i mongoose
npm i @code-fellows/supergoose
npm i eslint
npm i jest
```

## Phase 1

- can sign in as a user and the password will encrypted and saved into the database.
- adding an authentication middleware will check if the user exist in the data bse or not
- it its is there the middle ware will add a token to the request body.
- if it is not in the data base in the respond to 500.

![UML of Phase1](../assets/Ph1);
