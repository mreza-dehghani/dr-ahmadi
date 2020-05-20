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
        // errorBox.classList.add("success");
        userSearcher();
    }
})

// search for see that user and password is valid or not

function userSearcher() {
    const url = 'http://localhost:3000/users';
    let phone_number = username.value;
    let pass = password.value;
    let user = {
        phoneNumber: phone_number,
        password: pass
    }

    fetch(url)
        .then(response => response.json())
        .then(res => {
            res.forEach(item => {
                if (item.phoneNumber == user.phoneNumber && item.password == user.password) {
                    window.location.assign('../index.html');
                    // debugger
                } else {
                    throwErr ()
                }
            })
        })
        .catch(() => {
            throwError("شماره تلفن یا رمز عبور اشتباه است")
        })
};