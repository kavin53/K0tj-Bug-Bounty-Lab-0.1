const express = require('express');
const router = express.Router();
const db = require('../db');

router.post("/login-vuln",(req, res) =>{
    const{ username, password} = req.body;

    const query = `select * from users where username ='${username}' and password = '${password}'`;

    console.log("Vuln SQL => ", query);

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

module.exports = router;