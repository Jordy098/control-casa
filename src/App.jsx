import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarId} from './helpers/index'


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')):[]
  )

  const [presupuesto, setPresupuesto]=useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(true)

  const [modal, setModal]=useState(false)
  const [animarModal, setAnimarModal]=useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  const [stock, setStock] = useState(true)


  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setModal(true)
  
      setTimeout(()=>{
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  useEffect(()=>{
    console.log(presupuesto)
    localStorage.setItem('presupuesto',presupuesto ?? 0)
    
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos])

  useEffect(()=>{
    if(filtro){
      const gastosFiltrados=gastos.filter( gasto => gasto.nombre.toLocaleUpperCase().includes(filtro.toLocaleUpperCase()))

      setGastosFiltrados(gastosFiltrados)
    }else{
      setFiltro('')
      setGastosFiltrados([])
    }
  },[filtro])

  useEffect(()=>{
    const presupuestoLS=Number(localStorage.getItem('presupuesto'))??0
    presupuestoLS>0 && setIsValidPresupuesto(true)
  },[])

  const changeStock=(e,state)=>{
    e.preventDefault()
    setStock(!state)
  }

  const handleNuevoGasto=()=>{
    setModal(true)
    // setGastoEditar({})

    setTimeout(()=>{
      setAnimarModal(true)
    },500)
  }

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState=>gastoState.id===
      gasto.id?gasto:gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    }else{
      gasto.id=generarId()
      gasto.fecha=new Date()
      
      setGastos([...gastos,gasto])
      setGastoEditar({})
    }
  }

  const eliminarGasto=id=>{
    setGastos(gastos.filter(gastoState=>gastoState.id!==id))
  }

  return (
    <div className={modal ? 'fijar':''}>
      {/* <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        filtro={filtro}
        gastosFiltrados={gastosFiltrados}
      /> */}

      {isValidPresupuesto && (
        <>
        <header>
          <h1>Inventario Casa</h1>
          <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
            stock={stock}
            changeStock={changeStock}
          />
          <br></br>
        </header>
        <main>
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            handleNuevoGasto={handleNuevoGasto}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
            guardarGasto={guardarGasto}
            stock={stock}
          />
        </main>
        <div className='nuevo-gasto'>
          <img 
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}

      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}
      </div>
  )
}

export default App
