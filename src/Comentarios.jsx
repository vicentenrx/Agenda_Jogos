import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import StarRatings from 'react-star-ratings'
import Navbar from "./components/NavBar"
import './Comentarios.css'

function Comentarios() {
  const { id } = useParams()
  const [jogos, setjogos] = useState(null)

  useEffect(() => {
    async function buscarJogos() {
      try {
        const resposta = await fetch(`http://localhost:3000/jogos/${id}`)
        if (!resposta.ok) throw new Error("Erro ao buscar o jogos")
        const dados = await resposta.json()
        console.log('jogos carregado:', dados)
        setjogos(dados)
      } catch (erro) {
        console.log("Erro: " + erro.message)
      }
    }
    buscarJogos()
  }, [id])

  if (!jogos) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando jogos...</p>
      </>
    )
  }

  const listaComentarios = []
  if (jogos.comentarios && jogos.comentarios.length > 0) {
    for (let i = 0; i < jogos.comentarios.length; i++) {
      listaComentarios.push(
        <tr key={i}>
          <td>{jogos.nomes?.[i]}</td>
          <td>{jogos.comentarios[i]}</td>
          <td>
            <StarRatings
              rating={jogos.notas?.[i] || 0}
              starRatedColor="yellow"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
            />
          </td>
        </tr>
      )
    }
  }

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
        Comentários do jogos: {jogos.partida}
      </h2>

      <div className="comentarios">
        <img src={jogos.cartaz} alt={`Cartaz do jogos ${jogos.partida}`} />
        <div>
          <h3>Avaliações e Notas dos Usuários</h3>
          <table>
            <thead>
              <tr>
                <th>Nome do Usuário</th>
                <th>Comentário</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {listaComentarios.length > 0 ? (
                listaComentarios
              ) : (
                <tr>
                  <td colSpan="3">Nenhum comentário disponível.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div style={{ marginTop: '20px' }}>
            <a href="/" className="btn-voltar">Voltar</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comentarios
