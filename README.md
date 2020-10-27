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
npm i cors
npm i morgan
```

## Phase 1

- can sign in as a user and the password will encrypted and saved into the database.
- adding an authentication middleware will check if the user exist in the data bse or not
- it its is there the middle ware will add a token to the request body.
- if it is not in the data base in the respond to 500.

![UML of Phase1](../assets/Ph1);

## Phase 2

Using Basic authentication Third Party web site such as Google,GitHub, or FaceBook

In this las we used GitHub Authentication, if the user was successfully registered with GitHub, we will generate a token for that user to make it authorized

A new Middleware created to handle the authentication, it will be invoked at the signin route, handle if the user is authorized or not

![UML of Phase2](../assets/Ph2);

## Phase 3

Using Bearer authentication to see if the user already have the token that was generated from the previous phase

A new Middleware created to handle the authentication, it will be invoked at the secret route, handle if the user is authorized or not.

![UML of Phase2](../assets/Ph3);
