const cl = console.log;

const todoform = document.getElementById("todoform");
const todoControl = document.getElementById("todoItem");
const todoContainer = document.getElementById("todoContainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let todoarr = [];

const onDelete = (ele) => {
	let getConfirm = confirm(`are you sure,you want to delete this item?`)
	cl(getConfirm);
	if(getConfirm === true){
		cl(ele);
	let deleteId = ele.closest("li").id;
	cl(deleteId);
	let getIndex = todoarr.findIndex(todo => todo.todoId === deleteId)
	todoarr.splice(getIndex,1);
	localStorage.setItem("todos", JSON.stringify(todoarr));
	// listTemplating(todoarr);
	ele.closest("li").remove()
	
	Swal.fire({
		title : `todo item is removed`,
		icon : `success`,
		timer : 2000
	})
	}else{
		return
	}
}

const onEdit = (ele) => {
	 //  cl(ele)
	 // cl(ele.closest("li"))
	 // cl(ele.closest("li").getAttribute("id"));
	 let editId = ele.closest("li").getAttribute("id");
	 localStorage.setItem("editId", editId);
	 let editObj = todoarr.find(todo => todo.todoId === editId);
	 cl(editObj);
	 todoControl.value = editObj.todoItem;
	 updateBtn.classList.remove("d-none");
	 submitBtn.classList.add("d-none");
	 
}

const listTemplating = (arr) => {
	let todoList = `<ul class="list-group" id="skillList">`
	arr.forEach(todoObj => {
		todoList += `<li class="list-group-item font-weight-bold" id="${todoObj.todoId}">
					${todoObj.todoItem}
						<span class="float-right">
							<i class="fa-solid fa-pen-to-square text-primary fa-2x" onclick= "onEdit(this)" ></i>
							<i class="fa-solid fa-trash-can text-danger fa-2x ml-2" onclick= "onDelete(this)"></i>
						</span>
					</li>`
	});
	todoList += `</ul>`
	todoContainer.innerHTML = todoList;
}

if(localStorage.getItem("todos"))  {
	todoarr = JSON.parse(localStorage.getItem("todos"));
	// listTemplating(todoarr);
	cl(todoarr)
	
}

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const ontodoadd = (eve) => {
	eve.preventDefault();

	let newTodo = {
			todoItem : todoControl.value,
			todoId : generateUuid()
	};

	todoarr.unshift(newTodo);

	localStorage.setItem("todos", JSON.stringify(todoarr));

	// listTemplating(todoarr);

	let li = document.createElement("li");
	li.className = "list-group-item font-weight-bold";
	li.id = newTodo.todoId;
	li.innerHTML = `${newTodo.todoItem} <span class="float-right">
							<i class="fa-solid fa-pen-to-square text-primary fa-2x" onclick= "onEdit(this)" ></i>
							<i class="fa-solid fa-trash-can text-danger fa-2x ml-2" onclick= "onDelete(this)" ></i>
						</span>`
	cl(li)
	// cl(skillList);
	todoContainer.prepend(li);

	Swal.fire({
		title : `new todoitem ${newTodo.todoItem} added !!`,
		icon : `success`,
		timer : 3000
	})
	eve.target.reset();
}

const ontodoUpdate = () => {
	let updatedValue = todoControl.value;
	cl(updatedValue);
	let updateId = localStorage.getItem("editId");
	cl(updateId);
	for(let i = 0; i < todoarr.length; i++){ 
		if(todoarr[i].todoId === updateId){
			todoarr[i].todoItem = updatedValue;
			break;
		}
	}
	localStorage.setItem("todos", JSON.stringify(todoarr));
	// listTemplating(todoarr);
	let li = document.getElementById(updateId);
	 
	li.innerHTML = `${updatedValue} <span class="float-right">
							<i class="fa-solid fa-pen-to-square text-primary fa-2x" onclick= "onEdit(this)"></i>
							<i class="fa-solid fa-trash-can text-danger fa-2x ml-2" onclick= "onDelete(this)"></i>
						</span>`
	Swal.fire({
		title : `todoitem ${updatedValue} updated !!`,
		icon : `success`,
		timer : 3000
	})
	todoform.reset()
	// updateBtn.classList.add("d-none");
	// submitBtn.classList.remove("d-none");
} 


todoform.addEventListener("submit", ontodoadd)

updateBtn.addEventListener("click", ontodoUpdate)