import tasksModule from './tasks.js'
import flashCardsModule from './flashcards.js'
import pomodoroModule from './pomodoro.js'
import newsModule from './news.js'


const navBar=document.querySelector(".hamburger")
const navUl=document.querySelector("header nav ul")

navBar.addEventListener("click", ()=>{
    navUl.classList.toggle("togle")
})
document.addEventListener("click", (e)=>{
    if(
    navUl.classList.contains("togle")&&
    !navUl.contains(e.target)&&
    !navBar.contains(e.target)
) {
    navUl.classList.remove("togle")
}
})

document.addEventListener("DOMContentLoaded", () => {
    const featureSelection = document.querySelectorAll(".feature-section")
    const featureLinks = document.querySelectorAll("[data-feature]")
    const homeSection = document.querySelector(".markdown")
    const cardsSection = document.querySelector(".cards")
    
    const userInfo = JSON.parse(localStorage.getItem("info"))
    if (userInfo && userInfo.name){
        const welcomeHeader = document.querySelector(".markdown h1")
        welcomeHeader.textContent = `Welcome Back, ${userInfo.name}`
    }

    function showFeature(feature){
        //Hides all the feature sections
        featureSelection.forEach(section => section.style.display = "none")
        if (feature === "home") {
            homeSection.style.display = "block"
            cardsSection.style.display = "grid"
        } else {
            homeSection.style.display = "none"
            cardsSection.style.display = "none"
            const activeSection = document.getElementById(`${feature}-section`)
            if (activeSection) activeSection.style.display = "block"
        }

        if(feature === "tasks"){
            tasksModule.loadTasks()
        }
        if(feature === "flashcards"){
            flashCardsModule.initFlashcards()
        }

        if(feature==="pomodoro"){
            pomodoroModule.initPomodoro()
        }
        if(feature==="news"){
            newsModule.initNews()
        }
    }

    featureLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            const feature = link.getAttribute("data-feature")
            showFeature(feature)
        })
    })
})

