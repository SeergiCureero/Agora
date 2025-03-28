const express = require('express');
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

//Convert data into JSON format
app.use(express.json());

app.use(express.urlencoded({extended:false}));

//use ejs as the view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("login");
});

app.get("/signup", (req, res) =>{
    res.render("signup");
});

//USER SIGN UP
app.post("/signup", async (req, res) =>{

    const data = {
        userID: req.body.user_id,
        username: req.body.username,
        password: req.body.user_password,
        email: req.body.user_email
        //afegir més params de signup
    }

    //check if user already exists
    const existingUser = await collection.findOne({userID:data.userID});
    if (existingUser) {
        res.send("User already exists. Please choose a different username.")
    }
    else{
        //hash password
        const saltRounds = 10; //Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; //replace original pw with hashed one
        const userdata = await collection.insertMany(data);
        console.log(data);
        res.render("login");
    }
});


//USER LOG IN 
app.post("/login", async (req, res) => {
    try {
        const checkUser = await collection.findOne({userID:req.body.username});
        if (!checkUser) {
            res.send("User not found");
        }

        //compare hashed pw fromm db
        const isPWMatch = await bcrypt.compare(req.body.password, checkUser.password);
        if (isPWMatch) {
            res.render("home");
        }
        else{
            res.send("Wrong Password");
        }
    } catch {
        res.send("Wrong Details");
    }
});



const port = 5000;
app.listen(port, () =>{
    console.log(`Server running on port: ${port}`);
});