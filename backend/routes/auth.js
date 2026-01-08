const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, rows) => {
        if (err) return res.status(500).json({ message: "Server error" });

        if (rows.length === 0) {
            return res.json({ success: false });
        }

        const session = Math.random().toString(36);
        db.query("UPDATE users SET session_token=? WHERE id=?",
            [session, rows[0].id]);

        res.cookie("session", session);
        res.json({ success: true });
    });
});

module.exports = router;
