import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

class Alerts extends React.Component{
    
    constructor(props){
        super(props)
    }
    
    state = {
        data: []
    }

    peticionGet=()=>{
        axios.get(`http://localhost:3001/alertas?id_cliente=${this.props.match.params.id}`)
        .then(res=>{
            if(res.data.length>0){
                if(res.data[0].sensor.alerta){
                    Swal.fire({
                        title: 'Se ha registrado una alerta',
                        text: 'Sera mejor que revises tu historial de alertas!',
                        icon: 'error',
                        confirmButtonText: '¡Gracias por avisar!'
                      })
                } 
            }
            this.setState({data: res.data})
        })
        .catch(error=>{
            console.error(error.message);  
        })
    }

    componentWillMount(){
        this.peticionGet();
    }
    
    render(){
        return(
            <React.Fragment>
                <h1 className="videoTreinta">Alertas de bovinos: </h1>
                <br/><br/>
                <table className="table container">
                    <thead>
                        <th>ID</th>
                        <th>ID bovino</th>
                        <th> Fecha de alerta </th>
                        <th> Estado de alerta </th>
                        <th> Comentario</th>
                        <th> Temperatura </th>
                        <th> Pulso (por minuto)</th>
                        <th> Batería de sensor</th>
                        <th> Tipo de alerta </th>
                        <th> Gravedad </th>
                        <th>Perfil Bovino</th>
                        
                    </thead>
                    <tbody>
                        {this.state.data.map((item) =>{
                            return(
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.id_bovino}</td>
                                <td>{item.created_at}</td>
                                <td>{item.estado_alerta}</td>
                                <td>{item.comentario}</td>
                                <td>{item.sensor.temperatura}°C</td>
                                <td>{item.sensor.pulso}</td>
                                <td>{item.sensor.bateria}</td>
                                <td>{item.tipo_alerta.tipo}</td>
                                <td>{item.tipo_alerta.gravedad}</td>
                                <td> <a><Link to={`/profilebovino/${item.id_bovino}`}  className="btn btn-info">Ver bovino </Link></a></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                
                <br/><br/>
            </React.Fragment>
        
        ) 
    }
}

export default Alerts;