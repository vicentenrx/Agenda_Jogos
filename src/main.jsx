import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Inclusao from './Cadastro.jsx'
import Pesquisa from './Pesquisa.jsx'
import Comentarios from './Comentarios.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "inclusao", element: <Inclusao /> },
  { path: "pesquisa", element: <Pesquisa /> },
  { path: "comentarios/:filmeId", element: <Comentarios /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
