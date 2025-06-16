# my-express-app

## Description

This project create for my express app with ExpressJS and JavaScript

## Prerequisite

- Node v20.x.x or later
- Use repository directory as terminal to run command and project

## Project setup

- Config env follow up .env.example
- Install NodeJS dependencies

```bash
$ npm install
```

## Compile and run the project

```bash
$ npm run start:dev
```

## Features

- ### Auth

  - Request [POST] /auth/register => Register user
  - Request [POST] /auth/login => Login to system
  - Request [POST] /auth/refresh => Refresh authentication tokens

- ### Users

  - Request [GET] /users/profile => Get authenticated user

## Author

- CodeOwner - Janjira Mosamai

## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE)
