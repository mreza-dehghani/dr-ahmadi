"use strict"

// sign in validation

// Form
const form = document.querySelector(".form");
const errorBox = document.querySelector(".error-box");
const errText = document.querySelector("#err");

// Input
const username = document.querySelector("input[type=text]");
const password = document.querySelector("input[type=password]");
const checkBtn = document.querySelector("input[type=checkbox]");
const fields = [username, password];

// Helper functions
const throwError = message => {
    errorBox.style.display = "block";   // it is same with errorBox.hidden= true;
    errText.innerHTML = message;
};
const emptyFields = fields => {
    let isEmpty;
    fields.forEach(fields => {
        fields.value.length === 0 ? (isEmpty = true) : (isEmpty = false)
    });

    return isEmpty;
};
const uniqueUser = username => {
    if (!isNaN(username.value)) return true;
    else return false;
};
const validPassword = password => {
    if (password.value.length < 6) return false;
    else return true;
};

// submit
form.addEventListener("submit", e => {
    e.preventDefault();

    // check for empty fields
    if (emptyFields(fields)) throwError("لطفا موارد خواسته شده را پر کنید.");

    // check for unique username
    else if (!uniqueUser(username)) throwError("شماره موبایل را اشتباه وارد کرده اید.");

    // check for valid password
    else if (!validPassword(password)) throwError("رمز عبور نباید کمتر از 6 رقم باشد.");

    // check for checkbox
    else if (!checkBtn.checked) throwError("شما قوانین و مقررات را نپذیرفته اید.");

    // success submited
    else {
        errorBox.classList.add("success");
        signIn();
        throwError("با موفقیت ثبت شد.");
    };
});

// sign in function

function signIn() {
    let phone_number = username.value;
    let pass = password.value;
    // let signIn = true;

    const user = {
        phoneNumber: phone_number,
        password:pass
    }
    
    const urlBasic ='http://localhost:3000/users';
    
    fetch(urlBasic, {
        method: 'POST',
        body:JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    })
    .then(response => {
        if (response.ok) {
            console.log('user is sing in')
        } else {
            throwError (response.status)
        }
    })
    .then(() => {
        window.localStorage.setItem('login', 'login');
        window.location.assign('../index.html');
    })
}



