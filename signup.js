const form = document.querySelector("#form")
const agreement = document.querySelector(".checkbox")
const signupBtn = document.querySelector(".signup")

signupBtn.style.visibility="hidden"
agreement.addEventListener("change", function() {
    if (this.checked) {
        signupBtn.style.visibility="visible"
    } else {
        signupBtn.style.visibility="hidden" 
    }
})
form.addEventListener("submit", addToLocalStorage)

function addToLocalStorage(event) {
    event.preventDefault()
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    if(!name || !email || !password){
        alert("Please fill in the necessary information")
        return
    }
    const userInfo = {name, email, password}
    const storedInfo = localStorage.setItem("info", JSON.stringify(userInfo))
    console.log(storedInfo);
    window.location.href="login.html"
}

document.querySelectorAll('.toggle-password').forEach(toggle=>{
    toggle.addEventListener('click', function(){
        const input = this.parentElement.querySelector('input')
        if(input.type==='password'){
            input.type="text"
            this.innerHTML='<i class="fa fa-eye"></i>'
        } else{
            input.type ='password'
            this.innerHTML='<i class="fa fa-eye"></i>'
        }
    })
})