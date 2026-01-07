const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

router.post('/request', (req, res) => {
    const{ email } = req.body;
    const token = crypto.randomBytes(16).toString('hex');
    const expires = Date.now() + 10*60*1000;
    
    console.log(token, expires);


    const sql = `
        update users set reset_token = ?, reset_expires = ? where email = ? `;

    db.query(sql, [token, expires, email], () => {
        res.json({
            reset_link: `http://localhost:3000/reset-password.html?token=${token}`
        });
    });
}); 

router.post('/reset', (req, res) => {
    const {token,password} = req.body;

    const sql = `select * from users where reset_token = ? and reset_expires >?`;

    db.query(sql, [token, Date.now()], (err, result) => {
        if(result.length === 0) {
            return res.status(400).json({message: "Invalid or expired token"});
        }

        const update = `update users set password = ? where reset_token = ?`;

        db.query(update, [password, token], () => {
            res.json({message: "Password has been reset successfully"});
        });
    });
});

module.exports = router;