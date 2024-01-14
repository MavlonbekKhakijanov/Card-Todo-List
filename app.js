const time = document.querySelector('#time');
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const seconde = document.querySelector('#seconde');
const formCreat = document.querySelector('#form-creat');
const formEdit = document.querySelector('#form-edit');
const massage = document.querySelector('#message');
const listGroup = document.querySelector('#list-group');



setInterval(snow, 100)
function snow (){
    const snows = document.createElement("i")
    snows.classList.add('fas')
    snows.classList.add('fa-snowflake')
    snows.classList.add('snow')
    

    snows.style.left = Math.random() * window.innerWidth + "px"
    snows.style.animationDuration = Math.random()* 3 + 2 + 's'
    snows.style.fontSize = Math.random()* 7 + 12 + "px"
    snows.style.opacity = Math.random()


    document.body.append(snows);


    setTimeout(()=>{
        snows.remove()
    }, 4000)

}





// local storageni tekshirish

const todos = JSON.parse(localStorage.getItem('list'))
? JSON.parse(localStorage.getItem('list'))
: [];

if(todos.length){
    showTodo()
}

// time
function getTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()< 10 ? '0'+ (now.getMonth()+1):now.getMonth()
    const date = now.getDate()<10? '0'+ now.getDate():now.getDate()
    const hour = now.getHours()<10? '0'+  now.getHours(): now.getHours()
    const minute = now.getMinutes()<10 ? '0'+now.getMinutes():now.getMinutes()
    const seconde = now.getSeconds()<10 ? '0'+now.getSeconds():now.getSeconds()   
    return `${hour}:${minute}, ${date}.${month}.${year}`
}


// functions

// set todos to localStorage
function setTodo(){
    localStorage.setItem('list', JSON.stringify(todos))
}

// show Todo
function showTodo(){
    const todo = JSON.parse(localStorage.getItem('list'))
    listGroup.innerHTML = ''
    
    todo.forEach((item, i)=>{

       listGroup.innerHTML += `
       <li class="list-item">
         <p>${item.text}</p>
            <div class="icon-box">
             <small class="list-time">${item.time}</small>
             <i class="fa-regular fa-pen-to-square edite"></i>
             <i class="fa-regular fa-trash-can delete"></i>
             </div>
        </li>
       `
    })
}


// show message
function showMessage (where, message){
    document.querySelector(`${where}`).textContent = message

    setTimeout(()=>{
        document.querySelector(`${where}`).textContent = ''
    },2500)
}

formCreat.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputValue = formCreat['input'].value.trim()
    formCreat.reset()
    if(inputValue.length){
        todos.push({text:inputValue, time:getTime(), complated:false})
        setTodo()
        showTodo()
    }else{
        showMessage('#message', 'error')
    }
})



