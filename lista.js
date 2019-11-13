'use strict';

/**********************************
 ******** Métodos Públicos ********
 **********************************/

function listUsers() {
    let users = getLocalStorage('dataUser');
    if (users.length === 0) {
        return;
    }
    let tblBody = document.getElementById('tblBody');

    users.forEach(user => {
        let row = document.createElement('tr');
        let tblTdName = document.createElement('td');
        let tblTdLastName = document.createElement('td');
        let tblTdUser = document.createElement('td');
        let tblTdEmail = document.createElement('td');
        let tblTdDelete = document.createElement('td');

        tblTdName.innerHTML = user.first_name;
        tblTdLastName.innerHTML = user.last_name;
        tblTdUser.innerHTML = user.user;
        tblTdEmail.innerHTML = user.email;
        tblTdDelete.innerHTML = `<button class="btn waves-effect waves-light red lighten-2" onclick="deleteUser('${user.email}')">Eliminar</button>`;

        row.appendChild(tblTdName);
        row.appendChild(tblTdLastName);
        row.appendChild(tblTdUser);
        row.appendChild(tblTdEmail);
        row.appendChild(tblTdDelete);

        tblBody.appendChild(row);
    });
}


/**********************************
 ******** Métodos Privados ********
 **********************************/

/**
 * Método que realiza el guardado en el localStorage del explorador.
 * @param {string} key : Llave con el que será almacenada la información en local storage.
 * @param {object} data : objeto que será almacenado en el local storage.
 * 
 * return: void.
 */
function addToLocalStorage(key, data) {
    let dataStorage = getLocalStorage(key);
    let newData = new Array();
    if (dataStorage) {
        newData = [
            ...dataStorage,
            data
        ];
    } else {
        newData.push(data);
    }
    localStorage.setItem(key, JSON.stringify(newData));
}

/**
 * Método que obtiene un objeto almacenado en el localstorage.
 * @param {string} key : Llave del objeto que se desea obtener.
 * 
 * return : object
 */
function getLocalStorage(key) {
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

function deleteUser(email) {
    let confirmDelete = confirm(`Confirma que desea eliminar el usuario ${email}`);
    if (!confirmDelete)
        return;
    let userData = getLocalStorage('dataUser');
    if (userData.length > 0) {
        let newData = userData.filter(function (user) {
            return user.email !== email;
        });
        localStorage.clear();
        newData.forEach(function (user) {
            addToLocalStorage('dataUser', user);
        });
        window.location.reload();
    }
}

listUsers();