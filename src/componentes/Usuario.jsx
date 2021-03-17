import React,{Component} from 'react'

class UserDetails extends Component{
    
    state = {
        user: {}
    }

    componentDidMount() {
       this.fetchData()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.userId !== this.props.userId)
            this.fetchData()
    }

    fetchData = () =>{
        const URL = 'http://localhost:3001/usuarios' + this.props.userId
        fetch(URL)
        .then(res => 
            res.json()
            )
        .then(user => this.setState({user}))
    }
    
    render(){
        return(
            <div>
                <h1>
                    User details
                </h1>
                <pre>
                    {JSON.stringify(this.state.user, null, null)}
                </pre>
            </div>
        )
    }
}

class Usuario extends Component{
    
    state = {
        id: 1
    }
    
    aumentar = () =>{
        this.setState(state=> ({
            id: state.id + 1
        }))
    }

    disminuir = () =>{
        this.setState(state=> ({
            id: state.id - 1
        }))
    }

    render(){
        
        const {id} = this.state

        return (
            <div>
                <h1> Extayendo usuarios</h1>
                <h1> ID: { id }</h1>
                <button onClick={this.aumentar}>
                    Aumentar
                </button>
                <button onClick={this.disminuir}>
                    Disminuir
                </button>
                <table>
                    
                </table>
                <UserDetails userId={'/'+ id}/>
            </div>
        );
    }
}

  export default Usuario