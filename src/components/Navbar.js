import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import { Nav } from 'reactstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Navbar extends React.Component {
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                <a className="navbar-brand" >Unlock Fusion</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item" >
                        <a className="nav-link"  href="/">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link"  href="/Marcas">Marcas</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/Categorias">Categorias</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/Capacidad">Capacidad</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/Venta">Ventas</a>
                        </li>
                        </ul>
                   </div>
                    
                </div>
            </nav>
            
        )
    }
};
Navbar = withRouter(Navbar);
export default Navbar;