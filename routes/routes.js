const express = require("express");
const router = express.Router();
const User = require("../model/User");

async function setID(){
    const users = await User.find();
    var id = 1;
    for(let i = 0; i < users.length ; i++){
       id++;
    }
    return id;
}


router.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);

});

router.post("/user", async (req, res) => {
    const user = new User({
        id: await setID(),
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
    const user = await User.findOne({ id: req.params.id });
    console.log(req.header("name"));
    user.name = req.header("name");

    user.email = req.header("email");
    
    await user.save();
    res.send(user);
    } catch (error){
        console.log(error);
    res.status(404);
    res.send({ error: "user doesn't exist!" });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
    await User.deleteOne({ id: req.params.id })
    res.status(204).send();
    } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" })
    }
});
module.exports = router;