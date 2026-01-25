function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(r => r.json())
  .then(d => {
    if (d.success) {
      location.href = "dashboard.html";
    } else {
      document.getElementById("msg").innerText = d.message;
    }
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
}
