const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login',(req, res) =>{
    const{ username, password} = req.body;

    const query = `select * from users where username ='${username}' and password = '${password}'`;

    db.query(query,(err,result) =>{
        if(result.length>0){
            res.json({ success: true});
        }else {
            res.json({success: false});
        }
    });
});

module.exports = router;