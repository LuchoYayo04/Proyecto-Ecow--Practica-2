import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './componentesLogin/Login'
import ListaBovino from './screens/customers/ListaBovino'
import ListCustomers from './screens/customers/List'
import HistorialAlertas from './componentes/HistorialAlertas'
import Home from './screens/home/Home'
import Profile from './screens/customers/Profile'
import ProfileBovino from './screens/customers/ProfileBovino'
import Alerts from './screens/customers/Alerts'

function App (){
    return (
        <>            
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact render ={props=> (<Login {...props}/>)}/>
                    <Route path='/home' exact render ={props=> (<Home {...props}/>)}/>
                    <Route path='/listabovino' exact render ={props=> (<ListaBovino {...props}/>)}/>
                    <Route path='/profilebovino' exact component={ProfileBovino}/>
                    <Route path='/profilebovino/:id' exact component={ProfileBovino}/>
                    <Route path='/alertas/:id' exact render ={props=> (<Alerts {...props}/>)}/>
                    <Route path='/clientes' exact render ={props=> (<ListCustomers {...props}/>)}/>
                    <Route path='/clientes/:id' exact render ={props=> (<Profile {...props}/>)}/>
                    <Route path='/historialalertas' exact render ={props=> (<HistorialAlertas {...props}/>)}/>
                </Switch>  
            </BrowserRouter>
        </>
    );
}

  export default App

/*
  <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact render ={props=> (<Login {...props}/>)}/>
                    <Route path='/equipos' exact render ={props=> (<Usuario {...props}/>)}/>
                    <Route path='/perfil' exact render ={props=> (<Admin {...props}/>)}/>
                </Switch>  
            </BrowserRouter>
        </React.Fragment> */