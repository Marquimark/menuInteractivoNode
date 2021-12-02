require('colors');
const { guardarDB, leerDB }  = require('./helpers/guardarArchivo');
const { menuInquirer,
               pausa,
               leerInput,
               menuEliminacion,
               confirmar,
               mostrarListadoCheckList
} = require('./helpers/inquirer');

const  Tareas   = require('./models/tareas');

const main = async () => {
  let  opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if( tareasDB ){
    //Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }
  do{
    opt = await menuInquirer();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion:');
        tareas.crearTarea( desc );
      break;
      case '2':
         tareas.listadoCompletado();
        // console.log(tareas.listadoArr);
      break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.completarTareas( ids );
        // console.log( ids);
        break;
      case '6':
        const id = await menuEliminacion(tareas.listadoArr);
        if ( id !== '0'){
          const ok =  await confirmar('Estas Seguro ? ');
          if ( ok ){
            tareas.borrarTarea(id);
            console.log('Tareas borrada');
          }
        };
        break;
    }
    // if ( opt !== '0') await pausa();

    guardarDB(tareas.listadoArr);

    await pausa();

  }while( opt !== '0');
}

main();