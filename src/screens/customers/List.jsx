import React from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ListaBovino from './ListaBovino'


const url = "http://localhost:3001/clientes"

class ListCustomers extends React.Component{
    
    state = {
        data: [],
        modalInsertar: false,
        form:{
            id: '',
            nombre: '',
            apellido: '',
            profesion:'',
            correo:'',
            direccion:'',
            telefono:''

        }
        //xxxxxxxxxxxxxxxxxxxxxx
    }

    peticionGet = () =>{
        axios.get(url)
        .then(res=>{
            console.log(res)
            this.setState({data: res.data})
        }).catch(error=>{
            console.log(error.message);  
        })
    }

    

    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    handleChange=async e=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        console.log(this.state.form);
    }

    peticionPost=async()=>{
        await axios.post(url,this.state.form)
        .then(response=>{
           this.modalInsertar();
           this.peticionGet();
         }).catch(error=>{
           console.log(error.message);
         })
       }

    componentDidMount(){
        this.peticionGet();
    }
    
    render() {
        const {form}= this.state
        return(
            <React.Fragment className="App">
                <h1 className="videoTreinta">Lista de Clientes</h1>
                <br/><br/>
                <button className='btn btn-primary right2' onClick={()=>this.modalInsertar()}> Agregar Cliente </button>
                <br/><br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>                         
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Ubicacion</th>
                            <th>Perfil</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(cliente=>{
                            return(
                            <tr>
                                <td>{cliente.id} </td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.direccion}</td>
                                <a><Link to={`/clientes/${cliente.id}`}  className="btn btn-info">Ver perfil </Link></a>
                                
                            </tr>
                            
                            )
                        })}
                        
                    </tbody>

                </table>
                <Modal isOpen={this.state.modalInsertar}>
                        <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}}></span>
                        </ModalHeader>
                        <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id_bovino">Id del cliente</label>
                            <input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form.id}/>
                            <br />
                            <label htmlFor="edad">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="edad" onChange={this.handleChange} value={form.nombre}/>
                            <br />
                            <label htmlFor="peso">Apellido</label>
                            <input className="form-control" type="text" name="apellido" id="peso" onChange={this.handleChange} value={form.apellido}/>
                            <br />
                            <label htmlFor="estado">Profesion</label>
                            <input className="form-control" type="text" name="profesion" id="estado" onChange={this.handleChange} value={form.profesion}/>
                            <br/>
                            <label htmlFor="fecha">Correo</label>
                            <input className="form-control" type="text" name="correo" id="fecha"  onChange={this.handleChange} value={form.correo}/>
                            <br/>
                            <label htmlFor="ubicacion">Ubicacion</label>
                            <input className="form-control" type="text" name="direccion" id="ubicacion"  onChange={this.handleChange} value={form.direccion}/>
                            <br/>
                            <label htmlFor="ubicacion">Telefono</label>
                            <input className="form-control" type="text" name="telefono" id="ubicacion"  onChange={this.handleChange} value={form.telefono}/>

                        </div>
                        </ModalBody>

                        <ModalFooter>
                        {this.state.tipoModal==='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                            Insertar
                        </button>: <button className="btn btn-primary" onClick={()=> this.peticionPost()}>
                            Agregar
                        </button>
                        }
                            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                        </ModalFooter>
                </Modal>
                <button className="btn "><Link to="/home">Volver al home</Link></button>
            </React.Fragment>
        );
    }
}

export default ListCustomers