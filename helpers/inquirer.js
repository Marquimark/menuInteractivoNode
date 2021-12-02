const tareas  = require('../models/tareas');
const inquirer = require('inquirer');
const { green } = require('colors');

require('colors');


const preguntas = [
  {
    type    : 'list',
    name    : 'opcion',
    message : 'Que desesa hacer?',
    choices : [
      {
        value : '1',
        name  : `${'1'.green}.- Crear tarea`
      },
      {
        value: '2',
        name: `${'2'.green}.- Listar Tareas`
      },
      {
        value : '3',
        name: `${'3'.green}.- Listar Tareas completadas`
      },
      {
        value: '4',
        name: `${'4'.green}.- Listar Tareas pendientes`
      },
      {
        value: '5',
        name : `${'5'.green}.- Completar Tareas`
      },
      {
        value: '6',
        name: `${'6'.green}.- Borrar tarea`
      }, {
        value: '0',
        name: `${'0'.green}.- Salir`
      }
    ]
  }
];

const menuInquirer = async () => {

  console.clear();
  console.log('========================='.green);
  console.log('  Seleccione una opcion'.white);
  console.log('========================= \n'.green);

  const   { opcion } = await inquirer.prompt(preguntas);
  return opcion;

}

const pausa = async () => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.yellow} para continuar`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question);
}


const leerInput = async ( message ) => {
  const question = [
    {
      type  : 'input',
      name  : 'desc',
      message,
      validate( value ) {
        if ( value.length === 0 ) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;

}

const menuEliminacion = async ( tareas = [] ) => {
  const choices = tareas.map((elemento, idx) => {

    const indx = `${ idx + 1}`.green;

    let { id, desc } = elemento;

    return {
      value: id,
      name : `${indx} ${desc}`
    }
  });

  choices.unshift({
    value: '0',
    name : '0.'.green + ' Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Que tarea quieres eliminar ? ',
      choices
   }
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
}

const confirmar = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
   }
  ];

  console.log('\n');
  const { ok } = await inquirer.prompt(question);
  return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

  const choices = tareas.map((tarea, idx) => {

    const indx = `${idx + 1}`.green;

    let { id, desc } = tarea;

    return {
      value: id,
      name: `${indx} ${desc}`,
      checked: ( tarea.completado ) ? true : false
    }
  });

  const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Slecciones',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(preguntas);
  return ids;
}


module.exports = {
  menuInquirer,
  pausa,
  leerInput,
  menuEliminacion,
  confirmar,
  mostrarListadoCheckList
}