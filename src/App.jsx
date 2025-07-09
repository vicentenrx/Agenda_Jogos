import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Jogos from './components/Jogos'

function App() {
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    async function buscarJogos() {
      try {
        const resposta = await fetch('http://localhost:3000/jogos')
        const dados = await resposta.json()
        setJogos(dados.reverse())
      } catch (erro) {
        console.log('Erro ao buscar os jogos:', erro.message)
      }
    }
    buscarJogos()
  }, [])

  return (
    <>
    <NavBar />
    <div>
      <h1 className='titulo_App'>Agenda dos Jogos</h1>
      <div className='container-jogos'>
        {jogos.map(jogos => (
          <Jogos key={jogos.id} jogos={jogos} setjogos={setJogos} />
        ))}
      </div> 
    </div>
    </>
  )
}


export default App
