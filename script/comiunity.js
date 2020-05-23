"use strict"

// const body = document.getElementsByTagName('body');

const fluid = document.createElement('div');
fluid.classList.add('container-fluid');
fluid.setAttribute('id', 'before-content');

const containerUi = document.createElement('div');
containerUi.classList.add('container');

const row = document.createElement('div');
row.classList.add('row', 'mt-5', 'p-3');
row.setAttribute('id', 'div');

const col = document.createElement('div');
col.classList.add('col-12', 'col-sm-9', 'col-md-8', 'col-lg-6', 'col-xl-5', 'mx-auto');
col.setAttribute('id', 'div-2');

const div_p = document.createElement('div');
const p = document.createElement('p');
p.innerHTML = 'سرویس انجمن پرسش و پاسخ جهت تعامل بیماران با یکدیگر و طرح سوالات مربوط به مشکل خود که توسط دیگر کاربران سایت پاسخ داده می شود، راه اندازی شده است. این سرویس ویژه بیماران تحت نظر پزشک نیست و برای سایر عموم قابل دسترس است. با ثبت نام در این سامانه امکان استفاده از آن برای شما فراهم می شود.';

const div_b = document.createElement('div');
const b = document.createElement('button');
b.classList.add('ripple');
b.setAttribute('id', 'enter');
b.innerHTML = "ادامه";

const div_loading = document.createElement('div');
div_loading.classList.add('container');
div_loading.setAttribute('id', 'loading');

const div_loading_animate = document.createElement('div');
div_loading_animate.setAttribute('id', 'loading-animate');

fluid.append(containerUi);
containerUi.append(row);
row.append(col);
col.append(div_p);
div_p.append(p);
col.append(div_b)
div_b.append(b);
fluid.append(div_loading);
div_loading.append(div_loading_animate);

document.body.prepend(fluid);

// before-content loaded
const body = document.getElementsByTagName('body');
let beforeContent = document.getElementById('before-content');
const content = document.getElementById('content');
const enterBtn = document.getElementById('enter');
const loadingDiv = document.getElementById('loading');
const loadingAnimate = document.getElementById('loading-animate');

enterBtn.addEventListener('click', () => {
    loadingDiv.style.display = 'block';
    loadingAnimate.classList.add('load-div');
    setTimeout(() => {
        loadingAnimate.classList.remove('load-div');
        loadingDiv.style.display = 'none';
        document.body.removeChild(beforeContent);
    }, 6000);
})

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
        // answers: []
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
    let user_message = {
        // name: name,
        // message: message,
        // time: time,
        // date: x,
        answers: inputValue
    };

    fetch(url)
        .then(response => response.json())
        .then(response => {
            response.forEach(i => {
                const id = i._id;
                if (_id == id) {
                    console.log('it is true');
                    let x = "http://localhost:3000/messages/" + _id;
                    fetch(x, {
                        method: 'PATCH',
                        body: JSON.stringify(user_message)
                    })
                }
            })
        })
        // .then(() => {
        //     fetch(url + '/' + _id, {
        //         method: 'PATCH',
        //         body: JSON.stringify(user_message)
        //     })
        // })

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