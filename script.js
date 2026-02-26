// const folders = [
//     { id: 1, name: "Javascript", parentId: null },
//     { id: 2, name: "angular", parentId: 1 },
//     { id: 3, name: "css", parentId: 1 }
// ];

let inputName = document.getElementById("inputName");
const btn = document.querySelector(".add");
let display = document.getElementById('display');
btn.addEventListener("click", addItem);

let listElement = document.getElementById('myList');
let folders = JSON.parse(localStorage.getItem('folderSystem')) || [];

function displayListItems() {
    listElement.innerHTML = '';
    folders.forEach(folder => {
        let li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-folder-open" onclick="addNewFolder(${folder.id})"></i> ${folder.name} 
        <span class="icons"><i class="fa-solid fa-folder-plus" onclick="createNewFolder(${folder.id})"></i>
        <i class="fa-solid fa-pen-to-square" onclick="editFolder(${folder.id})"></i>
        <i class="fa-solid fa-trash" onclick="deleteFolder(${folder.id})"></i> </span>`;
        li.setAttribute("data-id", folder.id);
        listElement.appendChild(li);
    });
}
function addItem() {
    const folderName = inputName.value.trim();
    if (folderName !== "") {
        saveListItems(folders);
        displayListItems();
        inputName.value = '';
    }
    createFolder(folderName);
}

function saveListItems(folder) {
    localStorage.setItem('folderSystem', JSON.stringify(folder));
}

function loadData() {
    const stored = localStorage.getItem('folders');
    if (stored) {
        folders = JSON.parse(stored);
    }
}

function createFolder(folderName) {
    folders = JSON.parse(localStorage.getItem('folderSystem')) || [];
    let newFolder = {
        id: Date.now(),
        name: folderName,
        parentId: null
    };
    folders.push(newFolder);
    localStorage.setItem('folderSystem', JSON.stringify(folders));
    displayListItems();
    loadData();
}


function deleteFolder(folderIdDelete) {
    const elem = document.querySelector(`li[data-id="${folderIdDelete}"]`);
    const storedFolders = localStorage.getItem("folderSystem");
    if (storedFolders) {
        let objects = JSON.parse(storedFolders);
        const foundObject = objects.filter((obj) => obj.id !== folderIdDelete);
        localStorage.setItem('folderSystem', JSON.stringify(foundObject));
    }
    if (elem) {
        elem.remove();
    }
}

// function addNewFolder(folderId) {
//     console.log("Using folder ID:", folderId);
// }

function editFolder(folderIdUpdate) {
    const storedFolders = localStorage.getItem("folderSystem");
    if (storedFolders) {
        let objects = JSON.parse(storedFolders);
        const foundObject = objects.find((obj) => obj.id === folderIdUpdate);
        if (foundObject) {
            let editVal = prompt("Update the Folder Name", foundObject.name);
            console.log(editVal);
            if (editVal != null && editVal !== "") {
                foundObject.name = editVal;
                console.log(foundObject);
            }
        }
        localStorage.setItem('folderSystem', JSON.stringify(foundObject));
    }
}

window.onload = displayListItems;
