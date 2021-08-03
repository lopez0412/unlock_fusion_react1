import React, {useEffect, useState} from 'react';
import '../login.css';
import logo from '../img/logo_Unlock-removebg-preview.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import { useHistory } from "react-router-dom";

export default function Logueate() {
	const baseURL ='http://alejandro-lopez.net/unlock_fusion/api/';
 	const [data, setData] = useState([]);
	 const [usuario, setUsuario]  = useState('');
	 const [password, setPassword]  = useState('');
	 const history = useHistory();

    const peticionLogin =async()=>{
		try {
			await axios.get(baseURL+'login/login.php?usuario='+usuario+'&password='+password)
        .then(response=>{
          setData(response.data);
		  cookie.save('userId', data.usu_id, { path: '/' });
		  cookie.save('nombreEmp', data.emp_nombre, { path: '/' });
		  cookie.save('apellidoEmp', data.emp_apellido, { path: '/' });
		  cookie.save('usuRol', data.usu_rol, { path: '/' });

		  if (data.usu_rol==1) {
			history.push("/home");
		  }else if (data.usu_rol == 2) {
			history.push("/Venta");
		  }
          //console.log(cookie.load('userId'));
		  
        });
		} catch (error) {
			console.error(error);
			alert('Datos incorrectos');
		}
        
      }

	  const espera=()=>{
		setTimeout(() => {
			peticionLogin();
		}, 1000)
	  }

	  const handleChange=e=>{
		 setUsuario(e.target.value);
		//console.log(usuario);
	  }
	  const handleChangePassword=e=>{
		setPassword(e.target.value);
	   //console.log(password);
	 }

	 useEffect(()=>{
		var usid = cookie.load('userId');
		var rol = cookie.load('usuRol');

		
		if (usid > 0) {
			console.log(rol);
			if (rol==1) {
				history.push("/home");
			  }else if (rol == 2) {
				history.push("/Venta");
			  }
		}
	 },[])
    return(
        
        <div className="container back1">
            <div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
                <img src={logo} alt="Logo" style={{width: 200, height: 180}}/>
				<h3>Iniciar Sesion</h3>
				
			</div>
			<div class="card-body">
				
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" className="form-control" placeholder="usuario" onChange={handleChange}/>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" className="form-control" placeholder="password" onChange={handleChangePassword}/>
					</div>
					
					<div class="form-group">
					<button
					style={{width: '200px'}}
            			className="btn-grad"
            			onClick={()=>espera()}
          			>
						  Login
			  </button>
					</div>
			
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center">
					<a href="#">Olvidaste tu Contraseña?</a>
				</div>
			</div>
		</div>
	</div>
        </div>
  
    )
}
