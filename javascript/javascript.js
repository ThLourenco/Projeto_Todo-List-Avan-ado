//Seleçao de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

//Funçoes

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const donebtn = document.createElement("button")
    donebtn.classList.add("finish-todo")
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>' //usando aspas simples pq ja tem aspas duplas
    todo.appendChild(donebtn) //aqui estou adicionando o btn dentro do todo(div)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //usando aspas simples pq ja tem aspas duplas
    todo.appendChild(editBtn) //aqui estou adicionando o btn dentro do todo(div)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("edit-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //usando aspas simples pq ja tem aspas duplas
    todo.appendChild(removeBtn) //aqui estou adicionando o btn dentro do todo(div)

    todoList.appendChild(todo)
    console.log(todo)
    todoInput.value = "" //aqui ele cria e apaga o estava digitado
    todoInput.focus() //volta a focar na barra
};


function alertaCampoEnpty(){ //Alerta caso input value estaja enpty
    alert("campo vazio");
    return
}



//Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
   // console.log("Enviou fomr")
    const inputValue = todoInput.value //pegando o value digitado no input
    if(inputValue){
        //save todo
        saveTodo(inputValue)
    }
    
    if(!inputValue.trim()){
       todoInput.style.border = "2px solid red"
        alertaCampoEnpty()  //Alerta caso input value estaja enpty
        return; //para a funçao aqui e nao continua o resto do codigo
    }
    
})

//como eu criei a validaçao para caso o input estive enpty estava ocorrendo um erro de borda
//a criaçao deste eventListner foi apra que a borda volta ao normal quando for digitado algo no input
todoInput.addEventListener("input", () => {
    todoInput.style.border = "";

    /* O "input" dispara sempre que o valor do campo muda, tipo:

digitando
apagando
colando texto */
});