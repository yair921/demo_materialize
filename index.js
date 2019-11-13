'use strict';

/**********************************
 ******** Métodos Públicos ********
 **********************************/

/**
 * Metodo público que realiza el guardado de un usuario.
 */
function saveForm() {
    let first_name = document.getElementById('first_name');
    let last_name = document.getElementById('last_name');
    let user = document.getElementById('user');
    let password = document.getElementById('password');
    let email = document.getElementById('email');

    let data = { first_name, last_name, user, password, email };
    let validate = validateFields(data);

    if (validate) {
        addToLocalStorage('dataUser', {
            first_name: first_name.value,
            last_name: last_name.value,
            user: user.value,
            password: password.value,
            email: email.value
        });
        alert('Usuario guardado de forma exitosa!');
    }
}


/**********************************
 ******** Métodos Privados ********
 **********************************/

/**
 * Método privado que realiza la validación de completitud
 * al momento de guardar.
 */
function validateFields(params) {
    let fields = Object.keys(params);
    let emptyFields = [];
    fields.forEach(function (field) {
        if (params[field].value === '' || typeof params[field] === 'undefined') {
            emptyFields.push(params[field].name);
        }
    });
    if (emptyFields.length > 0) {
        alert(`Por favor complete los campos faltantes ${JSON.stringify(emptyFields)}`);
        return false;
    }
    return true;
}

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
    return JSON.parse(data);
}