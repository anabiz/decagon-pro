const DATABASE_URI = 'http://localhost:3000/user';

$("#loginbutton").click(function(){
    event.preventDefault();
    const userEmail = $('#loginEmail');
    const userPwd=$('loginPwd').val();
    Console.log(userEmail, userPwd);

    
    if(userEmail!=="" && userPwd!==""){
        alert('hello');
        fetch('${userURL}').then(response=>response.json()).then(userData=> {
            const user =userData.find(user=>user.email==userEmail)
            if(!user) return $('#emailError').html("invalide email").addClass('test-danger');
            if(user.password != user) return $('#pwdError').html("invalid password").addClass('textpdanger');
            localStorage.set('user', json.stringify(user))
            window.location = "landingpage.html";
        })
    
    }   
    else{
        if(userEmail==""){
            $('#emailError').html("input email").addClass('text-danger');
        }
        if(userPwd==""){
            $('#pwdError').html("input password").addClass('text-danger');
        }
    }
})
    
