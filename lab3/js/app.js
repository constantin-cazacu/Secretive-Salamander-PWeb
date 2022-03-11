const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TONOTDO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    // set the id to the last one in the list
    id = LIST.length;
    // load the list to the user interface
    loadList(LIST);
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToNotDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// display today's date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

let time = new Date();
let n = time.getHours();
if (n > 21 || n < 4)
    document.getElementById('background').style.backgroundImage="url(../img/night.png)";
else if (n >= 4 && n < 8)
    document.getElementById('background').style.backgroundImage="url(../img/dawn.png)";
else if (n > 8 && n < 17)
    document.getElementById('background').style.backgroundImage="url(../img/day.png)";
else if (n >= 17 && n < 21)
    document.getElementById('background').style.backgroundImage="url(../img/dusk.png)";

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToNotDo(toNotDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toNotDo}</p>
                    <i class="fa fa-trash-o del" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode === 13){
        const toNotDo = input.value;
        // if the input isn't empty
        if(toNotDo){
            addToNotDo(toNotDo, id, false, false);
            
            LIST.push({
                name : toNotDo,
                id : id,
                done : false,
                trash : false
            });
            localStorage.setItem("TONOTDO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToNotDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToNotDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToNotDo(element);
    }else if(elementJob == "delete"){
        removeToNotDo(element);
    }
    localStorage.setItem("TONOTDO", JSON.stringify(LIST));
});












