
require('colors');


const mostrarMenu = ( ) => {

  console.clear();

  return new Promise( resolve => {


    console.log('========================='.green);
    console.log('  Seleccione una opcion  '.yellow);
    console.log('========================= \n'.green);

    console.log(`${'1'.green}.- Crear la tarea`);
    console.log(`${'2'.green}.- Listar la tarea`);
    console.log(`${'3'.green}.- Listar Tareas completadas`);
    console.log(`${'4'.green}.- Listar tareas pendientes`);
    console.log(`${'5'.green}.- Completar tareas`);
    console.log(`${'6'.green}.- Borrar una tarea`);
    console.log(`${'0'.green}.- Salir \n`);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readLine.question('Seleccione una opcion: ', (opt) => {
      // console.log({opt});
      readLine.close();
      resolve( opt );
    });
  });
}

  const pausa = () => {

  return new Promise ( resolve => {

      const readLine = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      readLine.question(`\nPresione ${'ENTER'.green} para continuar \n`, (opt) => {
        readLine.close();
        resolve(opt);
      });
    })
  }

module.exports = {
  mostrarMenu,
  pausa
}