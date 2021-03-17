import React, {Component } from 'react';
import '../css/Login.css';
import imagen from '../img/Bovinos.jpg';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl1 = "http://localhost:3001/clientes";
const cookies = new Cookies();

class Login extends Component{
    

    state={
        form:{
            "nombre":"",
            "contraseña":""
        }
    }

    //lo usamos en el formulario para que no recargue la pagina
    manejadorSubmit=e=> {
        e.preventDefault();
    }

    manejadorChange = e=>{
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    manejadorBoton=async()=> {
            await axios.get(baseUrl1, {params: {nombre: this.state.form.nombre, contraseña: this.state.form.contraseña}})
            .then(response=>{
               return response.data;
            })
            .then(response=>{
                console.log(response)
                if(response !== []){
                    var respuesta= response[0];
                    cookies.set('id', respuesta.id, {path: "/"});
                    cookies.set('nombre', respuesta.nombre, {path: "/"});
                    cookies.set('apellido', respuesta.apellido, {path: "/"});
                    cookies.set('profesion', respuesta.profesion, {path: "/"});
                    cookies.set('correo', respuesta.correo, {path: "/"});
                    cookies.set('telefono', respuesta.telefono, {path: "/"});
                    this.props.history.push(`/clientes/${respuesta.id}`)
                    
                }else{
                    alert("Usuario o contraseña no validos")
                }
            })
            .catch(error=>{
                console.log(error);
            }) 
          
    }

    componentDidMount(){
        if(cookies.get('nombre')!== undefined){
            window.location.href="/home";
        }
        console.log(cookies.get("nombre"))
    }
    
    render(){
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <br/><br/>
                            <img src={imagen} width="300x" alt="User Icon" />
                            <br/><br/>
                        </div>

                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="nombre" placeholder="Usuario" onChange={this.manejadorChange} />
                            <input type="password" className="fadeIn third" name="contraseña" placeholder="Contraseña" onChange={this.manejadorChange}/>
                            <input type="submit" className="fadeIn fourth" value="Ingresar" onClick={()=> this.manejadorBoton()} />
                            
                        </form>  

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;