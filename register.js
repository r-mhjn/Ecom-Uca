const divLoginForm = document.getElementById('divLoginForm');
const userName = document.getElementById('userName');
const inputEmail = document.getElementById('inputEmail');
const contactNumber = document.getElementById('contactNumber');
const inputPassword1 = document.getElementById('inputPassword1');
const inputPassword2 = document.getElementById('inputPassword2');

let userId =1;

let users=[];


validateInput = () =>{


    //TODO: add a validation for email to ensure that email hasent been used before
    let flag=false;    
       for(let i=0; i<users.length; i++)
       {
           if(users[i].email==inputEmail.value)
           {
               flag=true;
              alert("A user with this email already exists ");
           }
       }
    
    if(flag==false)
    {
        if(inputPassword1.value!=inputPassword2.value)
        {
            alert("Passwords dont match");
        }
        else{
            addUser();
        }
    }
}


addUser = () =>{

    // fetchUserId();
    user={
        uid:userId,
        name: userName.value,
        email: inputEmail.value,
        contactNumber: contactNumber.value,
        password: inputPassword1.value,
    }
    userId++;
    console.log(user);
    users.push(user);
   console.log(users);
    storeUser();

}

getUsers= () =>{

    users = JSON.parse(localStorage.getItem('users'));
    users=users==null?[]:users;
    userId=JSON.parse(localStorage.getItem('userId'));
    userId=userId==null?1:userId;
}

fetchUserId = () =>{

    
}

storeUser = () =>{ 
    localStorage.setItem('users',JSON.stringify(users));
    localStorage.setItem('userId',userId);
}