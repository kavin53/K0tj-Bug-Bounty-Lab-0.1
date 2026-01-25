const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');


router.post('/request', (req, res) => {
    const { email } = req.body;

    const token = crypto.randomBytes(16).toString('hex');
    const expires = Date.now() + 10 * 60 * 1000;

    db.query(
        "UPDATE users SET reset_token=?, reset_expires=? WHERE email=?",
        [token, expires, email],
        () => {
            res.json({
            });
        }
    );
});


router.post('/reset', (req, res) => {
    const { token, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE reset_token=? AND reset_expires>?",
        [token, Date.now()],
        (err, result) => {

            if (result.length === 0) {
                return res.json({ message: "Invalid token" });
            }

            
            db.query(
                "UPDATE users SET password=? WHERE id=?",
                [password, result[0].id]
            );

            res.json({ message: "Password reset success" });
        }
    );
});

module.exports = router;
