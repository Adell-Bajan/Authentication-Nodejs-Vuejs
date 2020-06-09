const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport')

// Init app
const app = express();

// Midddleware
app.use(bodyParser.urlencoded({ extended: false }));

// json body middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));


// Use the passport middleware
app.use(passport.initialize());
// Bring in the passport Strategy
require('./config/passport')(passport);


// Connect to mongodb
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});


// app.get('/', (req, res) => {
//     return res.send("<h1>Hello Wolrd</h1>")
// })

// Bring in the Users route
const users = require('./routes/api/users');
app.use('/api/users', users);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})


const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})