const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../models/User');

// Route Post for register
router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        confirm_password
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // Check for the unique username
    User.findOne({
            username: username
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    ms: "Username is already token."
                });
            }
        })
        // Check for the Unique Email
    User.findOne({
            email: email
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    ms: "Email is already registred. Did you forget your password."
                });
            }
        })
        // the data is valid and new we can registred the user
    let newUser = new User({
        name,
        username,
        password,
        email
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Adell! User is now registred."
                });
            });
        });
    });
});


// Route Post for login
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found.",
                success: false
            });
        }
        // idf there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // Users password is correct and we need to send the json token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Hello ${token}`,
                        user: user,
                        msg: 'Hello ! You are now logged in.'
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
});

// Route get for profile
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});


module.exports = router;