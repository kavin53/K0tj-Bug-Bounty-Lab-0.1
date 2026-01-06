function login(){
    fetch("http://localhost:3000/api/auth/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value     
    })
    })
    .then(res => res.json())
    .then(data =>{
        if(data.success){
            window.location = 'dashboard.html';
        }else{
            alert('login failed');
        }
    });
}

fetch("http://localhost:3000/api/labs")
.then(res => res.json())
.then(data =>{
    const list = document.getElementById('labs');
    if(!list) return;
    data.forEach(lab => {
        list.innerHTML += `<li>${lab.title} - ${lab.level}</li>`;
    });
});