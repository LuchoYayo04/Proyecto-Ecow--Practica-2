import React from 'react'
import axios from 'axios'
import Map from './Map'
import Swal from 'sweetalert2'



class ProfileBovino extends React.Component{
    
    state = {
        data: [],
        data_cliente: [],
        data_alerta: []
    }

    peticionGet = (url) =>{
        axios.get(url)
        .then(res=>{
            axios.get(`http://localhost:3001/alertas?id_bovino=${res.data.id}`)
            .then(res3=>{
                console.log(res3.data)
                this.setState({data_alerta: res3.data})
            })
            console.log(res.data)
            axios.get(`http://localhost:3001/clientes/${res.data.id_cliente}`)
            .then(res2=>{
                console.log(res2.data)
                this.setState({data_cliente: res2.data})
            })
            this.setState({data: res.data})
        }).catch(error=>{
            console.log(error.message);  
        })
    }

    componentWillMount(){
        this.peticionGet(`http://localhost:3001/bovinos/${this.props.match.params.id}`);
        
    }
    
    render(){
        console.log(Array.of(this.state.data))
        return (
            <div className="container2">
                <h1 className="videoTreinta">Perfil del bovino</h1>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

                <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
                <div >
                    <div class="row">
                    <div class="profile-head">
                        <div class="profiles container thumbnail">
                        <div class="col-md-2 col-sm-3 col-xs-5">
                            <div class="row">
                            <img src="https://naukas.com/fx/uploads/2017/05/Dairy_cow.jpg" className="img-responsive"/>
                        
                            </div>
                        </div>
                            
                            <div className="row">
                                    <div className="col-sm-12"><h4>ID Bovino: {this.state.data !== [] ? this.state.data.id : ""}</h4>
                                        <hr/>
                                    </div>
                                    
                                        <div class="col-md-3 col-sm-6 col-xs-6">
                                                <p>Rut de cliente: </p>
                                                <p>Peso: </p>
                                                <p>Edad: </p>
                                                <p>Dueño: </p>
                                        </div>
                                        <div class="col-md-3 col-sm-6 col-xs-6">
                                            <p>{this.state.data !== [] ? this.state.data.id_cliente : ""}</p>
                                            <p> {this.state.data !== [] ? this.state.data.peso : ""} Kg</p>
                                            <p>{this.state.data !== [] ? this.state.data.edad : ""} Años</p>
                                            <p>{this.state.data_cliente !== [] ? this.state.data_cliente.nombre : ""} {this.state.data_cliente !== [] ? this.state.data_cliente.apellido : ""}</p>
                                        </div>
                                </div>
                            
                            
                        </div>
                            </div>
                    </div>
                </div>

                <h1 className="videoTreinta">Ubicación del bovino</h1>
               <div className="row col">
                   {
                    Object.entries(this.state.data).length  > 0 ? <Map data={Array.of(this.state.data)}/> : null
                   }
                </div>
                <br/><br/><br/>
                
            </div>
                
        )
    }
}

export default ProfileBovino