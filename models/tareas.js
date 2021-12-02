const Tarea = require('./tarea');
const inquirer = require('inquirer');

class Tareas {

  _listado  = {}

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray( tareas = []){

    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    })
  }

  get listadoArr() {
    const listado = [];

    Object.keys( this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push( tarea );
    })
    return listado;
  }

  crearTarea( desc = ''){
    const tarea = new Tarea(desc);
    // const provisional = Object.keys(this._listado);reemplazdo por el getter
    this._listado[tarea.id] = tarea;
    // this._listado[tarea.id] = provisional; reemplazdo por el getter

  };

  listadoCompletado () {

    console.log();

    console.log();
    this.listadoArr.forEach((tarea, i) => {

      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn)
        ? 'Completada'.green
        : 'Pendiente'.red;

      console.log(`${idx} ${desc} :: ${estado}`);

    });

      // this.listadoArr.forEach( (tareas, index)  =>{
      //   const { desc, completado } = tareas;
      //   const idx = `${index + 1}`.green;

      //   if (completado === null ) {
      //     console.log( idx, `- ${desc} :: COMPLETADO`.green);
      //   }else{
      //     console.log( idx, `- ${desc} :: PENDIENTE`.red);
      //   };
      // });

  };

  listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach((tareas) => {

          const { desc, completado } = tareas;

          const estado = ( completado )
                              ? 'Completada'.green
                              : 'Pendiente'.red;


          if (completadas) {
            // mostrar completadas
            if (completado) {
              contador += 1;
              console.log(`${(contador + '.').green} ${desc} :: ${completado.green}`);
            }
          } else {
            // mostrar pendientes
            if (!completado) {
              contador += 1;
              console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
            }
          }

  //         if (completado === null && completadas === true) {
  //           contador += 1;
  //           console.log( `${contador.toString().green} - ${desc} ${':: COMPLETADO'.green}`);
  //         } else if (completado !== null && completadas === false) {
  //           contador += 1;
  //           console.log(`${contador.toString().green} - ${desc} ${':: PENDIENTE'.red}`);
  //         }
   });
  }

  borrarTarea (id = '') {

    if( this._listado[id]){
      delete this._listado[id];
    }
  }

  completarTareas( ids = []) {

    ids.forEach ( id => {

      const tarea = this._listado[id];
      !tarea.completado ? tarea.completado = new Date().toISOString(): true;
      // console.log( tarea );
    });

    this.listadoArr.forEach( tarea => {

      if (!ids.includes(tarea.id)) {
        // this._listado[id].completado = null;
        this._listado[tarea.id].completado = null;
      }
    });


    // let miArray = this.listadoArr;
    // const arrayCompletado = miArray.forEach( (elemento, indx ) => {
    //   const { id, completado } = elemento;
    //   // console.log( id, completado);
    //   if( id === ids[indx]){
    //     console.log( 'solo id', id, ids[indx]);
    //     miArray.completado = null;
    //   }

    // });
    // console.log( miArray.completado);

  }

}

module.exports = Tareas;