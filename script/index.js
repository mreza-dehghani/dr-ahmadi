"use strict"

// change theme color

function changeThemeColor() {
    let metaThemeColor = document.querySelector('meta[name=theme-color]');

    metaThemeColor.setAttribute("content", "#00b4cc");
}

changeThemeColor();

// responsive menu

function openSidebar() {
    let open, darkBody, sideNav;
    open = document.getElementById("open-sidebar");
    darkBody = document.getElementById("dark-body");
    sideNav = document.getElementById("sidebar-nav");

    sideNav.style.right = "0";
    darkBody.style.display = "block";
}

function closeSidebar() {
    let darkBody, sideNav;
    darkBody = document.getElementById("dark-body");
    sideNav = document.getElementById("sidebar-nav");

    darkBody.style.display = "none";
    sideNav.style.right = "-100%";
}

// search box in mobile device

function openSearchBox() {
    let search;
    search = document.getElementById("search-tab");

    search.style.display = "block";
}

function closeSearchBox() {
    let search;
    search = document.getElementById("search-tab");

    search.style.display = "none";
}

// search box in desktop device

function openSearchBoxLg() {
    let search;
    search = document.getElementById("search-box-lg");

    search.style.opacity = "1";
    search.style.top = "0";
}

function closeSearchBoxLg() {
    let search;
    search = document.getElementById("search-box-lg");

    search.style.opacity = "0";
    search.style.top = "-100%";
}

// scroll window

function scrollDown() {
    window.scrollTo({
        top: 800,
        left: 800,
        behavior: "smooth"
    })
}

function scrollUp() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

// ripple button effect

let rippleBtn = document.querySelectorAll('.ripple');

for (let i = 0; i < rippleBtn.length; i++) {
    rippleBtn[i].addEventListener('mousedown', (event) => {
        let div = document.createElement('DIV');
        let left = event.offsetX + 'px';
        let top = event.offsetY + 'px';
        div.classList.add('ripple-effect');
        div.style.left = left;
        div.style.top = top;

        rippleBtn[i].append(div);
        setTimeout(() => {
            rippleBtn[i].removeChild(div)
        }, 400)
    });
};

// clear storage
setInterval(() => {
    localStorage.clear()

}, 43200000);

