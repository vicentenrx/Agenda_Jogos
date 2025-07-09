import { useForm } from "react-hook-form"
import './Cadastro.css'
import Navbar from "./components/NavBar"

function Cadastro() {
  const { register, handleSubmit } = useForm()

  async function cadastrajogos(data) {
    const partida = data.partida
    const campeonato = data.campeonato
    const duracao = data.duracao
    const local = data.local
    const descricao = data.descricao
    const cartaz = data.cartaz

    try {
      const resposta = await fetch("http://localhost:3000/jogos", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partida, campeonato, duracao, local, descricao, cartaz
        })
      })
      if (!resposta.ok) throw new Error('Erro ao cadastrar jogos')
      const novojogos = await resposta.json()
      alert(`Ok! jogos cadastrado com Código: ${novojogos.id}`)  
    } catch (erro) {
      console.log(`Erro: ${erro.message}`)
    }
  }

  return (
    <>
      <Navbar />
      <div className="centro-cadastro">
        <div>
          <h2 className="titulo_inclusao">Cadastre o Seu jogos</h2>
          <form onSubmit={handleSubmit(cadastrajogos)}>
            <p>
              <label htmlFor="partida">Partida:</label>
              <input type="text" id="partida" className='campos texto-grande' required  //mudei tudo pra partida
                {...register("partida")} />
            </p>
            <div className='duas-colunas'>
              <p>
                <label htmlFor="campeonato">Campeonato:</label>
                <input type="text" id="campeonato" className='campos texto-menor' required //mudei tudo pra campeonato
                  {...register("campeonato")} />
              </p>
              <p>
                <label htmlFor="duracao" className='margem-esq'>Tempo de duração:</label>
                <input type="number" id="duracao" className='campos numero margem-esq' required
                  {...register("duracao")} />
              </p>
            </div>
            <div className='duas-colunas'>
              <p>
                <label htmlFor="local">Local e Data:</label>
                <input type="text" id="local" className='campos texto-menor' required
                  {...register("local")} />
              </p>
        
            </div>
            <p>
              <label htmlFor="sinopse">Descrição:</label>
              <textarea id="descricao" className='campos texto-grande' rows={3} required
                {...register("descricao")}></textarea>
            </p>
            <p>
              <label htmlFor="cartaz">Cartaz:</label>
              <input type="text" id="cartaz" className='campos texto-grande' required
                {...register("cartaz")} />
            </p>
            <input type="submit" value="Cadastrar" className='btn submit' />
            <input type="reset" value="Limpar" className='btn reset' />
          </form>
        </div>
      </div>
    </>
  )
}

export default Cadastro
