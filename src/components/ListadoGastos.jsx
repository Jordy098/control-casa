import Gasto from "./Gasto"

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
  guardarGasto,
  stock
}) => {
  return (
    <div className='listado-gastos contenedor'>
        {
          filtro?(
            <>
              <h2>{gastosFiltrados.length ? 'Productos':'No hay productos en esta categoria'}</h2>
              {
                gastosFiltrados.map(gasto=>{
                  return <Gasto
                              key={gasto.id}
                              gasto={gasto}
                              setGastoEditar={setGastoEditar}
                              eliminarGasto={eliminarGasto}
                              guardarGasto={guardarGasto}
                          />
                })
              }
            </>
          )
          :(
            <>
            <h2>{gastos.length ? 'Productos':'No hay productos aún'}</h2>
              {
                gastos.filter(gasto=>stock?gasto:gasto.cantidad==0).map(gasto=>{
                  return <Gasto
                              key={gasto.id}
                              gasto={gasto}
                              setGastoEditar={setGastoEditar}
                              eliminarGasto={eliminarGasto}
                              guardarGasto={guardarGasto}
                          />
                })
              }
            </>
          )
        }
    </div>
  )
}

export default ListadoGastos
