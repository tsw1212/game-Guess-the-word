console.log('hello');
document.querySelector('#list').addEventListener('click', myList);
document.querySelector('#creatList').addEventListener('click', clickSignUp);
document.querySelector('#enteranceList').addEventListener('click', clickLogIn);
document.querySelector('#disConectList').addEventListener('click', disConect);
document.querySelector('#logIn').addEventListener('click', clickLogIn);
document.querySelector('#signUp').addEventListener('click',  clickSignUp);
document.querySelector('#creatLogIn').addEventListener('click', enterLogIn);
document.querySelector('#creatSignUp').addEventListener('click', enterSignUp);
let thisuser =JSON.parse(localStorage.getItem("thisUser"));
if(thisuser===null){
    disConect();
}
let form=document.querySelector("#form");
let heloUser = document.querySelector('#heloUser');
heloUser.textContent = `שלום ${thisuser.name}`
//Show the Log In form's when you click to log-in.
function clickLogIn() {
    form.style.display="block"
    noList();
    let logIn = document.querySelector('#divLogIn');
    logIn.style.display = "flex";
    let signUp = document.querySelector('#divSignUp');
    signUp.style.display = "none";
    let btnLog = document.querySelector('#logIn');
    btnLog.style.backgroundColor = "#fff";
    let btnSign = document.querySelector('#signUp');
    btnSign.style.backgroundColor = " #8CA6DB";
}
//Show the Sign up's form when you click to sign-up.
function clickSignUp() {
    form.style.display="block"
    noList();
    let logIn1 = document.querySelector('#divLogIn');
    logIn1.style.display = "none";
    let signUp1 = document.querySelector('#divSignUp');
    signUp1.style.display = "flex";
    let btnLog = document.querySelector('#logIn');
    btnLog.style.backgroundColor = "#8CA6DB";
    let btnSign = document.querySelector('#signUp');
    btnSign.style.backgroundColor = " #fff";

}
// and put him to be this user הזנת נתונים ללוקל סטורג
function enterSignUp() {
    let person = {
        name: document.querySelector("#newName").value,
        mail: document.querySelector("#newEmail").value,
        password: document.querySelector("#newPassword").value,
        highScore: 0,
    };
    let p = JSON.parse(localStorage.getItem(person.password));
    if (p == null) {
        if ((person.name != "") && (person.password != "") && (person.mail != "")) {
            localStorage.setItem(person.password, JSON.stringify(person));
            localStorage.setItem("thisUser", JSON.stringify(person));
            let stopForm = document.querySelector('#form');
            stopForm.style.display="none";
            let heloUser = document.querySelector('#heloUser');
            heloUser.textContent = `שלום ${person.name}`
        }
    }
    else {
        document.querySelector("#newPassword").setCustomValidity("בחר סיסמא אחרת");
    }
}
//Cheking if user exist in the local storage and put him to be this user
function enterLogIn() {
    let name = document.querySelector("#name").value;
    let password = document.querySelector("#password").value;
    let p = JSON.parse(localStorage.getItem(password));
    if (p == null) {
        document.querySelector("#password").setCustomValidity("סיסמא שגויה. נסה שנית");
    }
    else {
        if (name !== p.name) {
            document.querySelector("#name").setCustomValidity("שם המשתמש לא תואם לסיסמתך");
        }
        else {
            if ((name != "") && (password != "")) {
                localStorage.setItem("thisUser", JSON.stringify(p));
                let stopForm = document.querySelector('#form');
                stopForm.style.display="none";
                let heloUser = document.querySelector('#heloUser');
                heloUser.textContent = `שלום ${p.name}`;
            }
        }
    }
}
//This current user will be user
function disConect() {
    noList();
    let guest = {
        name: "user",
        mail: "",
        password: "",
        points: 0,
        highScore: 0,
    }
    localStorage.setItem("thisUser", JSON.stringify(guest));
    let heloUser = document.querySelector('#heloUser');
heloUser.textContent = `שלום ${guest.name}`

}
//When you click,discover the list
function noList(){
    let stopList = document.querySelector('ul');
    stopList.style.display="none";
}
//When you click,cover the list
function myList(){
    let showList = document.querySelector('ul');
    showList.style.display="block";
}
