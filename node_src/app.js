const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const queries = require('./queries');
const ObjectID = require('mongodb').ObjectID

let connect = require("./connection.js")
let config = require("./config.js")

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}

app.use(cors(corsOptions))

/* SESSION COOKIES */

const session = require('express-session')
const TWO_HOURS = 1000 * 60 * 60 * 2

const {
  NODE_ENV = 'development',

  SESS_SECRET = 'ssh!quiet,it\'asecret!',
  SESS_NAME = 'log',
  SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: false // true 'https' ou false 'http'
  }
}))


/* ----------------GET AND POST REQUEST----------------- */
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

/* ------TODO----- */
/* 
GET ALL
*/
app.get('/todo', async (req, res) => {
  let result = await queries.find('todo', {})
  res.json(result)
})

/* 
GET TODO BY ID 
*/
app.get('/todo/:id', async (req, res) => {

  console.log('params ',req.params)
  let id = req.params.id
  let result = await queries.findOne('todo', {"_id": ObjectID(id)})
  res.json(result)
})

/* 
POST TODO 
*/
app.post('/todo', async (req, res) => {
  let result = await queries.insertOne('todo', req.body);
  //DELETE element non necessaire dans la bdd
  let todo = req.body
  delete todo.step;
  //envoi
  res.send(result)
})

/* ------USER----- */
/* 
GET ALL
 */
app.get('/user', async (req, res) => {
  let result = await queries.find('user', {})
  res.json(result)
})

/* 
POST USER
*/
app.post('/user', async(req, res) => {
  let result = await queries.insertOne('user', req.body);

  //envoi
  res.send(result)
})

/* 
SIGNUP
*/
app.post('/register', async (req, res, next) => {
 
  try {
   
    let user = req.body
    console.log("user", user)
   
    let existingUser = await queries.findOne('user', {mail: user.email})
   
    if(existingUser !== null) {
      next("Ce compte existe déjà")
    } else {
      /* DELETE les elements non necessaires dans la base de données */
      delete user.repeatPassword;
      delete user.errors;
      delete user.redirectAfterRegister;

      let insert = await queries.insertOne('user', user)
     
      res.json(insert)
    }
   
  } catch(err) {
    next(err)
  }
})
 
/* 
LOGIN
*/
app.post('/login', async (req, res, next) => {
 
  try {
   
    let user = req.body
    console.log("user", user)
    console.log("session", req.session)
   
    let existingUser = await queries.findOne('user', {email: user.email})
   
    if(existingUser !== null && existingUser.password === user.password) {
      req.session.user = {email: existingUser.email, _id: existingUser._id}
      let userToReturn = {
        _id: existingUser._id,
        email: existingUser.email,
        prenom: existingUser.prenom,
        nom: existingUser.nom,
      }
      console.log('session2: ', req.session)
      /* Pour la redirection */
      var redir = { redirect: "/todoList" };
      res.json(redir);

      res.send(userToReturn); 
    } else {
      next("Invalid credentials")
    }
   
  } catch(err) {
    next(err)
  }
})

/* LOGOUT */
app.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

