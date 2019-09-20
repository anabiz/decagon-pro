

$(document).ready(function(event){
    event.preventDefault;
    const DATABAS_URI = 'http://localhost:3000/admin';

     async () => {
    const login = document.querySelector('#login');
    const username=document.querySelector('#username');
    const password=document.querySelector('#password');
     const response= await fetch(DATABAS_URI);
     const admin = await response.json();
     console.log(admin);
     pass =admin[0].password;
     username1=admin[0].username;
     login.addEventListener('click',()=>{
         if(pass==password && username1==username){
             console.log(yyyyyy);
             return (window.location =  "landingpage.html");
         }
     })
    };

});