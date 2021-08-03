import React from 'react';
import '../cart.css'
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom";

export default function HeaderCart(props){
    const {countItems} = props;
    const history = useHistory();

    const cerrar_sesion=()=>{
        cookie.remove('userId');
		  cookie.remove('nombreEmp');
		  cookie.remove('apellidoEmp');
		  cookie.remove('usuRol');
            history.push("/");
      }
    return(
       <header className="row-header block center">
           <div>
               <a href="/Venta">
                   <h1>Ventas</h1>
               </a>
           </div>
           <div >
               <button className="btn-grad-del" onClick={cerrar_sesion}>Cerrar Sesion</button>
           </div>
       </header>
    )
}