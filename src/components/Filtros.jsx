import {useState, useEffect} from 'react'

const Filtros = ({filtro,setFiltro,stock,changeStock}) => {
    

    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Productos</label>
                    <input className='text-input' type='text' autoComplete={false} style={{width:`${100}%`}} value={filtro} onChange={e=>setFiltro(e.target.value)} />
                    {/* <select value={filtro} onChange={e=>setFiltro(e.target.value)}>
                        <option value={""}>-- Todas las Categorias --</option>
                        <option value={"ahorro"}>Ahorro</option>
                        <option value={"comida"}>Comida</option>
                        <option value={"casa"}>Casa</option>
                        <option value={"gastos"}>Gastos Varios</option>
                        <option value={"ocio"}>Ocio</option>
                        <option value={"salud"}>Salud</option>
                        <option value={"suscripciones"}>Suscripciones</option>
                    </select> */}
                </div>
                <div className="campo">
                    <button className={'boton-stock'}
                    style={{backgroundColor:`${stock?'#28a745':'#dc3545'}`}} onClick={e=>changeStock(e,stock)}>{stock?'Stock Normal':'Sin Stock'}</button>
                </div>
            </form>
        </div>
    )
}

export default Filtros
