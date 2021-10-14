import './App.css';
import Filters from './components/Filters'
import Tabela from './components/Tabela'
import Modal from './components/Modal'
import Aside from './components/Aside'
import logo from './assets/logo.svg'
import filtro from './assets/filtro.svg'
import iconeMais from './assets/icone-mais.svg'
import fechar from './assets/fechar.svg'
import caneta from './assets/caneta.svg'
import lixeira from './assets/lixeira.svg'
import closeChip from './assets/close-chip.svg'
import setaCima from './assets/seta-cima.svg'
import setaBaixo from './assets/seta-baixo.svg'
import { useEffect, useState } from 'react';





const dias = ["domingo", "quinta", "segunda", "sexta", "terça", "sábado", "quarta"];


function App() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(-1);
  const [filtrar, setFiltrar] = useState({ min: 0, max: 0 })
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [mudarEntradaSaida, setMudarEntradaSaida] = useState("Saída");
  const [atualizarFiltro, setAtualizarFiltro] = useState(false)
  const [filtrarDia, setFiltrarDia] = useState([])
  const [filtrarCategoria, setFiltrarCategoria] = useState([])
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [transacoes, setTransacoes] = useState([])
  const [seta, setSeta] = useState()
  const [displaySeta, setDisplaySeta] = useState({data :false, dia:false, valor:false})


  const [ordenar, setOrdenar] = useState(0)

  const [formulario, setFormulario] = useState({ value: 0, category: "", date: "", description: "", week_day: "", id: 0 })

  //GET
  useEffect(() => {

    async function carregarTransacoes() {
      try {
        const response = await fetch('http://localhost:3333/transactions', {
          method: 'GET'
        });
        const data = await response.json()

        setTransacoes(data)

      } catch (error) {

        console.log(error.message)
      }

    }

    carregarTransacoes();
  }, [formulario, atualizarFiltro])



  //POST
  async function handleRegistrarTransacao(dados) {

    try {

      const response = await fetch('http://localhost:3333/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })
      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.log(error.message)
    }

  }

  //DELETE
  async function handleDeletarTransacao(event) {

    try {
      const response = await fetch(`http://localhost:3333/transactions/${event.target.id}`, {
        method: 'DELETE',
      })

      const responseData = await response.json()
      setFormulario({ value: 0, category: "", date: "", description: "", week_day: "", id: 0 })
      setDeleteConfirm(-1)
      console.log(responseData)
    } catch (error) {
      console.log(error.message)
    }

  }

  //PUT
  async function handleRegistrarEdicao(dados) {
   
    try {

      const response = await fetch(`http://localhost:3333/transactions/${dados.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })
      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.log(error.message)
    }

  }

  //ABRIR MODAL
  function handleModalEditar(e) {

    setFormulario({ value: 0, category: "", date: "", description: "", week_day: "", id: Number(e.target.id) })
    setMostrarModalEditar(mostrarModalEditar === false ? true : false);
  }

  function handleModal() {
    setFormulario({ value: 0, category: "", date: "", description: "", week_day: "", id: 0 })
    setMostrarModal(mostrarModal === false ? true : false);
  }


  //MOSTRAR FILTROS
  function handleMostrarFiltros() {
    setMostrarFiltro(mostrarFiltro === false ? true : false)


  }

  //MUDAR BOTÃO ENTRADA E SAÍDA
  function handleMudarBotao(event) {
    setMudarEntradaSaida(event.target.textContent)

  }

  //SUBMIT 
  function handleSubmit(event) {
    event.preventDefault()
 
    let type = ''
    if (mudarEntradaSaida === "Saída") {
      type = 'debit'
    } else {
      type = 'credit'
    }
    const dataSeparada = (formulario.date.split('/'))
    const dateCerto = new Date(Number(dataSeparada[2]), Number(dataSeparada[1] - 1), Number(dataSeparada[0]))
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateEditadinho = (dateCerto.toLocaleString('pt-BR', options));
  
    const diaDaSemana = (dateEditadinho.split(','))
   
    setFormulario({ ...formulario, week_day: diaDaSemana[0] })



    const novaTransacao = {
      date: dateCerto,
      week_day: diaDaSemana[0],
      description: formulario.description,
      value: formulario.value,
      category: formulario.category,
      type: type

    }

    handleRegistrarTransacao(novaTransacao)


    setMostrarModal(mostrarModal === false ? true : false);

  }

  function handleSubmitEdicao(event) {
    event.preventDefault()
    


    let type = ''
    if (mudarEntradaSaida === "Saída") {
      type = 'debit'
    } else {
      type = 'credit'
    }
    const dataSeparada = (formulario.date.split('/'))
    const dateCerto = new Date(Number(dataSeparada[2]), Number(dataSeparada[1] - 1), Number(dataSeparada[0]))
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateEditadinho = (dateCerto.toLocaleString('pt-BR', options));
    
    const diaDaSemana = (dateEditadinho.split(','))
   
    setFormulario({ ...formulario, week_day: diaDaSemana[0] })


    

    const transacaoEditada = {
      date: dateCerto,
      week_day: diaDaSemana[0],
      description: formulario.description,
      value: formulario.value,
      category: formulario.category,
      type: type,
      id: formulario.id

    }

    handleRegistrarEdicao(transacaoEditada)
    setMostrarModalEditar(false)



  }

  //EDITAR DADOS DA TRANSACAO
  async function handleEditarTransacao(e) {
    
    setMudarEntradaSaida(transacoes[e.target.id].type === 'credit' ? "Entrada" : "Saída")
    const dataSeparada = (transacoes[e.target.id].date?.split('-'))
    const dia = dataSeparada[2].split('T')

    const dateCerto = (`${dia[0]}/${dataSeparada[1]}/${dataSeparada[0]}`)

    setFormulario({ ...transacoes[e.target.id], date: dateCerto, id: transacoes[e.target.id].id })
    setMostrarModalEditar(true)

  }

  //ORGANIZAR TELA
  useEffect(() => {
    if (transacoes !== []) {
      let contSaidas = 0
      let contEntradas = 0
      const credit = transacoes.filter(x => x.type === "credit")
      const debit = transacoes.filter(x => x.type === "debit")

      credit.map((x) => {
        contEntradas += Number(x.value)

        return null;
      })
      setEntradas(Number(contEntradas))

      debit.map((x) => {
        contSaidas += Number(x.value)
        return null;
      })
      setSaidas(Number(contSaidas));
      setSaldo(entradas - saidas);
    }



  }, [entradas, transacoes, saidas, saldo])

  //FUNÇÕES DE ORDENAÇÃO DAS TABELAS
  function ordenarPorData(e) {

    setTransacoes(transacoes.sort((x, y) => {
      let a = new Date(x.date)
      let b = new Date(y.date)
      setDisplaySeta({data :true, dia:false, valor:false})
      if (ordenar === 1) {
        setOrdenar(0)
        setSeta(setaBaixo)
  
        return a - b
      } else {
        setOrdenar(1)
        setSeta(setaCima)
        
        return b - a
      }


    }))
   



  }

  function ordenarPorValor(e) {
    setDisplaySeta({data :false, dia:false, valor:true})
    
    setTransacoes(transacoes.sort((a, b) => {

      if (ordenar === 1) {
        setSeta(setaBaixo)
        setOrdenar(0)
        return Number(a.value) - Number(b.value)
      } else {
        setSeta(setaCima)
        setOrdenar(1)
        return Number(b.value) - Number(a.value)
      }


    }))
   

  }

  function ordenarPorDia(e) {
    setDisplaySeta({data :false, dia:true, valor:false})
  
 
   
    setTransacoes(transacoes.sort((a, b) => {

      if (ordenar === 1) {
      
        setSeta(setaBaixo)
        setOrdenar(0)

        if (new Date(a.date).getDay() < new Date(b.date).getDay()) {
          return -1

        }
      } else {
        setSeta(setaCima)
        setOrdenar(1)


      }
      if (new Date(b.date).getDay() < new Date(a.date).getDay()) {
        return -1
      }
      return 0

    }))
    

  }

  function handleSubmitFiltrar(event) {

    event.preventDefault()


    if(filtrarDia.length > 0 && filtrarCategoria.length > 0 && Number(filtrar.max) <= Number(filtrar.min)){

      setTransacoes(transacoes.filter(x => filtrarDia.includes(x.week_day.split('-')[0] && Number(x.value) >= Number(filtrar.min) && Number(x.value) <= Number(filtrar.max) && filtrarCategoria.includes(x.category))))
      return;


    }
    if (filtrarDia.length > 0) {

      setTransacoes(transacoes.filter(x => filtrarDia.includes(x.week_day.split('-')[0])))
      


    }
    if (filtrarCategoria.length > 0) {
      console.log(filtrarCategoria)
      console.log(transacoes)
      setTransacoes(transacoes.filter(x => filtrarCategoria.includes(x.category.toLowerCase())))
    //   if (Number(filtrar.max) <= Number(filtrar.min)) return;
    //   setTransacoes(transacoes.filter(x => Number(x.value) >= Number(filtrar.min) && Number(x.value) <= Number(filtrar.max)))
     }

    // if (Number(filtrar.max) <= Number(filtrar.min)) return;
     if (Number(filtrar.max) <= Number(filtrar.min) && filtrarDia.length === 0 && filtrarCategoria.length === 0) return;
    if(Number(filtrar.min > 0)) setTransacoes(transacoes.filter(x => Number(x.value) >= Number(filtrar.min) && Number(x.value) <= Number(filtrar.max)))
  }

  function handleSubmitLimparFiltros(e) {
    e.preventDefault()
    setFormulario({ value: 0, category: "", date: "", description: "", week_day: "", id: 0 })
    setFiltrar({ min: 0, max: 0 })
    setFiltrarCategoria([])
    setFiltrarDia([])

  }

  return (
    <div className="App">
      <header className="container-header">
        <img src={logo} alt="" />
        <h1>Dindin</h1>
      </header>
      <div className="container-body">
        <div className="main-container">
          <div>
            <button className="open-filters-button" onClick={handleMostrarFiltros}><img src={filtro} alt="" /> Filtrar</button>
          </div>
          <Filters
            mostrarFiltro={mostrarFiltro}
            dias={dias}
            iconeMais={iconeMais}
            closeChip={closeChip}
            categoriasArr={transacoes}
            transacoes={transacoes}
            setFiltrar={setFiltrar}
            handleSubmitFiltrar={handleSubmitFiltrar}
            filtrar={filtrar}
            setAtualizarFiltro={setAtualizarFiltro}
            atualizarFiltro={atualizarFiltro}
            handleSubmitLimparFiltros={handleSubmitLimparFiltros}
            setFiltrarDia={setFiltrarDia}
            filtrarDia={filtrarDia}
            filtrarCategoria={filtrarCategoria}
            setFiltrarCategoria={setFiltrarCategoria}

          />
          <Tabela
            transacoes={transacoes}
            caneta={caneta}
            lixeira={lixeira}
            mostrarModal={mostrarModalEditar}
            handleEditarTransacao={handleEditarTransacao}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            handleDeletarTransacao={handleDeletarTransacao}
            setTransacoes={setTransacoes}
            setOrdenar={setOrdenar}
            ordenarPorData={ordenarPorData}
            ordenarPorValor={ordenarPorValor}
            ordenarPorDia={ordenarPorDia}
            seta={seta}
            displaySeta={displaySeta}
     




          />
        </div>
        <Aside
          entradas={entradas}
          saidas={saidas}
          saldo={saldo}
          handleModal={handleModal}
        />
        <Modal
          titulo={"Adicionar Registro"}
          mostrarModal={mostrarModal}
          fechar={fechar}
          handleModal={handleModal}
          handleMudarBotao={handleMudarBotao}
          mudarEntradaSaida={mudarEntradaSaida}
          handleSubmit={handleSubmit}
          formulario={formulario}
          setFormulario={setFormulario} />

        <Modal
          titulo={"Editar Registro"}
          mostrarModal={mostrarModalEditar}
          fechar={fechar}
          handleModal={handleModalEditar}
          handleMudarBotao={handleMudarBotao}
          mudarEntradaSaida={mudarEntradaSaida}
          handleSubmit={handleSubmitEdicao}
          formulario={formulario}
          setFormulario={setFormulario} />

      </div>
    </div>
  );
}

export default App;
