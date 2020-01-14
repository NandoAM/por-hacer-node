const fs = require('fs');

let listadoTareasPendientes = [];

const crear = (descripcion) => {
    
    cargarDB();
    
    let tareaPendiente = {
        descripcion,
        completado : false
    };

    listadoTareasPendientes.push(tareaPendiente);

    guardarDB();

    return tareaPendiente;
}

const getTareas = () => {

    cargarDB();
    return listadoTareasPendientes;

}

const guardarDB = () => {
    
    let data = JSON.stringify(listadoTareasPendientes);
    
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error ('No se puedo grabar');
    });

}

const cargarDB = () => {

    try {
    
        listadoTareasPendientes = require('../db/data.json');
        
    } catch (error) {
        
        listadoTareasPendientes = [];
    }    

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoTareasPendientes.findIndex( tarea => tarea.descripcion === descripcion);

    if(index >= 0){
        listadoTareasPendientes[index].completado=completado;
        guardarDB();
        return true;
    }else{
        return false;
    }        

}

const borrar = (descripcion) => {

    cargarDB();

    /* opcion 1
    let index = listadoTareasPendientes.findIndex( tarea => tarea.descripcion === descripcion);

    if(index >= 0){
        listadoTareasPendientes.splice(index);
        guardarDB();
        return true;
    }else{
        return false;
    } */

    //opción 2
    let listadoAux = listadoTareasPendientes.filter( tarea => tarea.descripcion!==descripcion );

    if(listadoAux.length !== listadoTareasPendientes.length){
        listadoTareasPendientes = listadoAux;
        guardarDB();
        return true;
    }else{
        return false;
    }

}

module.exports = { crear , getTareas, actualizar, borrar};