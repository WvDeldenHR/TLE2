//BACKEND login + register

//Download de volgende, via 'npm install ...' express, mysql, cors, bycrypt, cookieparser, bodyparser, express-session
const express = require ('express')
const mysql = require ('mysql')
const cors = require("cors")
const bcrypt = require('bcrypt')
    const saltRounds = 10
const coockieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session') 

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:1234"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}))
app.use(coockieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000,
    }
}))

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "password",
    database: "Charium",
    port: 3306
})

app.post('/register', (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err)
        }

        db.query(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)", 
            [name, email, hash], 
            (err, result) => {
                console.log(err)
            })
    })
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.post('/login', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    db.query(
    "SELECT * FROM users WHERE email = ?", 
    email, 
    (err, result) => {

        if (err) {
            res.send({err: err})
        } 
            
        if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result
                        console.log(req.session.user)
                        res.send(result)
                    } else {
                        res.send({message: "Combinatie van uw Email en Wachtwoord klopt niet."})
                    }
                })
            } else {
                res.send({message: "Oeps, iets ging verkeerd."})
            }
        }
    )

})

// Logout endpoint
app.get('/logout', (req, res) => {
    // Destroy the user's session data
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error logging out');
      }
      // Redirect the user to the login page
      res.redirect('/login');
    });
  });

app.put('/update-user', (req, res) => {
    const { name, email, password } = req.body;
    const { newUsername } = req.body; // Nieuwe gebruikersnaam vanuit het formulier
    let hashedPassword;
  
    if (password) {
      hashedPassword = bcrypt.hashSync(password, saltRounds);
    } else {
      hashedPassword = null;
    }
  
    const userId = req.session.user[0].id;
  
    let queryParams = [];
    let query = 'UPDATE users SET ';
  
    if (name) {
      queryParams.push(name);
      query += 'name=?, ';
    }
  
    if (email) {
      queryParams.push(email);
      query += 'email=?, ';
    }
  
    if (password) {
      queryParams.push(hashedPassword);
      query += 'password=?, ';
    }
  
    if (!name && !email && !password) {
      res.status(400).send('No fields to update');
      return;
    }
  
    query = query.slice(0, -2); // remove the trailing comma and space
    query += 'WHERE id=?';
    queryParams.push(userId);
  
    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.log(err);
        res.send({message: "Error, probeer het later opnieuw."})
      } else {
        res.send({succes: "Uw gegevens zijn bewerkt."})
      }
    });
  });
  

app.listen(3001, () => {
    console.log("running server")
})