const time = document.querySelector('#time');
const hourEl = document.querySelector('#hour');
const minuteEl = document.querySelector('#minute');
const secondeEl = document.querySelector('#seconde');
const formCreat = document.querySelector('#form-creat');
const formEdit = document.querySelector('#form-edit');
const massage = document.querySelector('#message');
const listGroup = document.querySelector('#list-group');
const overlay = document.querySelector('#overlay');
const closeEdit = document.querySelector('#close-edit')


let EditeTodo 

// local storageni tekshirish
let todos = JSON.parse(localStorage.getItem('list'))
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

    const months = [
        'Yanvar',
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr',
    ]
    const month_title = now.getMonth()
    time.textContent = `${date}-${months[month_title]} ${year}-yil`
    hourEl.textContent = `${hour}:`
    minuteEl.textContent=`${minute}:`
    secondeEl.textContent = `${seconde}`
    return `${hour}:${minute}, ${date}.${month}.${year}`
   
}
setInterval(()=>{
    getTime()
},1000)


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
       <li ondblclick = (complated(${i})) class="list-item ${item.complated ? 'complated':''}">
         <p>${item.text}</p>
            <div class="icon-box">
             <small class="list-time">${item.time}</small>
             <i onclick=(editTodo(${i})) class="fa-regular fa-pen-to-square edite"></i>
             <i onclick=(deletTodo(${i})) class="fa-regular fa-trash-can delete"></i>
             </div>
        </li>
       `
    })
}


formEdit.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputValue = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if(inputValue.length){
        todos.splice(EditeTodo, 1, 
        {text:inputValue, time:getTime(), complated:false})
        setTodo()
        showTodo()
        closse()
    }else{
        showMessage('#message', 'error')
    }
})
// editTodo
 function editTodo(id){
    oppen()
    EditeTodo = id
 }
// complated todo
function complated(id){
    const compaltedTodo = todos.map((item, i)=>{
        if(id == i){
            return {...item, complated:item.complated == true?false:true}
        }else{
            return{...item}
        }
    })
    todos = compaltedTodo
    setTodo();
    showTodo();
}
// deletTodo function
function deletTodo(id){
    let deletedTodos = todos.filter((item, i)=>{
        return id !== i
    })
    todos = deletedTodos
    setTodo()
    showTodo()
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
});

function oppen(){
    formEdit.classList.remove('hidden');
    overlay.classList.remove('hidden')

}
function closse(){
    formEdit.classList.add('hidden');
    overlay.classList.add('hidden')

}
overlay.addEventListener('click',()=>{
    closse()
})
closeEdit.addEventListener('click',()=>{
    closse()
})























setInterval(snow, 75)
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