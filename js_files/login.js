let username  = document.getElementById("username");
let userPassword = document.getElementById("userpassword");
let usernameError = document.getElementById("usernameError");
let userPasswordError = document.getElementById("userpasswordError");

let loginBtn = document.getElementById("form-btn");

loginBtn.addEventListener("click", function(event){
    event.preventDefault();
    checkInputs();
})

function checkInputs(){
    showError(username, usernameError);
    showError(userPassword, userPasswordError);
}
function showError(input, errors){
    if(input.value.trim() === ""){
        errors.style.display = "block";
        input.classList.add("error");
    }else{
        errors.style.display = "none";
        input.classList.remove("error");
    }
}

function showRegister(){
    document.querySelector(".container").style.display = "none";
    document.querySelector(".second-container").style.display = "block";
}

let email = document.getElementById("email");
let registerPassword = document.getElementById("registerPassword");
let emailError = document.getElementById("emailErrors");
let registerPasswordError = document.getElementById("registerPasswordError");

let registerBtn = document.querySelector("#register-btn");

registerBtn.addEventListener("click", function(event){
    event.preventDefault();
    checkInputs2();
})
 function checkInputs2(){
    showError(email, emailError);
    showError(registerPassword, registerPasswordError);
 }
