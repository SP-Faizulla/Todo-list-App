const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    list.innerHTML = "";

    let filtered = tasks.filter(task => {

        if(filter === "active") return !task.completed;

        if(filter === "completed") return task.completed;

        return true;

    });

    filtered.forEach((task,index)=>{

        const li=document.createElement("li");

        li.className="list-group-item";

        const span=document.createElement("span");

        span.innerText=task.text;

        if(task.completed){

            span.classList.add("completed");

        }

        span.onclick=()=>{

            task.completed=!task.completed;

            saveTasks();

            renderTasks();

        }

        const del=document.createElement("button");

        del.innerText="Delete";

        del.className="btn btn-danger btn-sm";

        del.onclick=()=>{

            tasks.splice(tasks.indexOf(task),1);

            saveTasks();

            renderTasks();

        }

        li.appendChild(span);

        li.appendChild(del);

        list.appendChild(li);

    });

    count.innerText=tasks.length;

}

addBtn.onclick=()=>{

    if(input.value.trim()===""){

        alert("Enter a task");

        return;

    }

    tasks.push({

        text:input.value,

        completed:false

    });

    input.value="";

    saveTasks();

    renderTasks();

}

input.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addBtn.click();

    }

});

document.querySelectorAll(".filter").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        filter=btn.dataset.filter;

        renderTasks();

    }

});

renderTasks();