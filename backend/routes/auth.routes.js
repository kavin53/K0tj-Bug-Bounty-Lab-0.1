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

router.get('/me', (req,res) =>{
    const session = req.cookies.session;

    if(!session){
        return res.status(401).json({ message: "Not logged in" });
    }

    db.query(`select * from users where session_token=?`, [session], 
        (err, rows)=> {
            if(rows.length === 0){
                return res.status(401).json({ message: "Invalid session"});
            }

            res.json({
                email: rows[0].email,
                message: "Session still valid"
            });
        }
    );
});
 router.get('/profile',(req, res) => {
    const session = req.cookies?.session;

    if(!session){
      return res.status(401).json({message:"no session"});
    }

    const sql = `select id, email from users where session_token =?`;

    db.query(sql,[session],(err,result) => {
      if(err){
        return res.status(500).json({message:"server error"});
      }

      if(result.length ===0){
        return res.status(401).json({ message:"invalid session"});
    }

      res.json({
        message:"profile accessed",
        user: result[0]
      });
    });
  });

module.exports = router;
