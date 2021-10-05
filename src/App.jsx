import React from 'react';
import  {nanoid}  from 'nanoid';


function App() {

const [tarea, setTarea] = React.useState(' ')
const [tareas, setTareas] = React.useState([])
const [modoEdicion, setModoEdicion] = React.useState(false)
const [id, setId] = React.useState('')
const [error, setError] = React.useState(null)



const agregarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Elemento vacio')
    setError('Ingrese una tarea por favor...')
    return
  }
  console.log(tarea)

setTareas([
  ...tareas,
  {id: nanoid(10), nombreTarea: tarea}
])

  setTarea('') //limpia el formulario
  setError(' ')
}

const btnEliminar = id => {
  //console.log(id)
  const arrayFiltrado = tareas.filter(item => item.id !== id ) //la funciona array filtrado lo que hace es filtrar todos los id que sean distintos a los id que le estoy mandando. 
  setTareas(arrayFiltrado)
}

const btnEditar = item => {
  //console.log(item)
  setModoEdicion(true)
  setTarea (item.nombreTarea)
  setId(item.id)
}

const editarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('Elemento vacio')
    setError('Ingrese una tarea por favor...')
    return
}

const arrayEditado = tareas.map(item=> item.id === id ? {id, nombreTarea:tarea} : item)

setTareas(arrayEditado)
setModoEdicion(false)
setTarea (' ')
setId(' ')
setError(' ')
}

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de super</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">contador</h4>
          <ul className="list-group"> 
          {
            tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (

            tareas.map(item => (
              <li className="list-group-item" key={item.id}>
                <span className="lead">{item.nombreTarea}</span>

                <button 
                className="btn btn-danger btn-sm float-end mx-2" onClick={() => btnEliminar(item.id)}>Eliminar
                </button>

                <button 
                className="btn btn-warning btn-sm float-end" onClick={() => btnEditar(item)}>Editar
                </button>
              </li>
            ))
            )
          }
          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">
          {
            modoEdicion ? 'Editar Tarea' : 'Agregar tarea' //operador ternario o if. 
          }
        </h4>
          <form onSubmit={modoEdicion? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input type="text" className="form-control mb-2" onChange={ e => setTarea(e.target.value) } value={tarea} placeholder="Ingrese una tarea"/>
            {
              modoEdicion ? ( //abrimos parentesis porque no estoy devolviendo un string
                <button className="btn btn-warning w-100" type="submit">Editar</button>
              ) : (    
                <button className="btn btn-dark w-100" type="submit">Agregar</button>  
              )
            }
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

//dentro del ul que empieza en la linea 62 se pintan las tareas. 