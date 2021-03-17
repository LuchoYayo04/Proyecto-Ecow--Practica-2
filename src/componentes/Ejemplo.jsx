import React from 'react'
import ReactDOM from 'react-dom'
import '../css/Ejemplo.css'



class PortalModal extends React.Component {
    render(){
        
        if(!this.props.visible){
            return null;
        }
        
        const styles = {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            background: 'linear-gradient(to top right, #667eea, #764ba2',
            opacity:'0.95',
            color: '#FFF'
        }

        return ReactDOM.createPortal((
            <div style={styles}>
                {this.props.children}
            </div>
        ), document.getElementById('modal'))
    }
}

class Ejemplo extends React.Component{
    
state = {
    visible: false
}

mostrar = () =>{
    this.setState({
        visible: true
    })
}

cerrar = () =>{
    this.setState({
        visible: false
    })
}

    render(){ 
        return(
            <div>
               <button onClick={this.mostrar}> 
               Mostrar 
               </button>
               <PortalModal visible={this.state.visible}> 
                <button onClick={this.cerrar}>
                    cerrar 
                </button> 
                <h1>
                    Hola desde un portal modal
                </h1> 
               </PortalModal>
            </div>
        )
    }
}

export default Ejemplo;