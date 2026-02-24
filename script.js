// const folders = [
//     { id: 1, name: "Javascript", parentId: null },
//     { id: 2, name: "angular", parentId: 1 },
//     { id: 3, name: "css", parentId: 1 }
// ];

let folderSystem2 = [];
let inputName = document.getElementById("inputName");
const btn = document.querySelector(".add");
let display = document.getElementById('display');
btn.addEventListener("click", addItem);

let folderSystem = JSON.parse(localStorage.getItem('folderSystem')) || [];
let listElement = document.getElementById('myList');

function displayListItems() {
    listElement.innerHTML = '';
    folderSystem.forEach(folder => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-folder-open"></i> ${folder} 
        <span class="icons"><i class="fa-solid fa-folder-plus" onclick="addSubFolder()"></i>
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i> </span>`;
        listElement.appendChild(li);
    });
}

function addItem() {
    let input = document.getElementById("inputName");
    const newItem = input.value.trim();

    if (newItem) {
        folderSystem.push(newItem);
        saveListItems(folderSystem);
        displayListItems();
        input.value = '';
    }
    createFolder(newItem);
}
function saveListItems(folder) {
    localStorage.setItem('folderSystem', JSON.stringify(folder));
}

function loadData() {
    const stored = localStorage.getItem('folders');
    if (stored) {
        folderSystem2 = JSON.parse(stored);
    }
}

function createFolder(newItem) {
    const folderName = newItem;
    const newFolder = {
        id: Date.now(),
        name: folderName,
        parentId: null
    }
    let folders = JSON.parse(localStorage.getItem('folderSystem2')) || [];
    folders.push(newFolder);
    localStorage.setItem('folderSystem2', JSON.stringify(folders));
    loadData();
}
window.onload = displayListItems;

let folders = JSON.parse(localStorage.getItem('folderSystem2')) || [];
let id = [];
for(let i = 0; i < folders.length; i++){
    
}
function addSubFolder(id) {
    console.log(id);
}

