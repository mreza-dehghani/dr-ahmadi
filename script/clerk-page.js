"use strict"

let page1 = document.createElement('div');
let page2 = document.createElement('div');
let page3 = document.createElement('div');

page1.innerHTML = `
    <div id="temp-1">
        <div>
            <table class="table text-center table-bordered" id="list-of-patients">

                <tr class="bg-secondary text-light">
                    <th>#</th>
                    <th>نام</th>
                    <th>نام خانوادگی</th>
                    <th>سن</th>
                    <th>تاریخ نوبت</th>
                    <th>ساعت رزرو</th>
                    <th>وضعیت پرداخت</th>
                    <th>حذف</th>
                </tr>

                <tr id="tr">
                <td></td>
                <td id="firstname"></td>
                <td id="lastname"></td>
                <td id="age"></td>
                <td id="date"></td>
                <td id="time"></td>
                <td id="price"></td>
                <td id="button"></td>
                </tr>

            </table>
        </div>
    </div>
`;

page2.innerHTML = `
    <div id="temp-2">
        <div>
            <table class="table text-center table-bordered" id="list-of-comments">

                <tr class="bg-secondary text-light">
                    <th>#</th>
                    <th>کاربر</th>
                    <th>پرسیده</th>
                    <th>در تاریخ</th>
                    <th>حذف</th>
                </tr>

                <tr id="tr2">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

            </table>
        </div>
    </div>
`;

page3.innerHTML = `
    <div class="row mt-5">
        <p id="txt"></>
        <div class="col-12 col-md-6 mx-auto mt-5 save-date">
            <form action="" id="form" class="text-center">
                <label for="day">از روز:</label>
                <select name="day" id="" class="form-control my-3">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                </select>
                <label for="month">ماه:</label>
                <select name="month" id="" class="form-control my-3">
                    <option value="فروردین">فروردین</option>
                    <option value="اردیبهشت">اردیبهشت</option>
                    <option value="خرداد">خرداد</option>
                    <option value="تیر">تیر</option>
                    <option value="مرداد">مرداد</option>
                    <option value="شهریور">شهریور</option>
                    <option value="مهر">مهر</option>
                    <option value="آبان">آبان</option>
                    <option value="آذر">آذر</option>
                    <option value="دی">دی</option>
                    <option value="بهمن">بهمن</option>
                    <option value="اسفند">اسفند</option>
                </select>
                <button onclick="fff()" class="btn btn-primary form-control mt-3">ثبت</button>
            </form>
        </div>
    </div>
`;

const main = document.getElementById('main-details');
main.append(page1);

const url1 = 'http://localhost:3000/tunes';
const tr1 = document.getElementById('tr');

tr1.innerHTML = `
<td></td>
<td id="firstname">محمدعلی</td>
<td id="lastname">محمدی</td>
<td id="age">32</td>
<td id="date">شنبه ۶ خرداد ۱۳۹۹ (سه شنبه)‏</td>
<td id="time">18 الی 20	</td>
<td id="price">پرداخت شد</td>
<td id="button"><button class="ripple" id="btn">تایید ویزیت</button></td>
`;
if (main.contains(page1)) {
    fetch(url1)
        .then(response => response.json())
        .then(res => {
            const table1 = document.getElementById('list-of-patients');
            console.log(res);

            res.forEach(element => {
                let clone = tr1.cloneNode(true);
                let fname, lname, age, date, time, price, button;
                let id = element._id;
                fname = document.getElementById('firstname');
                lname = document.getElementById('lastname');
                age = document.getElementById('age');
                date = document.getElementById('date');
                time = document.getElementById('time');
                price = document.getElementById('price');
                button = document.getElementById('button');

                fname.innerHTML = element.firstname;
                lname.innerHTML = element.lastname;
                age.innerHTML = element.age;
                date.innerHTML = element.date.day + ' ' + element.date.date;
                time.innerHTML = 18 + " " + "الی" + " " + 20;
                price.innerHTML = element.price;
                button.innerHTML = '<button class="ripple" id="btn">تایید ویزیت</button>';

                let btn = document.getElementById('btn');
                btn.setAttribute('id', id);
                btn.setAttribute("onclick", 'deleteTune()')

                // table1.rows[1].cells[1].innerHTML = element.firstname;
                // table1.rows[1].cells[2].innerHTML = element.lastname;
                // table1.rows[1].cells[3].innerHTML = element.age;
                // table1.rows[1].cells[4].innerHTML = element.date.day + ' ' + element.date.date;
                // table1.rows[1].cells[5].innerHTML = 18 + " " + "الی" + " " + 20;
                // table1.rows[1].cells[6].innerHTML = element.price;
                // table1.rows[1].cells[7].innerHTML = '<button class="ripple">حذف</button>';

                table1.append(clone);

                // let y = "پرداخت نشد"
                // if(price.innerText == y) {
                //     price.style.backgroundColor = "red";
                //     console.log('sss')
                // } 
            });
        })
}

function deleteTune() {
    const btn = event.target;
    let especialUser = btn.getAttribute('id');
    fetch(url1, {
        method: 'GET'
    }).then(response => response.json())
    .then(elem => {
        elem.forEach(item => {
            if (item._id == especialUser) {
                fetch(url1 + '/' + especialUser, {
                    method: 'DELETE'
                }).then(response => console.log(response.status))
            }
        })
    })
}

const ulMobile = document.querySelector('.navigation-sm');
const ulDesktop = document.querySelector('.navigation-lg');

class NavigationS {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    temp1() {
        if (main.contains(page2)) {
            main.removeChild(page2);
            main.append(page1);
        } else if (main.contains(page3)) {
            main.removeChild(page3);
            main.append(page1);
        }
    }

    temp2() {
        if (main.contains(page1)) {
            main.removeChild(page1);
            main.append(page2);
            secondFetch();
        } else if (main.contains(page3)) {
            main.removeChild(page3);
            main.append(page2);
            secondFetch();
        }
    }

    temp3() {
        if (main.contains(page1)) {
            main.removeChild(page1);
            main.append(page3);
        } else if (main.contains(page2)) {
            main.removeChild(page2);
            main.append(page3);
        }
    }

    onClick(event) {
        event.stopPropagation();
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

let obj = {
    // a: '',
    // b: '',
    // c: '',
    // d: '',
    // e: ''
}

class NavigationL {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    temp1(e) {
        if (main.contains(page2)) {
            main.removeChild(page2);
            main.append(page1);
        } else if (main.contains(page3)) {
            main.removeChild(page3);
            main.append(page1);
        }
    }

    temp2() {
        if (main.contains(page1)) {
            main.removeChild(page1);
            main.append(page2);
            secondFetch();
        } else if (main.contains(page3)) {
            main.removeChild(page3);
            main.append(page2);
            secondFetch();
        }
    }

    temp3() {
        if (main.contains(page1)) {
            main.removeChild(page1);
            main.append(page3);
        } else if (main.contains(page2)) {
            main.removeChild(page2);
            main.append(page3);


        }
    }

    onClick(event) {
        event.stopPropagation();
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

new NavigationS(ulMobile);
new NavigationL(ulDesktop);

function secondFetch() {
    const url2 = 'http://localhost:3000/messages';
    const tr2 = document.getElementById('tr2');
    tr2.innerHTML = `
        <td></td>
        <td id="firstname">محمدعلی</td>
        <td id="lastname">این متن آزمایشی است.</td>
        <td id="date"> ۱۳۹۹/۳/۴،‏ ۱۱:۵۳:۱۶</td>
        <td id="button"><button class="ripple">پاسخ</button></td>
        `;

    if (main.contains(page2)) {
        console.log('it is true');
        fetch(url2)
            .then(response => response.json())
            .then(response => {
                const table2 = document.getElementById('list-of-comments');
                console.log(response);

                response.forEach(element => {
                    let clone2 = tr2.cloneNode(true);
                    table2.append(clone2);
                    table2.rows[1].cells[1].innerHTML = element.name;
                    table2.rows[1].cells[2].innerHTML = element.message;
                    table2.rows[1].cells[3].innerHTML = element.date;
                    table2.rows[1].cells[4].innerHTML = '<button class="ripple">پاسخ</button>';
                })
            })
    }
}



// myFunction()

function myFunc() {
    if (main.contains(page3)) {
        let txtBox = document.getElementById('txt');

        function myFunction() {
            let url3 = "http://localhost:3000/dates";
            let form = document.getElementById('form');
            let day = document.querySelector('select[name="day"]').value;
            let month = document.querySelector('select[name="month"]').value;

            let obj = {
                a: day,
                b: month
            }

            form.addEventListener('submit', e => {
                e.preventDefault();
                obj.a = day;
                obj.b = month;
                fetch(url3, {
                    method: 'POST',
                    body: JSON.stringify(obj)
                })
            })
        }

        myFunction()
    }
}

// myFunc();
// setInterval(() => {
//     myFunc()
// }, 1000);


function fff(e) {
    e.preventDefault()
    console.log('true')
}

