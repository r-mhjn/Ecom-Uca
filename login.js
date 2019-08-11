const divLoginForm = document.getElementById("divLoginForm");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
let users = [];

validateCredentials = () => {
  getUsers();
  let email = inputEmail.value;
  let password = inputPassword.value;
  let flag = false;
  let userId;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      //  alert("valid email");
      if (users[i].password == password) {
        //  alert("valid password");
        flag = true;
        //  console.log(users[i]);
        userId = users[i].uid;
        break;
      }
    }
  }
  if (flag == true) {
    console.log(userId);
    sessionStorage.setItem("userId", userId);
  }
  if (flag == false) {
    alert("Invalid Credentials");
  }
};

getUsers = () => {
  users = JSON.parse(localStorage.getItem("users"));
  users = users == null ? [] : users;
};
