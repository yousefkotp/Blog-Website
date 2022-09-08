# Blog Website


## Table of Content
* [Table of Content](#table-of-content)
  * [Tools](#tools)
  * [Dependencies](#dependencies)
  * [Database Schemas](#database-schemas)
  * [Deployment](#deployment)
  * [Author](#author

## Tools
1. CSS
2. Node Js
3. Express Js
4. EJS
5. Boostrap
6. Mongo DB
## Dependencies
1. body-parser (Vesion ^1.20.0)
2. ejs (Version ^3.1.8)
3. express (Version ^4.18.1)
4. lodash (Version  ^4.17.21)
5. mongoose (Version ^6.5.4)

## Database Schemas
### Post Schema
```JS
const postSchema  = new mongoose.Schema({
    title:String,
    text:String
});
```

## Deployment
- Open terminal inside the project directory and intsall the dependencies by typing the following:
> npm install
- In line 9 inside the file "server.js", you should replace the URL of the local database to your own database.
> mongoose.connect(databaseLink, {useNewUrlParser: true, useUnifiedTopology: true});
- You can use free online services to deploy your web application like [Heruko](https://heroku.com/)

## Author
[Yousef Kotp](https://github.com/yousefkotp/)
