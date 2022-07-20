import { useState,useEffect } from 'react'
import CerrarBtn from './../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('casa')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(Number(gastoEditar.cantidad))
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[gastoEditar])

    const OcultarModal=()=>{
        setNombre('')
        setCantidad(0)
        setCategoria('')
        setAnimarModal(false)

        setTimeout(()=>{
            setModal(false)
            setGastoEditar({})
        },500)
    }

    const handleSubmit = e =>{
        e.preventDefault();
        setCategoria('casa')
        if([nombre, categoria].includes('')){
            setMensaje('Fallo la validación')

            setTimeout(()=>{
                setMensaje('')
            },3000)

            return;
        }
        
        guardarGasto({nombre,cantidad,categoria,id,fecha})
        setNombre('')
        setCantidad(0)
        setCategoria('')
        OcultarModal()
    }

    return (
    <div className="modal">
        <div style={{marginLeft:`${90}%`,width:20,height:20,marginTop:20,cursor:'pointer'}}>
            <img
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={OcultarModal}
            />
        </div>

        <form 
            style={{paddingLeft:20,paddingRight:20}}
            onSubmit={handleSubmit} 
            className={`formulario ${animarModal?"animar":'cerrar'}`}>
            <legend>{gastoEditar.nombre?"Editar Producto":"Nuevo Producto"}</legend>
            {mensaje && <Mensaje tipo="error">
                            {mensaje}
                        </Mensaje>}
            <div className='campo'>
                <label htmlFor="nombre">Nombre Producto</label>

                <input 
                    id="nombre"
                    type={"text"}
                    placeholder='Añade el Nombre del Producto'
                    autoComplete="off"
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className='campo' style={{display:'none'}}>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id="cantidad"
                    type={"number"}
                    value={cantidad}
                    placeholder='Añade La cantidad del gasto: ej. 300'
                    onChange={e=>setCantidad(Number(e.target.value))}
                />
            </div>
            <div className='campo' style={{display:'none'}}>
                <label htmlFor="categoria">Categoria</label>

                <select
                    id="categoria"
                    value={categoria}
                    onChange={e=>setCategoria(e.target.value)}
                >
                    <option value={""}>-- Seleccione --</option>
                    <option value={"ahorro"}>Ahorro</option>
                    <option value={"comida"}>Comida</option>
                    <option value={"casa"}>Casa</option>
                    <option value={"gastos"}>Gastos Varios</option>
                    <option value={"ocio"}>Ocio</option>
                    <option value={"salud"}>Salud</option>
                    <option value={"suscripciones"}>Suscripciones</option>
                </select>
            </div>

            <input 
                type={"submit"}
                value={gastoEditar.nombre?"Editar Producto":"Añadir Producto"}
            />

        </form>
    </div>
    )
}

export default Modal
