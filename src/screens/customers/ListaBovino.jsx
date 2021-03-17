import React from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:3001/bovinos"


class ListaBovino extends React.Component{
    
    state = {
        data: [],
        modalInsertar: false,
        form:{
            id_bovino: '',
            id: '',
            edad: '',
            peso: '',
            ubicacion: ''
        }
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
        this.peticionGet(`http://localhost:3001/bovinos/${this.props.match.params.id}`);
    }

    render() {
        const {form}= this.state;
        return(
            <React.Fragment className="App">
                <h1 className="videoTreinta">Lista de Bovinos</h1>
                <br/>
                <button className='btn btn-primary right2' onClick={()=>this.modalInsertar()}> Agregar Bovino </button>
                <br/><br/>
                <div>
            <input placeholder="Cooming soon"  />
            <button> 
              Buscar              
            </button>
          </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id bovino</th>                         
                            <th>Edad </th>
                            <th>Peso</th>
                            <th>Cliente </th>
                            <th>Ubicacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(bovinos=>{
                            return(
                            <tr>
                                <td>{bovinos.id} </td>
                                <td>{bovinos.edad} años </td>
                                <td>{bovinos.peso} Kg</td>
                                <td>{bovinos.id_cliente} </td>
                                <td>{bovinos.ubicacion}</td>
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
                            <label htmlFor="id_bovino">Id del bovino</label>
                            <input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form.id}/>
                            <br />
                            <label htmlFor="edad">Rut cliente</label>
                            <input className="form-control" type="text" name="id_cliente" id="edad" onChange={this.handleChange} value={form.id_cliente}/>
                            <br />
                            <label htmlFor="peso">Edad</label>
                            <input className="form-control" type="text" name="edad" id="peso" onChange={this.handleChange} value={form.edad}/>
                            <br />
                            <label htmlFor="estado">Peso</label>
                            <input className="form-control" type="text" name="peso" id="estado" onChange={this.handleChange} value={form.peso}/>
                            <br/>
                            <label htmlFor="ubicacion">Ubicacion</label>
                            <input className="form-control" type="text" name="ubicacion" id="ubicacion"  onChange={this.handleChange} value={form.ubicacion}/>
                        </div>
                        </ModalBody>

                        <ModalFooter>
                        {this.state.tipoModal==='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                            Insertar
                        </button>: <button className="btn btn-primary" onClick={()=> this.peticionPost()}>
                            Actualizar
                        </button>
                        }
                            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                        </ModalFooter>
                </Modal>


          
                <button className="btn "><Link to="/home">Volver al home</Link></button>
                <br/><br/><br/><br/><br/>
            </React.Fragment>
        );
    }
}

export default ListaBovino
