

export default function Tabela(props) {

   
   


  return (
    <div className="table">
      <div className="table-head">
        <div className="column-title btn-data"  onClick={props.ordenarPorData}>
          <span>Data</span>
          {
            props.displaySeta.data &&
            <img src={props.seta} alt=""/>
          }
        </div>
        <div className="column-title btn-dia" onClick={ props.ordenarPorDia}>
          <span>Dia da semana</span>
          {
            props.displaySeta.dia &&
            <img src={props.seta} alt=""/>
          }
        </div>
        <div className="column-title">
          <span>Descrição</span>
        </div>
        <div className="column-title">
          <span>Categoria</span>
        </div>
        <div className="column-title btn-valor" onClick={props.ordenarPorValor}>
          <span>Valor</span>
          {
            props.displaySeta.valor &&
            <img src={props.seta} alt=""/>
          }
        </div>

        <div className="column-title">
          <span> </span>
        </div>
      </div>
      <div className="table-body">

        {props.transacoes.map((transacao, index) => (

          // {new Date(transacao.date).toLocaleString('pt-br', {year: 'numeric', month: 'long', day: 'numeric'})}

          <div className="table-line" key={index}>
            <span className="line-items line-items-bold">{new Date(transacao.date).toLocaleString().split(' ')[0]}</span>
            <span className="line-items">{new Date(transacao.date).toLocaleString('pt-br', { weekday: 'long' })}</span>
            <span className="line-items">{transacao.description}</span>
            <span className="line-items">{transacao.category.toLowerCase().trim()}</span>
            <span className={`line-items ${transacao.type === 'credit' ? 'in-tabela' :'out-tabela'}`}>{`${transacao.type === 'credit'? '' : '-'}${Number(transacao.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</span>
            <div className="line-items delete-edit-buttons">

              <img src={props.caneta} alt="" id={index} className="edit-icon" onClick={props.handleEditarTransacao}
              
              // {props.setFormulario(props.formulario[index])}}
              
              // props.setMostrarModal(props.mostrarModal === false ? true : false)} 
              />
              <img src={props.lixeira} alt="" className="delete-icon" id={index} onClick={(e) => props.setDeleteConfirm(Number(e.target.id))}
              
              />

              {props.deleteConfirm ===index &&
                <div className={`container-confirm-delete`} >

                  <span>Apagar item?</span>
                  <div className="btn-actions-confirm-delete">
                    <button className="btn-blue" id={transacao.id} onClick={(event) => props.handleDeletarTransacao(event)}>Sim</button>
                    <button className="btn-red" onClick={() => props.setDeleteConfirm(-1)}>Não</button>
                  </div>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}