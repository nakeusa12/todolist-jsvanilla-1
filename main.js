// Mengambil Element dari HTML
const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoFilter = document.querySelector("#filter-input");
const clearTodo = document.querySelector("#clear-todos");
const todoList = document.querySelector("#todo-list");

// Load function ini ketika di run
immediateLoadEventListener();

function immediateLoadEventListener() {
  // Memasukkan atau menampilkan todo yang ada di local storage kedalam browser
  document.addEventListener("DOMContentLoaded", getTodos);
  function getTodos() {
    // Jika di localStorage tidak ada data lalu buat array kosong, namun jika ada tampilkan data tersebut ke dalam browser
    const todos = getItemFromLocalStorage();

    todos.forEach((todo) => {
      createTodoElement(todo);
    });
  }

  // Melakukan submit untuk memasukan data input ke todo-list
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Jika input diisi akan muncul element todolist tetapi jika tidak diisi akan muncul error
    if (todoInput.value) {
      createTodoElement(todoInput.value);
      addTodoListLocalStorage(todoInput.value);

      // Mengosongkan kembali input yang sudah di isi
      todoInput.value = "";
    } else {
      alert("Input tidak boleh kosong");
    }
  });

  // Fungsi yang digunakan untuk memasukan data input kedalam local Storage agar ketika di refresh tidak akan akan hilang, dan data tersebut tersimpan didalam local storage
  function addTodoListLocalStorage(todoInputValue) {
    const todos = getItemFromLocalStorage();
    todos.push(todoInputValue);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Membuat icon Delete menghapus list
  todoList.addEventListener("click", (event) => {
    event.preventDefault();

    //  menghapus element li yang diclick
    if (event.target.classList.contains("delete-todo")) {
      // ? Meyakinkan user apakah li benar2 ingin di hapus?
      if (confirm("Yakin ingin menghapus?")) {
        const parent = event.target.parentElement;

        parent.remove();

        deteleTodoLocalStorage(parent);
      }
    }
  });

  function deteleTodoLocalStorage(deletedElement) {
    const todos = getItemFromLocalStorage(); //Menghapus element parent yg di tuju

    todos.forEach((todo, index) => {
      if (deletedElement.firstChild.textContent === todo) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Membuat Button Clear All berfungsi
  clearTodo.addEventListener("click", () => {
    todoList.innerHTML = "";

    clearTodosLocalStorage();
  });

  function clearTodosLocalStorage() {
    localStorage.clear();
  }

  // Memfilter todo-list sesuai kata yg diketik
  todoFilter.addEventListener("keyup", (e) => {
    //  Menyimpan nilai dari filter input kedalam variabel
    const filterText = e.target.value.toLowerCase();
    const todoItems = document.querySelectorAll(".todo-item");

    // melakukan looping untuk mendapatkan semua element todo items yang tersedia yang kalimatnya ada hubungan dengan filter task yang diketik user
    todoItems.forEach((item) => {
      // Menyimpan masing2 value text kedalalam variabel
      const itemText = item.firstChild.textContent.toLowerCase();

      // Logika:  jika value yang dicari user berhubungan dengan value text yang ada di todo-list(itemText), maka lakukan statement
      if (itemText.indexOf(filterText) !== -1) {
        item.setAttribute("style", "display: block;");
      } else {
        item.setAttribute("style", "display: none !important");
      }
    });

    console.log(todoItems);
  });
}

// Reusable Codes
function getItemFromLocalStorage() {
  let todos;
  // jika local storage kosong maka todos akan diubah menjadi array kosong, Namun jika local storage terisi value, lalu value itu akan menjadi array
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function createTodoElement(value) {
  // Membuat element li
  const li = document.createElement("li");
  li.className =
    "todo-item relative bg-gray-300 flex justify-between rounded px-3 py-2 my-3";
  li.appendChild(document.createTextNode(value));

  // Membuat element icon
  const i = document.createElement("i");
  i.className =
    "fas fa-trash text-red-700 cursor-pointer delete-todo pt-1 absolute right-0 mr-5";

  // Memasukan a kedalam element li
  li.appendChild(i);

  // Memasukkan li kedalam todo-list
  todoList.appendChild(li);
}
