function forgot() {
  const email = document.getElementById("email").value;

  fetch("/api/auth/forgot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(r => r.json())
  .then(d => {
    document.getElementById("msg").innerText = d.message;
  });
}

function resetPass() {
  const token = document.getElementById("token").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password })
  })
  .then(r => r.json())
  .then(d => {
    document.getElementById("msg").innerText = d.message;
  });
}
