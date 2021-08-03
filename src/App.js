import React, { Component } from 'react';
import Route from 'react-router-dom/Route'
import Marcas from './pages/Marcas'
import Home from './pages/home'
import Categorias from './pages/Categorias'
import Capacidad from './pages/Capacidad'
import Venta from './pages/Venta'
import { BrowserRouter } from 'react-router-dom'
import Nav from "./components/Navbar"
import Navigat from "./components/Navibar"
import login from './pages/login';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
          
            <Route exact path="/" component={login} />
            <Route path="/Marcas" component={Marcas} />
            <Route path="/Categorias" component={Categorias} />
            <Route path="/Capacidad" component={Capacidad} />
            <Route path="/Venta" component={Venta} />
            <Route path="/home" component={Home} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;