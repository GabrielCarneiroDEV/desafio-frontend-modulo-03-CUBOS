export default function Aside(props){   
  

    return(
    <aside>
          <div className="container-resume">
            <h2>Resumo</h2>
            <div className="saidas">
              <span>Entradas</span>
              
              <span className="in">{props.entradas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
              
            </div>
            <div className="saidas">
              <span>Saídas</span>
              
              <span className="out">{props.saidas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
              
            </div>
            <div className="saldo">
            
              <span>Saldo</span>
              <span className="balance">{props.saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
          </div>
          <button className="btn-add" onClick={props.handleModal}>Adicionar Registro</button>
        </aside>
    )

}