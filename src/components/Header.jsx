import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    filtro,
    gastosFiltrados,
}) => {
  return (
    <header>
        <h1>Inventario Casa</h1>

        {isValidPresupuesto ? (
            <ControlPresupuesto
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        ):(
            <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )}
        
    </header>
  )
}

export default Header
