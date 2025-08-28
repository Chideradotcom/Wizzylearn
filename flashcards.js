let flashcards = JSON.parse(localStorage.getItem("flashcards")) || []
let current = 0

function renderFlashcard(){
    const front = document.querySelector(".flashcard-front")
    const back = document.querySelector(".flashcard-back")
    if (flashcards.length === 0){
        front.textContent = "No flashcards yet."
        back.textContent = ""
        back.style.display = "none"
        return
    }
    front.textContent = flashcards[current].question
    back.textContent = flashcards[current].answer
    back.style.display = "none"
}

function flipFlashcard() {
    const front = document.querySelector(".flashcard-front")
    const back = document.querySelector(".flashcard-back")
    if (back.style.display === "none"){
        back.style.display = "block"
        front.style.display = "none"
    } else {
        back.style.display = "none"
        front.style.display = "block"
   }
}

function nextFlashcard(){
    if(flashcards.length === 0) return
    current = (current + 1) % flashcards.length
    renderFlashcard()
}

function prevFlashcard(){
    if(flashcards.length === 0) return
    current = (current - 1 + flashcards.length) % flashcards.length
    renderFlashcard()
}

function addFlashcard(e){
    e.preventDefault()
    const question = document.querySelector(".flashcard-question").value.trim()
    const answer = document.querySelector(".flashcard-answer").value.trim()
    if (!question || !answer) return
    flashcards.push({ question, answer })
    localStorage.setItem("flashcards", JSON.stringify(flashcards))
    current = flashcards.length - 1
    renderFlashcard()
    e.target.reset()
}

function deleteFlashcard() {
    if (flashcards.length === 0) return;
    flashcards.splice(current, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    if (current >= flashcards.length) current = flashcards.length - 1;
    if (current < 0) current = 0;
    renderFlashcard();
}

function editFlashcard() {
    if (flashcards.length === 0) return;
    const question = prompt("Edit question:", flashcards[current].question);
    if (question === null) return; // Cancelled
    const answer = prompt("Edit answer:", flashcards[current].answer);
    if (answer === null) return; // Cancelled
    flashcards[current] = { question: question.trim(), answer: answer.trim() };
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderFlashcard();
}

function clearFlashcards(){
    flashcards = []
    localStorage.removeItem("flashcards")
    current = 0
    renderFlashcard()
}

function initFlashcards(){
    renderFlashcard()
    document.querySelector(".flip-flashcard").onclick = flipFlashcard
    document.querySelector(".next-flashcard").onclick = nextFlashcard
    document.querySelector(".prev-flashcard").onclick = prevFlashcard
    document.querySelector(".add-flashcard-form").onsubmit = addFlashcard
    document.querySelector(".clear-flashcards").onclick = clearFlashcards
    document.querySelector(".edit-flashcard").onclick = editFlashcard;
    document.querySelector(".delete-flashcard").onclick = deleteFlashcard;
}

export default {
    initFlashcards
}