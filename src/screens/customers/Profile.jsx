import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Map from './Map'
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'

const cookies = new Cookies();


class Profile extends React.Component{
    
    state = {
        data: {
            id: '',
            nombre: '',
            apellido: '',
            profesion:'',
            correo:'',
            direccion:'',
            telefono:''
        },
        
        bovinos:[]
    }

    peticionGet = (url) =>{
        axios.get(url)
        .then(res=>{
            console.log(res.data)
            Swal.fire({
                title: 'Recordatorio',
                text: 'Para revisar las alertas dirigete a la sección "Alertas" ubicada en la barra superior',
                icon: 'warning',
                confirmButtonText: '¡Enterado!'
              })
            this.setState({data: res.data})
        }).catch(error=>{
            console.log(error.message);  
        })
    }

    peticionGetBovinos = (url) =>{
        axios.get(url)
        .then(res=>{
            // const bovinox= res.data.filter(item => item.id.includes(this.props.match.params.id))
            console.log(res.data)
            this.setState({bovinos: res.data})
        }).catch(error=>{
            console.log(error.message);  
        })
    }

    componentWillMount(){
        this.peticionGet(`http://localhost:3001/clientes/${this.props.match.params.id}`);
        this.peticionGetBovinos(`http://localhost:3001/bovinos?id_cliente=${this.props.match.params.id}`);
        
    }
    render(){
        return (
            
            <React.Fragment>
                
                
                <div >
                        
                        <h1 className=" videoTreinta">¡¡¡ Bienvenido a tu perfil !!!</h1>
                        
                        <nav class="navbar navbar-expand-lg navbar-light bg-light " >
                            <a class="navbar-brand" href="">ECOW</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item active">
                                        <a ><Link to={`/alertas/${this.props.match.params.id}`} class="nav-link" href="#" >Alertas</Link><span class="sr-only">(current)</span></a>
                                    </li>
                                    
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={()=>{cookies.remove("nombre"); 
                                            this.props.history.push("/")}} type="button" className="btn btn-danger">
                                            Cerrar sesión 
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        
                <div/>
                <div className="row container2">
                        <div className="col-md-6 img">
                            <img src="https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg" width={420} alt={400} className="img-rounded"/>
                        </div>
                            
                        <div className="col-md-6 details">
                            <blockquote>
                                <br/><br/>
                                <h2>{this.state.data.nombre} {this.state.data.apellido}</h2>
                            </blockquote>
                            <p>
                                Correo: {this.state.data.correo} <br/>
                                Teléfono: {this.state.data.telefono} <br/>
                                Profesión: {this.state.data.profesion} <br/>
                                Dirección: {this.state.data.direccion}
                            </p>
                        </div>
                </div>                      
                </div>
                <br/><br/>
                <h1 className="videoTreinta">Bovinos del cliente: </h1>
                <br/><br/>
                <table className="table container">
                    <thead>
                        <tr>
                            <th>Id</th>                         
                            <th>edad</th>
                            <th>peso</th>
                            <th>Perfil</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bovinos.map(bovino=>{
                            return(
                            <tr>
                                <td>{bovino.id} </td>
                                <td>{bovino.edad}</td>
                                <td>{bovino.peso}</td>
                                <a><Link to={`/profilebovino/${bovino.id}`}  className="btn btn-info">Ver bovino </Link></a>
                                
                            </tr>
                            )
                        })}
                        
                    </tbody>

                </table>
                <br/>

                <h1 className="videoTreinta">Mapa de bovinos: </h1>
                <br/>
                <Map data={this.state.bovinos}/>
                <br/><br/><br/><br/>

            </React.Fragment>
        )
    }
}

export default Profile