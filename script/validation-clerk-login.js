"use strict"

// log in validation

// form
const form = document.querySelector(".form");
const errorBox = document.querySelector(".error-box");
const errText = document.querySelector("#err");

// Input
const username = document.querySelector("input[type=text]");
const password = document.querySelector("input[type=password]");
const checkBtn = document.querySelector("input[type=checkbox]");
const fields = [username, password];

// helper function
const throwError = message => {
    errorBox.style.display = "block"; // it is same with errorBox.hidden= true;
    errText.innerHTML = message;
}

const emptyFields = fields => {
    let isEmpty;
    fields.forEach(fields => {
        fields.value.length === 0 ? (isEmpty = true) : (isEmpty = false)
    })

    return isEmpty;
}

// onsubmit
form.addEventListener('submit', e => {
    e.preventDefault();

    // empty fields
    if (emptyFields(fields)) throwError("لطفا موارد خواسته شده را پر کنید")

    // finaly
    else {
        userSearcher();
    }
})

// search for see that user and password is valid or not

function userSearcher() {
    let phone_number = username.value;
    let pass = password.value;

    if (phone_number == "admin" && pass == "admin") {
        console.log('شما وارد شدید');
        errorBox.classList.add("success");
        throwError("وارد شدید");
        window.location.assign('./clerk-page.html');
        localStorage.setItem("user", 'loginccc');
    } else {
        throwError("نام کاربری یا رمز عبور اشتباه است")
    }
};