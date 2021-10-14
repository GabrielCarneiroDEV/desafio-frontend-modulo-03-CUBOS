

export default function Filters(props) {


    let categoriasFiltradas = []

    function filtrarCategoria() {
        if (props.transacoes.length !== []) {

            props.transacoes.forEach((x, index) => {

                if (!categoriasFiltradas.includes(x.category.toLowerCase().trim())) {
                    categoriasFiltradas.push(x.category.toLowerCase().trim())
                }

            })

        }

    }
    filtrarCategoria()
    return (

        
            <form className="container-filters" onSubmit={(props.handleSubmitFiltrar)} style={
            { display: props.mostrarFiltro === false ? 'none' : 'flex' }
        }>
                <div className="filter-dia filter">

                    <span className="filter-title">Dia da semana</span>
                    <div className={`container-chips`}>
                        {props.dias.map(dia =>
                            <button key={Math.random()} className={`chip ${props.filtrarDia.includes(dia) ? 'filtro-selecionado' : ''}`}
                            onClick={()=>{
                                if(props.filtrarDia.includes(dia)){
                                    props.setFiltrarDia(props.filtrarDia.filter(x => x !== dia))
                                    props.setAtualizarFiltro(!props.atualizarFiltro)
                                    return;
                                }
                                props.setFiltrarDia([...props.filtrarDia, dia])
                                props.setAtualizarFiltro(!props.atualizarFiltro)



                            }}>
                                {dia}
                                <img src={`${props.filtrarDia.includes(dia) ? props.closeChip : props.iconeMais}`}  alt="" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="filter-dia filter">
                    <span className="filter-title categoria">Categoria</span>
                    <div className="container-chips">
                        {categoriasFiltradas.map(categoria =>
                            <button key={Math.random()} className={`chip ${props.filtrarCategoria.includes(categoria) ? 'filtro-selecionado' : ''}`}   onClick={()=>{
                                if(props.filtrarCategoria.includes(categoria)){
                                    props.setFiltrarCategoria(props.filtrarCategoria.filter(x => x !== categoria))
                                    props.setAtualizarFiltro(!props.atualizarFiltro)
                                    return;
                                }
                                props.setFiltrarCategoria([...props.filtrarCategoria, categoria])



                            }}>
                                {categoria}
                                <img src={`${props.filtrarCategoria.includes(categoria) ? props.closeChip : props.iconeMais}`} alt="" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="filter-dia filter">
                    <span className="filter-title">Valor</span>
                    <div className="container-inputs">
                        <span>min.</span>
                        <input className="filter-input" type="number" value={props.filtrar.min} onChange={(e) => {
                            props.setFiltrar({ ...props.filtrar, min: e.target.value })
                            props.setAtualizarFiltro(!props.atualizarFiltro)
                        }
                        } />
                        <span>max.</span>
                        <input value={props.filtrar.max} className="filter-input" type="number" onChange={(e) => {
                            props.setFiltrar({ ...props.filtrar, max: e.target.value })
                            props.setAtualizarFiltro(!props.atualizarFiltro)
                        }} />
                    </div>
                </div>
                <div className="buttons-filter">
                    <button className="btn-clear-filters" onClick={props.handleSubmitLimparFiltros}>Limpar Filtros</button>
                    <button className="btn-apply-filters" onClick={props.handleSubmitFiltrar}>Aplicar Filtros</button>
                </div>
            </form>
    

    )
}

