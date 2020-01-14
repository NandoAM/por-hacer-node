const argv =  require('./config/yargs').argv;
const tareas = require('./tareas/tareas');
const colors = require('colors');

let comando = argv._[0];

switch (comando){

    case 'crear':
        let tarea = tareas.crear(argv.descripcion);
        console.log(tarea);
    break;
    
    case 'listar':
        let listaTareas = tareas.getTareas();

        for (let tarea of listaTareas){
            console.log('======Tareas pendientes========='.green);
            console.log(tarea.descripcion);
            console.log(`Estado: ${tarea.completado}`);
            console.log('==============================='.green);
        }
        
    break;        

    case 'actualizar':        
        let actualizar = tareas.actualizar(argv.descripcion, argv.completado);
        console.log(`Elemento actualizado: ${actualizar}`);
    break;
    
    case 'borrar':        
        let borrar = tareas.borrar(argv.descripcion);
        console.log(`Elemento borrado: ${borrar}`);
    break;

    default:
        console.log('Comando incorrecto')

}

