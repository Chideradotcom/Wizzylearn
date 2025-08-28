const navBar = document.querySelector(".hamburger");
const navUl = document.querySelector("header nav ul");

navBar.addEventListener("click", () => {
    navUl.classList.toggle("togle");
});

document.addEventListener("click", (e) => {
    if (
        navUl.classList.contains("togle") &&
        !navUl.contains(e.target) &&
        !navBar.contains(e.target)
    ) {
        navUl.classList.remove("togle");
    }
});