const express = require('express');
const ejs = require('ejs');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const { initializingPassport, isAuthenticated } = require('./passportConfig');
const database = require('./database');
const studentCntroller = require('./controllers/studentController');
const User = require('./schema');
const Student = require('./student');
const PORT = 5000;

const app = express();
initializingPassport(passport);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//template enginer
app.set("view engine", "ejs");


//register and login routes
app.get('/', (req, res) => {
    res.render("index");
});


app.get('/register', (req, res) => {
    res.render("register");
});


app.post('/register', async (req, res) => {
    const username = req.body.username;

    const user = await User.findOne({ username: username });

    if (user) {
        return res.status(400).send("User already exists");
    }

    const newUser = await User.create(req.body);

    res.status(201).send(newUser);
});


app.get('/login', (req, res) => {
    res.render("login");
});


app.post('/login', passport.authenticate("local", { failureRedirect: "/register", successRedirect: "/" }), async (req, res) => {
    res.render("login");
});

//crud route
app.use('/profile',  studentCntroller);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})