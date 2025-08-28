const form = document.querySelector("#form")
const loginBtn = document.querySelector(".button")

const retrievedInfo = JSON.parse(localStorage.getItem("info"))
console.log(retrievedInfo);
form.addEventListener("submit", getItem)
function getItem(event){
    event.preventDefault()
    const email = document.querySelector(".email").value
    const password = document.querySelector(".password").value
    if(email==retrievedInfo.email && password==retrievedInfo.password){
        alert("Success!")
        window.location.href=studyaid.html"
    } else{
        console.error("Try again");
        alert("Incorrect email or password!")
        
    }
}

document.querySelectorAll('.toggle-password').forEach(toggle=>{
    toggle.addEventListener('click', function(){
        const input = this.parentElement.querySelector('input')
        if(input.type==='password'){
            input.type="text"
            this.innerHTML='<i class="fa fa-eye"></i>'
        }
    })
})
