

let addbtn = document.querySelector("#addbtn");
let task = document.querySelector("#task")
let list  = document.querySelector("#tasklist")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(){
    list.innerHTML = "";

    tasks.forEach((taskText, index) => {
        let li = document.createElement("li")
        li.textContent = taskText;
        list.appendChild(li);
    });
}
renderTasks();

addbtn.addEventListener("click", function(){
    let text = task.value; 

    if(!text.trim()){
        return;
    
    }

    tasks.push(text)
    
    localStorage.setItem("tasks", JSON.stringify(tasks));   


    let li = document.createElement("li");
    li.textContent = text

    list.appendChild(li);
    

    task.value = "";
    
})
list.addEventListener("click", function(event){
    if (event.target.tagName === "LI"){
        const clickLi = event.target

        if (clickLi.style.textDecoration === "line-through"){
            clickLi.style.textDecoration = "none";
        }
        else{
            clickLi.style.textDecoration = "line-through"
        }

    }
})
list.addEventListener("dblclick", function(event){
    if (event.target.tagName === "LI"){
        const clickdel = event.target
        const text = clickdel.textContent
        
        tasks = tasks.filter(t => t!==text);
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        
        clickdel.remove();
    }
    
})
