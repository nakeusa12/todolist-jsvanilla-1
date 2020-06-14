// Mengambil Element dari HTML
const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoFilter = document.querySelector("#filter-input");
const clearTodo = document.querySelector("#clear-todos");
const todoList = document.querySelector("#todo-list");

// Load function ini ketika di run
immediateLoadEventListener();

function immediateLoadEventListener() {
  // Melakukan submit untuk memasukan data input ke todo-list
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Jika input diisi akan muncul element todolist tetapi jika tidak diisi akan muncul error
    if (todoInput.value) {
      // Membuat element li
      const li = document.createElement("li");
      li.className =
        "todo-item relative bg-gray-300 flex justify-between rounded px-3 py-2 my-3";
      li.appendChild(document.createTextNode(todoInput.value));

      // Membuat element icon
      const i = document.createElement("i");
      i.className =
        "fas fa-trash text-red-700 cursor-pointer delete-todo pt-1 absolute right-0 mr-5";

      // Memasukan a kedalam element li
      li.appendChild(i);

      // Memasukkan li kedalam todo-list
      todoList.appendChild(li);

      todoInput.value = "";
    } else {
      alert("Input tidak boleh kosong");
    }
  });

  // Membuat icon Delete menghapus list
  todoList.addEventListener("click", (event) => {
    event.preventDefault();

    //  menghapus element li yang diclick
    if (event.target.classList.contains("delete-todo")) {
      // ? Meyakinkan user apakah li benar2 ingin di hapus?
      if (confirm("Yakin ingin menghapus?")) {
        const parent = event.target.parentElement;

        parent.remove();
      }
    }
  });

  // Membuat Button Clear All berfungsi
  clearTodo.addEventListener("click", () => {
    todoList.innerHTML = "";
  });

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
