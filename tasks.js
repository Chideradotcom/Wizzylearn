const body=document.body
const form=document.querySelector("form")
const section=document.querySelector(".list")
const saveInput=document.querySelector("input")
const clearButton=document.querySelector(".clear-btn")
const hideButton=document.querySelector(".hide-btn")
const showButton=document.querySelector(".show-btn")
const saveButton=document.querySelector(".save-btn")
const alertMsg=document.querySelector(".msg")

//Editing items
let editedTask=""
let editingItem=false
let editId

//Deleting Items
let deletedTask=""
let deletingItem=false
let deleteId
form.addEventListener("submit", addItems)
window.addEventListener("load", loadTasks)
clearButton.addEventListener("click", clearTasks)
hideButton.addEventListener("click", hideTasks)
showButton.addEventListener("click", showTasks)

function addItems(e){
    e.preventDefault()
    let itemsId=Date.now()
    let sth=saveInput.value.trim()
    if(sth && !editingItem){
        addToLocalStorage(itemsId, sth)
        createTasks(itemsId, sth)
        alertMessage("Item added successfully!", "success")
    } else{
        editLSTasks(editId, sth)//For editing the already existing task in localstorage
        editedTask.innerHTML=sth//passes sth to the innerHTML of editedTask        
        alertMessage("Item edited successfully!", "success")
    }
    backToDefault()//restores the input container back to its previous state
}
function addToLocalStorage(id, item){
    let arr= getLSItems()
    arr.push({id,item})
    localStorage.setItem("list", JSON.stringify(arr))
}

function getLSItems(){
    if(localStorage.getItem("list")){
        return JSON.parse(localStorage.getItem("list"))
    } else{
        return []
    }
}

function createTasks(id, item){
    const div=document.createElement("div")
    div.setAttribute("class", "task")
    // div.setAttribute("data-id", id)
    const idAtt=document.createAttribute("data-Id")
    idAtt.value=id
    div.setAttributeNode(idAtt)
    div.innerHTML+=`
    <p>${item}</p>
    <button class="edit-btn">
    <i class="fa fa-pen"></i>Edit
    </button>
    <button class="del-btn"> <i class="fa fa-trash"></i>Delete</button>`
    section.appendChild(div)
    const editButtons=document.querySelectorAll(".edit-btn")
    const deleteButtons=document.querySelectorAll(".del-btn")
    editButtons.forEach(editButton=>{
        editButton.addEventListener("click", editTask)
    })
    deleteButtons.forEach(deleteButton=>{
        deleteButton.addEventListener("click", deleteTask)
    })

}
function loadTasks(){
    const varArr=getLSItems()
    if(varArr.length>0){
        varArr.forEach(newItem => {
            const{id, item}=newItem
            createTasks(id, item)
        });
    }
}

function editTask(event){
    const taskElement=event.currentTarget.parentElement;//access the text directly. gives access to the div
    saveInput.value=taskElement.firstElementChild.textContent
    editingItem=true
    editedTask=taskElement.firstElementChild
    // editId=taskElement.getAttribute()
    editId=taskElement.getAttribute("data-Id")
    
    // console.log("made elements id",taskElement.dataset.id);
    // console.log("editid", editId);
    // console.log(taskElement);
    
    saveButton.innerText="Edit"
}

function editLSTasks(id, item){
    let retrievedItems=getLSItems()
    retrievedItems= retrievedItems.map(newItem=>{
        
        if(parseInt(id)===newItem.id){            
            newItem.item=item
            console.log(newItem.item);
        }
        return newItem
    })
    localStorage.setItem("list", JSON.stringify(retrievedItems))
}

function backToDefault(){
    saveInput.value=""
    editingItem=false
    editId=null
    saveButton.textContent="Save"
}

//Delete Tasks

function deleteTask(event){
    const taskElement=event.currentTarget.parentElement;//access the text directly. gives access to the div
    deletingItem=true
    deletedTask=taskElement
    deleteId=taskElement.getAttribute("data-Id")
    //deleting from the ui
    section.removeChild(deletedTask)
    // console.log(deletedTask);
    
    //deleting the item in localstorage
    deleteLSTasks(deleteId)
    alertMessage("Item deleted successfully", "danger")
}

function deleteLSTasks(id){
    let retrievedItems=getLSItems()
    retrievedItems= retrievedItems.filter(newItem=>{
        
        if(parseInt(id)!==newItem.id){
            return newItem
        }
    })
    localStorage.setItem("list", JSON.stringify(retrievedItems))
}

function alertMessage(message, msgType){
    alertMsg.textContent=message
    alertMsg.classList.add(msgType)
    alertMsg.classList.remove("hide-msg")
    setTimeout(()=>{
        alertMsg.classList.add("hide-msg")
    }, 2000)
}
function clearTasks(){
    localStorage.setItem("list", JSON.stringify([]))
    while(section.firstElementChild){
        section.removeChild(section.firstElementChild)
    }
}
function hideTasks(){
    section.classList.add("hide-msg")
    hideButton.classList.add("hide")
    showButton.classList.remove("hide")
}
function showTasks(){
    section.classList.remove("hide-msg")
    hideButton.classList.remove("hide")
    showButton.classList.add("hide")
}

export default {
    addItems,
    addToLocalStorage,
    getLSItems,
    createTasks,
    loadTasks,
    editTask,
    editLSTasks,
    backToDefault,
    deleteTask,
    deleteLSTasks,
    alertMessage,
    clearTasks,
    hideTasks,
    showTasks
}