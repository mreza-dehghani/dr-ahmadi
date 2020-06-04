"use strict"

let page1 = document.createElement('div');
let page2 = document.createElement('div');

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
                    <td></td>
                    <td></td>
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

const main = document.getElementById('main-details');
main.append(page1);

const url1 = 'http://localhost:3000/tunes';
if (main.contains(page1)) {
    fetch(url1)
        .then(response => response.json())
        .then(res => {
            const table1 = document.getElementById('list-of-patients');
            const tr1 = document.getElementById('tr');
            console.log(res);

            res.forEach(element => {

                let clone = tr1.cloneNode(true);
                table1.append(clone);
                table1.rows[1].cells[1].innerHTML = element.firstname;
                table1.rows[1].cells[2].innerHTML = element.lastname;
                table1.rows[1].cells[3].innerHTML = element.age;
                table1.rows[1].cells[4].innerHTML = element.date.day + ' ' + element.date.date;
                table1.rows[1].cells[5].innerHTML = 18 + " " + "الی" + " " + 20;
                table1.rows[1].cells[6].innerHTML = element.price;
                table1.rows[1].cells[7].innerHTML = '<button class="ripple">حذف</button>';

            });
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
        }
        main.append(page1);
    }

    temp2() {
        if (main.contains(page1)) {
            main.removeChild(page1);
        }
        main.append(page2);
        secondFetch();
    }

    onClick(event) {
        event.stopPropagation();
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

class NavigationL {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    temp1() {
        if (main.contains(page2)) {
            main.removeChild(page2);
        }
        main.append(page1);
    }

    temp2() {
        if (main.contains(page1)) {
            main.removeChild(page1);
        }
        main.append(page2);
        secondFetch();
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
    if (main.contains(page2)) {
        console.log('it is true');
        fetch(url2)
            .then(response => response.json())
            .then(response => {
                const table2 = document.getElementById('list-of-comments');
                const tr2 = document.getElementById('tr2');
                console.log(response);

                response.forEach(element => {
                    let clone2 = tr2.cloneNode(true);
                    table2.append(clone2);
                    table2.rows[1].cells[1].innerHTML = element.name;
                    table2.rows[1].cells[2].innerHTML = element.message;
                    table2.rows[1].cells[3].innerHTML = element.time + ' ' + element.date;
                    table2.rows[1].cells[4].innerHTML = '<button class="ripple">پاسخ</button>';
                })
            })
    }
}