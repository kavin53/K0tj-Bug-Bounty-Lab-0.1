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

 
}
