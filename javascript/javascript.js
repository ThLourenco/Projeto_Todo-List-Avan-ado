//Seleçao de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-button")
const filterBtn = document.querySelector("#filter-select")


let oldInputValue;

//Funçoes
                        //done é como 0 porque a tarefa criada nao esta concluida
const saveTodo = (text, done = 0/*tarefas feitass*/, save = 1/* salva o dado na local store */) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle);

    const donebtn = document.createElement("button")
    donebtn.classList.add("finish-todo")
    donebtn.innerHTML = '<i class="fa-solid fa-check"></i>' //usando aspas simples pq ja tem aspas duplas
    todo.appendChild(donebtn) //aqui estou adicionando o btn dentro do todo(div)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //usando aspas simples pq ja tem aspas duplas
    todo.appendChild(editBtn) //aqui estou adicionando o btn dentro do todo(div)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //usando aspas simples pq ja tem aspas duplas
    todo.appendChild(removeBtn) //aqui estou adicionando o btn dentro do todo(div)

    //utilizando dados da localStorage
    if(done){
        todo.classList.add("done")
    }

    if(save){
        saveTodoLocalStorage({text, done})
    }

    todoList.appendChild(todo)
    console.log(todo)
    todoInput.value = "" //aqui ele cria e apaga o estava digitado
    todoInput.focus() //volta a focar na barra
};


function alertaCampoEnpty(){ //Alerta caso input value estaja enpty
    alert("campo vazio");
    return
}

const tuggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");

}

const updatTodo = (text) => {

    const todos = document.querySelectorAll(".todo") 
    console.log(todos)

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")
        console.log(todoTitle)
        if(todoTitle.innerText === oldInputValue){ //“Se o texto atual for IGUAL ao texto antigo que eu salvei… então atualiza”
            console.log(oldInputValue)
            todoTitle.innerText = text
            updateTodoLocalStore(oldInputValue,text)
        }

    })

}

const getSearchTodos = (search) =>{

      const todos = document.querySelectorAll(".todo");

       todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        const normalizedSearch = search.toLowerCase();

         todo.style.display = "flex";

            if(!todoTitle.includes(normalizedSearch)){
                todo.style.display = "None";
            }

        });


}


const filterTodos = (fitlerValue) => {
    const todos = document.querySelectorAll(".todo")

    switch(fitlerValue){

        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

       case "done":
            todos.forEach((todo) => todo.classList.contains("done")
            ? (todo.style.display="flex")
            : (todo.style.display="none"));
            break;

         case "todo":
            todos.forEach((todo) =>
                 !todo.classList.contains("done")
            ? (todo.style.display="flex")
            : (todo.style.display="none"));
            break; 

        default:
            break;
      
    }

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

document.addEventListener("click", (e) => { //estou criando um evento no documento todo
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
        updateTodoStatusLocalStoreage(todoTitle);
    }

   if(targetEl.classList.contains("edit-todo")){
        tuggleForms(); 
        editInput.value = todoTitle;
        console.log(editInput)
        oldInputValue = todoTitle;
        console.log(oldInputValue)
   }
   
   if(targetEl.classList.contains("remove-todo")){
        parentEl.remove()
        removeTodoLocalStore(todoTitle)
   }

})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()
    tuggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

   
    const editInputValue = editInput.value;
    console.log(editInputValue)
   
    if(editInputValue){
        updatTodo(editInputValue)
    }

    tuggleForms()
});

searchInput.addEventListener("keyup", (e) => { //todas vez que o usuario aperta tecla e solta ele faz o evento
    
    const search = e.target.value

    getSearchTodos(search);
     
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchInput.value = ""; // até da um erro que nao mostra oque esta na lista
    searchInput.dispatchEvent(new Event("keyup")) //solucionamos isso com um novo evento de keyup
})

filterBtn.addEventListener("change", (e) => {
    
    const filtervalue = e.target.value;
    console.log(filtervalue)
    filterTodos(filtervalue)

})


//local storage

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos;
}

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0) //zero pra salvar nao quero que salve
    })
}

const saveTodoLocalStorage = (todo) => {

    
    //pegar todos os todos da ls
    // add onovo todo no arr
    //salvar tudo na ls

    const todos = getTodosLocalStorage();

    todos.push(todo);

    l
        //setItem ele recebe ("chave", "valor")
    localStorage.setItem("todos", 
        JSON.stringify(todos));
    //todos é um array/objt o stringify converte o array/obj em string JSON

}

const removeTodoLocalStore = (todoText) => {
     const todos = getTodosLocalStorage();
         
     //O .filter() não exclui diretamente Ele retorna o que vai ficar
     const filteredTodos = todos.filter((todo) => todo.text !== todoText)
    //👉 “Se for diferente → fica” 👉 “Se for igual → sai”

    
        //setItem ele recebe ("chave", "valor")
    localStorage.setItem("todos", 
        JSON.stringify(todos));
    //todos é um array/objt o stringify converte o array/obj em string JSON

};

const updateTodoStatusLocalStoreage = (todotext) => {

    const todos = getTodosLocalStorage();
                //O .map() percorre cada item do array todos.
    todos.map((todo) =>
     todo.text === todotext 
    ? todo.done = !todo.done  //aqui estou invertendo o valro do done (true fica false ou false fica true)
    : null); // se nao for igual retorna null

        //setItem ele recebe ("chave", "valor")
    localStorage.setItem("todos", 
        JSON.stringify(todos));
    //todos é um array/objt o stringify converte o array/obj em string JSON

};


const updateTodoLocalStore = (todoOldText, todoNewText) => {

    const todos = getTodosLocalStorage();
                        //condiaçao                 se for true                 se for false
    todos.map((todo) => todo.text === todoOldText ? (todo.text = todoNewText) : null);

    
        //setItem ele recebe ("chave", "valor")
    localStorage.setItem("todos", 
        JSON.stringify(todos));
    //todos é um array/objt o stringify converte o array/obj em string JSON

};



loadTodos()