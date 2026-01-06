const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login',(req, res) =>{
    const{ username, password} = req.body;

    const query = `select * from users where username ='${username}' and password = '${password}'`;

    db.query(query,(err,result) =>{

        if(err){
            console.error("SQL ERROR",err.message);

            return res.json({success: false, error:"SQL error"})
        }

        if(result.length>0){
            res.json({ success: true});
        }else {
            res.json({success: false});
        }
    });
});

module.exports = router;