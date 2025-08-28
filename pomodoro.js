let timer = null
let timeLeft = 25 * 60
let running = false

function updateDisplay(){
    const display = document.querySelector("#pomodoro-section .timer-display")
    const minutes = String(Math.floor(timeLeft/60)).padStart(2, "0")
    const seconds = String(timeLeft%60).padStart(2, "0")
    display.textContent = `${minutes}:${seconds}`
}

function startPomodoro(){
    if(running) return
    running=true
    document.querySelector("#pomodoro-section .pomodoro-status").textContent = "Focus!"
    timer=setInterval(() => {
        if(timeLeft>0){
            timeLeft--
            updateDisplay()
        }else{
            clearInterval(timer)
            running=false
            document.querySelector("#pomodoro-section .pomodoro-status").textContent = "Time Up! Take a break."
        }
    }, 1000);
}

function pausePomodoro(){
    if (!running) return
    clearInterval(timer)
    running=false
    document.querySelector("#pomodoro-section .pomodoro-status").textContent = "Paused"
}

function resetPomodoro(){
    clearInterval(timer)
    timeLeft=25*60
    running=false
    updateDisplay()
    document.querySelector("#pomodoro-section .pomodoro-status").textContent = ""
}

function initPomodoro() {
    updateDisplay()
    document.querySelector("#pomodoro-section .start-pomodoro").onclick = startPomodoro
    document.querySelector("#pomodoro-section .pause-pomodoro").onclick = pausePomodoro
    document.querySelector("#pomodoro-section .reset-pomodoro").onclick = resetPomodoro
    
}

export default{
    initPomodoro
}