const data = {
  name: [],
  author: [],
  catagory: [],
};

let table = document.querySelector("table");
let addBtn = document.querySelector(".add_btn");
let bookName = document.querySelector(".book_name");
let author = document.querySelector(".author");
let catagory = document.querySelector(".catagory");
let checkBox = document.querySelector(".check_box");
addBtn.addEventListener("click", () => {
  if (
    bookName.value &&
    author.value &&
    catagory.value &&
    catagory.value != "Select Catagory"
  ) {
    add();
  }
});
checkBox.addEventListener("click", () => {
  if (checkBox.checked) {
    saveBtn.click();
  }
});
function add() {
  data.name.push(bookName.value);
  data.author.push(author.value);
  data.catagory.push(catagory.options[catagory.selectedIndex].value);
  let tr = document.createElement("tr");
  let tdName = document.createElement("td");
  let tdAuthor = document.createElement("td");
  let tdCatagory = document.createElement("td");
  tdName.innerHTML = bookName.value;
  tdAuthor.innerHTML = author.value;
  tdCatagory.innerHTML = catagory.options[catagory.selectedIndex].value;
  table.appendChild(tr);
  tr.appendChild(tdName);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdCatagory);
  if (checkBox.checked) {
    saveBtn.click();
  }
  bookName.value = "";
  author.value = "";
}
let saveBtn = document.querySelector(".save_btn");
saveBtn.addEventListener("click", () => {
  let dataInStr = JSON.stringify(data);
  localStorage.setItem("userData", dataInStr);
  saveBtn.innerHTML = "Saved";
  saveBtn.style.backgroundColor = "green";
  setTimeout(() => {
    saveBtn.innerHTML = "Save";
    saveBtn.style.backgroundColor = "rgb(37, 150, 255)";
  }, 3000);
});
if (localStorage.length > 0) {
  let savedData = JSON.parse(localStorage.getItem("userData"));
  savedData.name.forEach((n) => {
    data.name.push(n);
  });
  savedData.author.forEach((a) => {
    data.author.push(a);
  });
  savedData.catagory.forEach((c) => {
    data.catagory.push(c);
  });
}
for (i = 0; i < data.name.length; i++) {
  var tableRow = document.createElement("tr");
  let title = document.createAttribute("title");
  title.value = "duble click to delete";
  tableRow.attributes.setNamedItem(title);
  table.appendChild(tableRow);
  for (j = 0; j < 1; j++) {
    let tdName = document.createElement("td");
    let tdAuthor = document.createElement("td");
    let tdCatagory = document.createElement("td");
    tdName.innerHTML = data.name[i];
    tdAuthor.innerHTML = data.author[i];
    tdCatagory.innerHTML = data.catagory[i];
    tableRow.appendChild(tdName);
    tableRow.appendChild(tdAuthor);
    tableRow.appendChild(tdCatagory);
  }
}
let searchVal = document.querySelector(".search_box");
let searchBtn = document.querySelector(".search_btn");
function search() {
  let allTr = document.querySelectorAll("tr");
  for (i = 1; i < allTr.length; i++) {
    let name = allTr[i].children[0].innerHTML || innerText;
    let author = allTr[i].children[1].innerHTML || innerText;
    let catagory = allTr[i].children[2].innerHTML || innerText;
    if (
      name.toUpperCase().indexOf(searchVal.value.toUpperCase()) > -1 ||
      author.toUpperCase().indexOf(searchVal.value.toUpperCase()) > -1 ||
      catagory.toUpperCase().indexOf(searchVal.value.toUpperCase()) > -1
    ) {
      allTr[i].style.display = "table-row";
    } else {
      allTr[i].style.display = "none";
    }
  }
}
searchBtn.addEventListener("click", search);
searchVal.addEventListener("keyup", (event) => {
  let allTr = document.querySelectorAll("tr");
  if (searchVal.value == "") {
    allTr.forEach((tr) => (tr.style.display = "table-row"));
  }
  if (event.keyCode == 13) {
    searchBtn.click();
  }
});

let allTr = document.querySelectorAll("tr");
allTr.forEach((tr) => {
  tr.addEventListener("dblclick", () => {
    let name = tr.children[0].textContent;
    let author = tr.children[1].textContent;
    let catagory = tr.children[2].textContent;
    let indexOfName = data.name.indexOf(name);
    let indexOfAuthor = data.author.indexOf(author);
    let indexOfCatagory = data.catagory.indexOf(catagory);
    data.name.splice(indexOfName, 1);
    data.author.splice(indexOfAuthor, 1);
    data.catagory.splice(indexOfCatagory, 1);
    tr.remove();
    if (checkBox.checked) {
      saveBtn.click();
    }
  });
});
