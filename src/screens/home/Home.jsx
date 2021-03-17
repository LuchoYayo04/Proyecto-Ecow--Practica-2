import React from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


class Home extends React.Component {
    
    constructor(props) {
        super(props)
    }
    
    render() {
        return(
            <React.Fragment >
                <h1 className="container p blockquote">Bienvenido Administrador</h1>
                <br/>
                <a className="right2"><Link to="/clientes" className="btn btn-primary boton_distancia ">Lista de Clientes</Link></a>
   
            </React.Fragment>
        )
    }
}

export default Home