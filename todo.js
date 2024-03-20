const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = 'todos'

let toDos = [];
//const toDos = []; => application이 시작될 때마다 toDos array는 항상 비어있기 때문에 새로운 것만 저장되는 거다. 그래서 newToDo를 작성하고 form을 submit 할 때마다 newToDo를 toDos array (빈 array)에 그냥 push 하게 된다. 그리고 그 toDo를 저장할 때 나는 새로운 toDo들만 포함하고 있는 array를 저장하는거다. 이 array는 이전의 toDo들은 가지고 있지 않다. 전에 있던 toDo들은 localStorage에 들어있다. 새로운 toDo들은 사용자가 입력하는 것이다.우리는 단지 newTodo들만 toDos array에 추가해서 단지 newToDo들만 localStorage에 저장하고 있는거다. 즉, 우리가 갖고 있던 toDos의 이전 복사본을 잊어버리고 있다는 말이다.
//======해결 방법=======
//application이 시작될 때 toDos array를 빈 값으로 시작하는 대신에, const를 let으로 바꿔서 업데이트가 가능하도록 만들고, localStorage에 toDo 들이 있으면 toDos에 parsedToDos를 넣어서 전에 있던 toDo들을 복원하면된다.

function saveToDos(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))//local storage cannot save as an array.So, to save the todo list value as an array form(not array but looks like an array), using json.stringify.
}

function deleteToDo(event){
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
const li = document.createElement("li")
li.id = newTodo.id;
const span = document.createElement("span");
span.innerText = newTodo.text;
const button = document.createElement('button');
button.innerText = 'x';
button.addEventListener("click", deleteToDo);
li.appendChild(span);
li.appendChild(button);
toDoList.appendChild(li);//append should be at the last
}

function handleToDoSubmit(event) {
event.preventDefault();
const newTodo = toDoInput.value;
toDoInput.value = "";
const newTodoObj = {
  text:newTodo,
  id : Date.now(),
};
toDos.push(newTodoObj);
paintToDo(newTodoObj);
saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  //with json.stringfy,save data as a string data type, but looks like an array. and using json.parse is make it string ->object. this object looks like an array. which means they can access the value through index
  toDos = parsedToDos; // update toDos array with saved todos
  parsedToDos.forEach(paintToDo);
  //array.foreach is put each item inside of the function without for loop.call painttodo() with each item of the array.ex-painttodo('a'), painttodo('b')...
}
