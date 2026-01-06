const express = require('express');
const router = express.Router();
const db =require('../db');

router.get('/',(req,res) =>{
    db.query("select * from labs", (err, results) =>{
        res.json(results);
    });
});

module.exports = router;