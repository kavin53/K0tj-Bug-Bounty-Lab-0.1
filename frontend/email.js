function changeEmail() {
  const email = document.getElementById("email").value;

  fetch("/api/auth/email-change", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(r => r.json())
  .then(d => {
    document.getElementById("msg").innerText = d.message;
  });
}
