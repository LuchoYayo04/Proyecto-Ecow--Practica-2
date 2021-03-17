import React,{Component} from 'react'
import Cookies from 'universal-cookie';



const cookies = new Cookies();

class Admin extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('nombre',{path: "/"});
        cookies.remove('apellido', {path: "/"});
        cookies.remove('profesion', {path: "/"});
        cookies.remove('correo', {path: "/"});
        cookies.remove('telefono', {path: "/"});
        window.location.href='./'
    }

    componentDidMount() {
//        if(!cookies.get('nombre')){
//            window.location.href="./"
//        }
    }
   

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('nombre: '+ cookies.get('nombre'));
        console.log('apellido: '+cookies.get('apellido'));
        console.log('profesion: '+cookies.get('correo'));
        console.log('correo: '+cookies.get('correo'));
        console.log('telefono: '+cookies.get('telefono'));
        return (
            <div>
                Aqui va lo del admin, cuando me salga el componente :(
                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Admin;