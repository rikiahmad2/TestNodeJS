require("dotenv").config();
db = require("./database.js")
const express = require('express');
const { send } = require("express/lib/response");
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');


//jwt
const jwt = require('jsonwebtoken');
app.use(express.json());

app.post('/signin', (req, res) => {
    //Check In DB
    var user = req.body.username;
    var password = req.body.password;
    var sql = "select * from user where username = "+db.escape(user)+"";

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    try{
        db.query(sql, function(err, data) {
            if (err) throw err;
            const hashCheck = bcrypt.compareSync(password, data[0].password);
            res.status(200).send({
                message : "Authorized",
                email : data[0].email,
                token : accessToken,
                username : data[0].username,
            })
        });
    }
    catch{

        res.status(400).send({
            message : "Server Not Respond",
        })
    }
    
})

//SignUp
app.post('/signup', (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        var user = req.body.user;
        user.password = bcrypt.hashSync(user.encrypted_password, salt);
        delete user.encrypted_password;

        //TOKEN
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        var sql = "INSERT INTO user SET " + db.escape(user)
        db.query(sql, function(err, data) {
            if (err) throw err;
        });
        res.status(200).send({
            message : "Row has been inserted",
            token : accessToken,
            username : user.username,
        })
    }
    catch(err)
    {
        res.status(400).send({
            message : "Server Not Respond",
        })
    }
})

//GET ALL USER
app.get('/users', authenticateToken, (req, res) => {
    try{
        var sql = "select * from user"
        db.query(sql, function(err, data) {
            if (err) throw err;
            res.status(200).send({
                message : "Success",
                data : data,
            })
        });
    }
    catch(err)
    {
        res.status(400).send({
            message : "Server Not Respond",
        })
    }
})

//GET ALL SHOPPING
app.get('/shopping', authenticateToken, (req, res) => {
    try{
        var sql = "select * from shopping"
        db.query(sql, function(err, data) {
            if (err) throw err;
            res.status(200).send({
                message : "Success",
                data : data,
            })
        });
    }
    catch(err)
    {
        res.status(400).send({
            message : "Server Not Respond",
        })
    }
})

//CREATE SHOPPING
app.post('/createshopping', authenticateToken, (req, res) => {
    try{
        var shopping = req.body.shopping;

        var sql = "INSERT INTO shopping SET " + db.escape(shopping)
        db.query(sql, function(err, data) {
            shopping.id = data.insertId
            if (err) throw err;
            res.status(200).send({
                message : "Row has been inserted",
                data : shopping
            })
        });
    }
    catch(err)
    {
        console.log(err);
    }
})


//SHOPPING BY ID
app.get('/shopping/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    var sql = "select * from shopping where id = "+db.escape(id)+"";

    try{
        db.query(sql, function(err, data) {
            if (err) throw err;
            res.status(200).send({
                message : "Success",
                data : data,
            })
        });
    }
    catch{

        res.status(400).send({
            message : "Server Not Respond",
        })
    }
})

//Delete Shopping
app.delete('/shopping/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    var sql = "delete from shopping where id = "+db.escape(id)+"";
    

    try{
        db.query(sql, function(err, data) {
            if (err) throw err;
            res.status(200).send({
                message : "Success Deleted id "+id,
            })
        });
    }
    catch{

        res.status(400).send({
            message : "Server Not Respond",
        })
    }
})

//Update Shopping
app.put('/shopping/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    var shopping = req.body.shopping;
    var sql = "UPDATE shopping SET name = "+db.escape(shopping.name)+", createddate = "+db.escape(shopping.createddate)+" where id = "+db.escape(id)+"";
    

    try{
        db.query(sql, function(err, data) {
            if (err) throw err;
            data.id = data.insertId;
            res.status(200).send({
                message : "Success Updated Shopping",
                data : shopping,
            })
        });
    }
    catch{

        res.status(400).send({
            message : "Server Not Respond",
        })
    }
})





//MIDLEWARE
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.listen(
    PORT,
    () => console.log(`Server already serve on http://localhost:${PORT}`)    
)