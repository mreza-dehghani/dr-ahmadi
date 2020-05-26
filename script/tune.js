"use strict"

const loadingStorage = localStorage.getItem('loading2');

if (loadingStorage == 'undefined' || loadingStorage == null) {
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
    p.innerHTML = 'این سرویس برای رفاه حال بیماران تهیه شده است و استفاده از ان الزامی نیست. کسانی که بخواهند از سرویس نوبت گیری اینترنتی استفاده کنند همان مبلغ ویزیت طبق تعرفه را میپردازند. استفاده از این سرویس شامل پوشش بیمه ای نیست. بیمارانی که نمیخواهند از این سرویس استفاده کنند کماکان میتوانند مراجعه حضوری داشته باشند.';

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
        // localStorage.removeItem('loading');
        localStorage.setItem('loading2', 'is loading')

        setTimeout(() => {
            loadingAnimate.classList.remove('load-div');
            loadingDiv.style.display = 'none';
            document.body.removeChild(beforeContent);
        }, 500);
    })
}

const body = document.getElementsByTagName('body');
const enter_Btn = document.querySelector('button[name="enter"]');

const step1 = document.getElementById('step-one');
const step2 = document.getElementById('step-two');
const step3 = document.getElementById('step-three');


const divFluid = document.createElement('DIV');
divFluid.classList.add('container-fluid');
divFluid.setAttribute('id', 'content-loading');

const divLoadDiv = document.createElement('DIV');
divLoadDiv.setAttribute('id', 'x');

divFluid.append(divLoadDiv);

enter_Btn.addEventListener('click', event => {
    event.preventDefault();
    console.log('true');
    document.body.prepend(divFluid);
    divLoadDiv.classList.add('load-div');
    step1.hidden = true;
    step2.classList.add('d-block');

    setTimeout(() => {
        console.log('true');
        document.body.removeChild(divFluid);
        divLoadDiv.classList.remove('load-div');
    }, 500);
})

const formPrsonality = document.getElementById("personality-info");
const userFirstName = document.querySelector('input[name="firstname"]');
const userLastName = document.querySelector('input[name="lastname"]');
const userAge = document.querySelector('input[name="age"]');
const submitBtn = document.querySelector('button[name="enter2"]');

const fields = [
    userFirstName,
    userLastName,
    userAge
]

const emptyFields = fields => {
    let isEmpty;
    fields.forEach(field => {
        field.value.length === 0 ? (isEmpty = true) : (isEmpty = false)
    })

    return isEmpty;
}

submitBtn.addEventListener('click', event => {
    event.preventDefault();

    if(emptyFields(fields)) {
        fields.forEach(i => {
            i.classList.add('invalid');

            setTimeout(() => {
                i.classList.remove('invalid');
            }, 3000)
        })
    }

    else {
        console.log('true');
        document.body.prepend(divFluid);
        divLoadDiv.classList.add('load-div');
        step1.hidden = true;
        step2.classList.remove('d-block');
        step3.classList.add('d-block');
    
        setTimeout(() => {
            console.log('true');
            document.body.removeChild(divFluid);
            divLoadDiv.classList.remove('load-div');
        }, 500);
    }

})

// app js



const user = {
    firstname: userFirstName,
    lastname: userLastName,
    age: userAge,
    date: ''
}







const dateWrapper = document.querySelector('.wrapper');
const spanDay = document.getElementById('day');
const divDate = document.querySelector('.date');

const now = new Date();
let weekDay = now.toLocaleDateString('fa-IR', {
    weekday: 'long'
});
let monthDay = now.toLocaleDateString('fa-IR', {
    day: 'numeric'
});
let year = now.toLocaleDateString('fa-IR', {
    year: 'numeric'
});
let monthName = now.toLocaleDateString('fa-IR', {
    month: 'long'
});
let dateString = `${weekDay}، ${monthDay} ${monthName} ${year}`;

let i =1;

while(i < 5) {
    let id = Math.random();
    const wrapperContent = document.getElementById("wrapper-content");
    dateWrapper.setAttribute('id', id);
    let elem = dateWrapper.cloneNode(true);
    spanDay.innerHTML = weekDay;
    divDate.innerHTML = dateString;
    wrapperContent.append(elem)
    i ++
}



console.log(dateString)