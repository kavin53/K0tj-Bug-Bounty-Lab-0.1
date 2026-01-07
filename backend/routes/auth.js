const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post("/login-vuln",(req, res) =>{
    const{ username, password} = req.body;

    const query = `select * from users where username ='${username}' and password = '${password}'`;

    console.log("Vuln SQL => ", query);
    console.log("REQ BODY:", req.body);


   db.query(query, (err, rows) => {
        if (err) {
            return res.status(500).send("Invalid credentials");
        }

        if (rows.length > 0) {
            res.send("Welcome user");
        } else {
            res.send("Invalid credentials");
        }
    });
});

router.post("/login-secure", (req, res) => {
    const { username, password } = req.body;

    const sql =
      "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(sql, [username, password], (err, rows) => {
        if (err) {
            return res.status(500).send("Server error");
        }

        if (rows.length > 0) {
            res.send("Welcome user");
        } else {
            res.send("Invalid credentials");
        }
    });
});



router.post('/login-blind',(req, res) =>{
    const{ username } = req.body;

    const sql = `
        select if(
            substring(database(),1,1)='b',
            sleep(5),
            0
        )
    `;

    db.query(sql,(err) => {
        if(err) {
            return res.json({ message:"invalid request"});
        }

        res.json({message:"request processed"});
    });
});

router.post('/forget-password',(req,res) =>{
    const {email} = req.body;

    const token = crypto .randomBytes(20).toString('hex');
    const expires = Date.now() + 15*60*1000 ; 

    const sql = 
`UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?`;

    db.query(sql,[token, expires, email], (err) =>{
        res.json({message:"If that email address is in our database, we will send you an email to reset your password."});

        console.log(`Password reset link: http://example.com/reset-password?token=${token}`);
    });
});

router.post('/reset-password',(req,res) =>{
    const {token, newPassword} = req.body;

    const sql =
`SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?`;

    db.query(sql,[token, Date.now()], (err, result) =>{
        if(result.length === 0) {
            return res.status(400).json({message:"Invalid or expired token"});
        }

        const updateSql = `
        update users set password=? where reset_token=?`;

        db.query(updateSql,[newPassword, token], () =>{
            res.json({message:"Password has been reset successfully"});
        });
    });
});      
module.exports = router;