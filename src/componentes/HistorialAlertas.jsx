import React from 'react'
import {Link} from 'react-router-dom'
import '../css/Ejemplo.css'
import axios from 'axios'

const url = "http://localhost:3001/bovinos"

class HistorialAlertas extends React.Component {
    state = {
        data: []
    }

    peticionGet = () =>{
        axios.get(url)
        .then(res=>{
            console.log(res)
            this.setState({data: res.data})
        })
        
    }

    componentDidMount(){
        this.peticionGet();
    }
    
    
    render(){
        return(
            <React.Fragment >
                <h1 className="videoTreinta">Historial de Alertas</h1>
                <input placeholder="enfermo o sano" value={this.state.busqueda} />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Bovino (Id)</th>
                            <th>Alert </th>                         
                            <th>Fecha </th>
                            <th>Estado</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(bovinos=>{
                            return(
                            <tr>
                                <td>{bovinos.id_bovino} <button className={"btn btn-info"}>Ver perfil </button></td>
                                <td>{bovinos.alertas.estado} </td>
                                <td>{bovinos.alertas.fecha} </td>
                                <td>{bovinos.ubicacion} </td>
                                
                            </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
                <button className="btn "><Link to="/">Volver al home</Link></button>
                <br/><br/><br/><br/><br/>
            </React.Fragment>
        )
    }

}

export default HistorialAlertas