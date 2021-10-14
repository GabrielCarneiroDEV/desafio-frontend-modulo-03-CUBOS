import InputMask from 'react-input-mask'
export default function Modal(props) {
  return (
    <div className="backdrop" style={
      { display: props.mostrarModal === false ? 'none' : 'flex' }
    }>
      <div className="modal-container" >
        <h1>{props.titulo}</h1>
        <div className="close-icon">
          <img src={props.fechar} alt="" onClick={props.handleModal} />
        </div>
        <div className="container-buttons">
          <button id="credit-button"
            onClick={props.handleMudarBotao}
            className="credit" style={
              { background: props.mudarEntradaSaida === "Saída" ? '#b9b9b9' : 'linear-gradient(91.26deg,#05ede3,#3a9ff1 97.77%)' }}>
            Entrada</button>
          <button id="debit-button"
            onClick={props.handleMudarBotao} style={
              { background: props.mudarEntradaSaida === "Saída" ? 'linear-gradient(91.66deg,#fa8c10,#ff576b 90.32%)' : '#b9b9b9' }} className="debit">
            Saída</button>
        </div>
        <form onSubmit={props.handleSubmit}>
          <div>
            <label>Valor</label>
            <input onChange={e => props.setFormulario({ ...props.formulario, value: e.target.value })} name="value" type="number" value={props.formulario.value} required />
          </div>
          <div>
            <label>Categoria</label>
            <input name="category" maxlength="10" onChange={e => props.setFormulario({ ...props.formulario, category: e.target.value })} value={props.formulario.category} required />
          </div>
          <div>
            <label>Data</label>
            <InputMask mask="99/99/9999" onChange={e => props.setFormulario({ ...props.formulario, date: e.target.value })} required="" value={props.formulario.date} name="date" />
          </div>
          <div>
            <label>Descrição</label>
            <input onChange={e => props.setFormulario({ ...props.formulario, description: e.target.value })} name="description" value={props.formulario.description} required />
          </div>
          <div className="container-btn-insert">
            <button id={props.formulario.id} className="btn-insert">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
