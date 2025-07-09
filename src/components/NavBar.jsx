    import { Link } from 'react-router-dom'
    import './NavBar.css'

    function Navbar() {
        return (
            <>
                <nav>
                    <img src="./cadastro.png" alt="" />
                    <div className='nav-links'>
                        <Link to="/" className='links'>Jogos</Link>&nbsp;&nbsp;
                        <Link to="/inclusao" className='links'>Cadastrar</Link>&nbsp;&nbsp;
                        <Link to="/pesquisa" className='links'>Pesquisar</Link>&nbsp;&nbsp;
                    </div>       
                </nav>
            </>
        )
    }

    export default Navbar