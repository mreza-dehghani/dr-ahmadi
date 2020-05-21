"use strict"

// before-content loaded
// const body = document.getElementsByTagName('body');
// const beforeContent = document.getElementById('before-content');
// const content = document.getElementById('content');
// const enterBtn = document.getElementById('enter');
// const loadingDiv = document.getElementById('loading');
// const loadingAnimate = document.getElementById('loading-animate');
// loading.hidden = true;

// enterBtn.addEventListener('click', () => {
//     loadingDiv.style.display = 'block';
//     loadingAnimate.classList.add('load-div');
//     setTimeout(() => {
//         loadingAnimate.classList.remove('load-div');
//         loadingDiv.style.display = 'none';
//         document.body.removeChild(beforeContent);
//     }, 6000);
//     content.style.display = 'block';
// })

// 
// app js
// 
const form = document.querySelector('.form');
const _name = document.querySelector('input[name="name"]');
const _message = document.querySelector('textarea[name="message-text"]');
const submitBtn = document.querySelector('button[type="submit"]');
const container = document.getElementById('message-container');

const messageBox = document.getElementById('message-box');
const answersBox = document.querySelector('.answers');
const seeAnswersBtn = document.querySelector("#see-answers");

const url = "http://localhost:3000/messages";

fetch(url)
    .then(response => response.json())
    .then(response => {
        response.forEach(items => {
            let elem = messageBox.cloneNode(true);
            let txt = 'در تاریخ' + ':';
            messageBox.querySelector('.name').innerHTML = items.name;
            messageBox.querySelector('#time').innerHTML = txt + " " + items.date;
            messageBox.querySelector('.message-txt').innerHTML = items.message;
            container.appendChild(elem);

            // answers
            let id = items._id;
            let id2 = id + 12;
            let dataTarget = "#" + id2;
            messageBox.setAttribute('id', id);
            answersBox.setAttribute('id', id2);
            seeAnswersBtn.setAttribute('data-target', dataTarget);
        })
    })

const fields = [
    _name,
    _message
];

// helper function
const emptyFields = fields => {
    let isEmpty;
    fields.forEach(field => {
        field.value.length === 0 ? (isEmpty = true) : (isEmpty = false)
    })

    return isEmpty;
}

const throwErr = message => {
    alert(message);
};

// function to send form data to server
function sendMessage() {
    let name = _name.value;
    let message = _message.value;

    // variable for time
    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    if (min < 10) min = '0' + min;
    let time = `${hours}:${min}`;
    const date = new Date();

    let x = date.toLocaleString('fa-IR');

    let user_message = {
        name: name,
        message: message,
        time: time,
        date: x,
        answers: []
    };

    fetch(url, {
            method: 'POST',
            body: JSON.stringify(user_message),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(() => alert("ارسال شد"))
}

// onsubmit
form.addEventListener('submit', e => {
    e.preventDefault();

    // check for empty fields
    if (emptyFields(fields)) {
        _name.classList.add('invalid');
        _message.classList.add('invalid');
        // throwErr("لطفا موارد خواسته شده را پر کنید");
        setTimeout(() => {
            _message.classList.remove('invalid');
            _name.classList.remove('invalid');
        }, 3000)
    }

    // finaly
    else {
        if ('user' in localStorage) {
            sendMessage()
        } else {
            alert('ابتدا وارد سایت شوید');
            window.location.assign('../login.html');
        }
    }
})

// answer app
const answerForm = document.querySelectorAll('.form-answer');
const inputAnswer = document.querySelectorAll('input[name="input-answer"]');
let inputValue = inputAnswer.value;

// function to send answer to server
function sendAnswer() {
    let _id = messageBox.id;
    const url2 = 'http://localhost:3000/messages';
    let user_answers = {
        answers:inputValue
    }

    fetch(url)
    .then(response => response.json())
    .then(response => {
        response.forEach(i => {
            const id = i._id;
            if (_id == id) {
                console.log('is true')
            }
        })
    })
}

for (let i = 0; i < answerForm.length; i++) {
    answerForm[i].addEventListener('submit', (e) => {
        e.preventDefault();
        // if (inputAnswer.value === '') {
        //     inputAnswer[i].classList.add('invalid');
        //     setTimeout(() => {
        //         inputAnswer[i].classList.remove('invalid');
        //     }, 3000)
        // } else {
        //     if ('user' in localStorage) {
        //         sendAnswer();
        //     } else {
        //         alert('ابتدا وارد سایت شوید');
        //         window.location.assign('../login.html');
        //     }
        // } 
        sendAnswer();

    })
}



