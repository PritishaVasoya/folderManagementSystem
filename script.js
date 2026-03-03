let inputName = document.getElementById("inputName");
const btn = document.querySelector(".add");
const display = document.getElementById("display");
btn.addEventListener("click", addItem);
let listElement = document.getElementById('myList');
let folders = JSON.parse(localStorage.getItem('folderSystem')) || [];
localStorage.setItem('folderSystem', JSON.stringify(folders));

//Show folders In Tree View Structure
function showWithHierarchy() {
    const folders = JSON.parse(localStorage.getItem('folderSystem')) || [];
    const appContainer = document.getElementById('display');
    appContainer.innerHTML = '';
    displayListItems(folders, null, appContainer);
}

//Display New Folders
function displayListItems(folders, parentid, container) {
    let children = folders.filter(item => item.parentId === parentid);
    if (children.length === 0) return;

    const ul = document.createElement("ul");
    children.forEach(folder => {
        let li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-folder-open" onclick="hiddenAndShow(${folder.id})"></i> <p id="newName">${folder.name}</p> 
        <span class="icons"><i class="fa-solid fa-folder-plus" onclick="addSubFolder(${folder.id})"></i>
        <i class="fa-solid fa-pen-to-square" onclick="editFolder(${folder.id})"></i>
        <i class="fa-solid fa-trash" onclick="deleteFolder(${folder.id})"></i> </span>`;
        li.setAttribute("data-id", folder.id);
        displayListItems(folders, folder.id, li);
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

//Add New Folders
function addItem() {
    const folderName = inputName.value.trim();
    if (inputName.value.trim() === '') {
        alert("Please enter a value in input field.");
    } else {
        showWithHierarchy();
        inputName.value = '';
    }
    createFolder(folderName);
}

//Create new folders
function createFolder(folderName, parentFolderId) {
    folders = JSON.parse(localStorage.getItem('folderSystem')) || [];
    let newFolder = {
        id: Date.now(),
        name: folderName,
        parentId: null
    };

    if (parentFolderId) {
        newFolder.parentId = parentFolderId;
    } else {
        newFolder.parentId = null
    }

    folders.push(newFolder);
    localStorage.setItem('folderSystem', JSON.stringify(folders));
    showWithHierarchy();
}


//Delete Folders
function deleteFolder(folderIdDelete) {
    const getSubFolderId = (items, id) => {
        let ids = [id];
        let elem = document.querySelector(`li[data-id="${ids}"]`);
        if (elem) {
            elem.remove();
        }
        items.forEach(item => {
            if (item.id && item.parentId === id) {
                ids = [...ids, ...getSubFolderId(items, item.id)];
            }
        });
        return ids;
    };

    const storedFolders = localStorage.getItem("folderSystem");
    if (storedFolders) {
        let objects = JSON.parse(storedFolders);
        const deleteAll = getSubFolderId(objects, folderIdDelete);
        const updatedObjects = objects.filter(obj => !deleteAll.includes(obj.id));
        localStorage.setItem('folderSystem', JSON.stringify(updatedObjects));
    }
}


//Edit Folders
function editFolder(folderIdUpdate) {
    let elem = document.querySelector(`li[data-id="${folderIdUpdate}"]`);
    const storedFolders = localStorage.getItem("folderSystem");
    let objects = storedFolders ? JSON.parse(storedFolders) : [];
    
    const foundObject = objects.find((obj) => obj.id === folderIdUpdate);
    if (foundObject) {
        let editVal = prompt("Update the Folder Name", foundObject.name);
        if (editVal != null && editVal !== "") {
            foundObject.name = editVal;
            localStorage.setItem("folderSystem", JSON.stringify(objects));
            if (elem) {
                elem.querySelector("p").textContent = foundObject.name;
            }
        }
    }
}


//Add SubFolders in Parent Folder
function addSubFolder(folderIdNew) {
    const storedFolders = localStorage.getItem("folderSystem");
    let objects = storedFolders ? JSON.parse(storedFolders) : [];
    const foundObject = objects.find((obj) => obj.id === folderIdNew);

    if (foundObject) {
        let subFolder = prompt("Add the Sub Folder");
        if (subFolder != null && subFolder !== "") {
            const parentId = foundObject.id;
            createFolder(subFolder, parentId);
        }
    }
}


//Hidden And Show SubFolders
function hiddenAndShow(folderIdForHierarchy) {
    const getSubFolderId = (items, id) => {
        let ids = [id];
        items.forEach(item => {
            if (item.id && item.parentId === id) {
                ids = [...ids, ...getSubFolderId(items, item.id)];
            }
        });
        return ids;
    };

    const storedFolders = localStorage.getItem("folderSystem");
    if (storedFolders) {
        let objects = JSON.parse(storedFolders);
        const showAll = getSubFolderId(objects, folderIdForHierarchy);
        const updatedObjects = objects.filter(obj => showAll.includes(obj.parentId));
        for (let i in updatedObjects) {
            let elem = document.querySelector(`li[data-id="${updatedObjects[i].id}"]`);
            if (elem.style.display === "none") {
                elem.style.display = "flex";
            } else {
                elem.style.display = "none";
            }
        }
        localStorage.setItem('folderSystem', JSON.stringify(objects));
    }
}

window.onload = showWithHierarchy;
