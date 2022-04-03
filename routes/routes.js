const express = require("express");
const router = express.Router();
const User = require("../model/User")


router.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);

});

router.post("/user", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });
    await user.save();
    res.send(user);

});

router.get("/users/:id", async (req, res) => {
    try {
    const user = await User.findOne({_id: req.params.id});
    res.send(user);
} catch {
    res.status(404);
    res.send({ error: "user doesn't exist!" });
    }
});

router.patch("/users/:id", async (req, res) => {
    try {
    const user = await User.findOne({ _id: req.params.id });
    if (req.body.title) {
    user.title = req.body.title;
    }
    if (req.body.content) {
    user.content = req.body.content;
    }
    await user.save();
    res.send(user);
    } catch {
    res.status(404);
    res.send({ error: "user doesn't exist!" });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
    await User.deleteOne({ _id: req.params.id })
    res.status(204).send();
    } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" })
    }
});
module.exports = router;