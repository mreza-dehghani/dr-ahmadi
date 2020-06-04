"use strict"

let page1 = document.createElement('div');
let page2 = document.createElement('div');

page1.innerHTML = `
    <div id="temp-1">
    <div>
        <table class="table text-center table-bordered" id="list-of-patients">

            <tr class="bg-light">
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
        در حال حاضر این نسخه از برنامه جهت استفاده می شود
    </div>
    </div>
`;

const main = document.getElementById('main');

main.append(page1);
// const temp1 = document.getElementsByTagName("template")[0];
// const clon1 = temp1.content;
// page1.append(clon1);


// setTimeout(() => {
//     main.removeChild(page1)
// }, 3000)

// const temp2 = document.getElementsByTagName("template")[1];
// const clon2 = temp2.content;
// main.append(clon2);

const ul = document.querySelector('.navigation');

class Navigation {
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
    }


    onClick(event) {
        event.stopPropagation();
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

new Navigation(ul);

const url = 'http://localhost:3000/tunes';


if (main.contains(page1)) {
    fetch(url)
        .then(response => response.json())
        .then(res => {
            const table = document.getElementById('list-of-patients');
            const tr = document.getElementById('tr');
            console.log(res);

            res.forEach(element => {

                let clone = tr.cloneNode(true);
                table.append(clone);
                table.rows[1].cells[1].innerHTML = element.firstname;
                table.rows[1].cells[2].innerHTML = element.lastname;
                table.rows[1].cells[3].innerHTML = element.age;
                table.rows[1].cells[4].innerHTML = element.date.day + ' ' + element.date.date;
                table.rows[1].cells[5].innerHTML = 18 + " " + "الی" + " " + 20;
                table.rows[1].cells[6].innerHTML = element.price;
                table.rows[1].cells[7].innerHTML = '<button class="ripple">حذف</button>';

            });
        })
}