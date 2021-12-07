const express = require('express');
const router = express.Router();
const { Comment, Blog, User } = require('../../models');
const bcrypt = require("bcrypt");

//get all users
router.get("/", (req, res) => {
    User.findAll({
        include: [Blog, Comment],
    })
        .then((dbUsers) => {
            if (dbUsers.length) {
                res.json(dbUsers);
            } else {
                res.status(404).json({ message: "No users found!" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "an error occured", err: err });
        });
});

//create a user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    })
        .then((newUser) => {
            res.json(newUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "an error occured", err: err });
        });
});

//log in a user
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then((foundUser) => {
            if (!foundUser) {
                req.session.destroy();
                res.status(401).json({ message: "incorrect email or password" });
            } else {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.user = {
                        username: foundUser.username,
                        email: foundUser.email,
                        id: foundUser.id,
                    };
                    res.json(foundUser);
                } else {
                    req.session.destroy();
                    res.status(401).json({ message: "incorrect email or password" });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//log out a user
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("login")
});

//get one user
router.get("/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        include: [Blog, Comment],
    })
        .then((dbUser) => {
            console.log(req.params.id);
            if (dbUser) {
                res.json(dbUser);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Error", err: err });
        });
});

//delete a user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser)
    })
})

module.exports = router;