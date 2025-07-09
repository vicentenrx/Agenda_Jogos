import { useForm } from "react-hook-form"
import './Pesquisa.css'
import Navbar from "./components/NavBar"
import { useState } from "react"
import Jogos from "./components/Jogos"

function Pesquisa() {
  const [jogos, setjogos] = useState([])
  const { register, handleSubmit } = useForm()

  async function pesquisajogos(data) {
    try {
      const resposta = await fetch("http://localhost:3000/jogos")
      if (!resposta.ok) throw new Error("Erro ao buscar os jogos")
      const dados = await resposta.json()
      const dados2 = dados.filter(dado => (
        dado.partida.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
        dado.campeonato.toUpperCase().includes(data.pesquisa.toUpperCase())        
      ))
      if (dados2.length == 0) {
        alert("Não há jogos com a palavra-chave informada...")
      } else {
        setjogos(dados2)
      }
    } catch (erro) {
      console.log("Erro: " + erro.message)
    }
  }

  const listaJogos = jogos.map(jogo => (
    <Jogos key={jogo.id} jogos={jogo} />
  ))

  return (
    <>
      <Navbar />
      <h2 className="titulo_pesquisa">Ache o seu jogos</h2>
      <form onSubmit={handleSubmit(pesquisajogos)} >
        <p className='p-center'>
          <input type="text"
            placeholder="Palavra chave do título ou gênero"
            required
            className='campos-pesq'
            {...register("pesquisa")} />
          <input type="submit" value="Pesquisar"
            className='btn-pesq' />
        </p>
      </form>
      <div className='listaCards'>
        {listaJogos}
      </div>      
    </>
  )
}

export default Pesquisa
