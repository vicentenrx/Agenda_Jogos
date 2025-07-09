import { useState } from 'react'
import Swal from 'sweetalert2'
import StarRatings from 'react-star-ratings'
import './Jogos.css'
import { Link } from 'react-router-dom'

function Jogos({ jogos, setjogos }) {
  const [presente, setPresente] = useState(false)

  function calculaMedia(notaArray = []) {
    return notaArray.length > 0
      ? notaArray.reduce((acc, nota) => acc + nota, 0) / notaArray.length
      : 0
  }

  async function Notajogos() {
    if (!presente) {
      Swal.fire({
        icon: 'warning'
      })
      return
    }

    try {
      const { isConfirmed } = await Swal.fire({
        title: `${jogos.artista}`,
        html: `
          <input id="nome" type="text" class="swal2-input" placeholder="Seu nome">
          <input id="comentario" type="text" class="swal2-input" placeholder="Comentário">
          <input id="nota" type="number" class="swal2-input" placeholder="Nota" min="1" max="5">
        `,
        focusConfirm: false,
        jogosCancelButton: true,
        preConfirm: async () => {
          const nome = document.getElementById("nome").value.trim()
          const comentario = document.getElementById("comentario").value.trim()
          const nota = parseInt(document.getElementById("nota").value)

          if (!nome || !comentario || isNaN(nota) || nota < 1 || nota > 5) {
            Swal.jogosValidationMessage("Preencha todos os campos corretamente e informe uma nota entre 1 e 5.")
            return false
          }

          const jogosAtualizado = {
            ...jogos,
            nomes: [...(jogos.nomes || []), nome],
            comentarios: [...(jogos.comentarios || []), comentario],
            notas: [...(jogos.notas || []), nota]
          }

          await fetch(`http://localhost:3000/jogos/${jogos.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jogosAtualizado)
          })

          const resposta = await fetch("http://localhost:3000/jogos")
          const dados = await resposta.json()
          setjogos(dados.reverse())
        }
      })

      if (isConfirmed) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Avaliação cadastrada com sucesso',
          icon: 'success'
        })
      }

    } catch (erro) {
      console.error(`Erro na avaliação: ${erro.message}`)
      Swal.fire({
        title: 'Erro!',
        text: erro.message,
        icon: 'error'
      })
    }
  }

  function handlePresencaChange(e) {
    const marcado = e.target.checked
    setPresente(marcado)
  }

  return (
    <div className='cards'>
      <img src={jogos.cartaz} alt="Cartaz do jogos" />
      <div>
        <h2>{jogos.partida}</h2>
        <h3>{jogos.campeonato} - {jogos.duracao}min</h3>
        <h4>{jogos.local}</h4>
        <p className='descricao'>{jogos.descricao}</p>

        {jogos.notas?.length === 0 ? (
          <img src="new.png" alt="Novo" style={{ width: 120, height: 60, display: 'block', marginLeft: 'auto' }} />
        ) : (
          <div className='estrelas-btn'>
            <StarRatings
              rating={calculaMedia(jogos.notas)}
              starRatedColor="red"
              numberOfStars={5}
              starDimension="25px"
              starSpacing="2px"
            />
            <Link className='btn-ver' to={`/comentarios/${jogos.id}`}>
              O que estão falando?
            </Link>
          </div>
        )}

        <div className="check">
          <button
            className='btn-avalia'
            onClick={Notajogos}
            disabled={!presente}
            style={{
              backgroundColor: !presente ? 'gray' : undefined,
              cursor: !presente ? 'not-allowed' : 'pointer'
            }}
          >
            Avaliar
          </button>

          <div className="container-jogos">
            <label className="checkbox-container">
              <input
                type="checkbox"
                onChange={handlePresencaChange}
              />
              <span>Fui ao jogos</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jogos
