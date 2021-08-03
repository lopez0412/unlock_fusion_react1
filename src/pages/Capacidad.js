import logo from '../logo.svg';
import React, {useEffect, useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigat from "../components/Navibar"
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import axios from 'axios';

function Capacidad() {

  const baseURL ="https://alejandro-lopez.net/unlock_fusion/api/";
  const [data,setData] = useState([]);
  const [modalInsert,setModalInsert] = useState(false);
  const [modalUpdate,setModalUpdate] = useState(false);
  const [dataCat,setDataCat] = useState([]);

  const [formulario,setFormulario] = useState({
    cap_unidad: '',
    cap_cantidad: ''
  });

  const [formularioUpdate,setFormularioUpdate] = useState({
    cap_unidad: '',
    cap_cantidad: ''
  });

  const handleChange=e=>{
    const {name,value}=e.target;
    setFormulario((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(formulario);
  }

  const handleChangeUpdate=e=>{
    const {name,value}=e.target;
    setFormularioUpdate((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(formularioUpdate);
  }


  const abrirCerrarModalInsertar=()=>{
    setModalInsert(!modalInsert);
  }

  const abrirCerrarModalUpdate=()=>{
    setModalUpdate(!modalUpdate);
  }

  const peticionGet =async()=>{
    await axios.get(baseURL+"capacidad/read.php")
    .then(respone=>{
      setData(respone.data)
    });
  }

 

  const peticionPost =async()=>{
    
    const formul = { 
        cap_cantidad: formulario.cap_cantidad,
        cap_unidad: formulario.cap_unidad
    }
    await axios.post(baseURL+"capacidad/create.php",formul)
    .then(respone=>{
      //setData(data.concat(respone.data));
      abrirCerrarModalInsertar();
      peticionGet();
    });
  }

  const peticionPut =async()=>{
    
    const formul = { 
      cap_id: formularioUpdate.cap_id,
      cap_cantidad: formularioUpdate.cap_cantidad,
      cap_unidad: formularioUpdate.cap_unidad
      
    }
    console.log(formul);
    await axios.post(baseURL+"capacidad/update.php",formul)
    .then(respone=>{
      //setData(data.concat(respone.data));
      abrirCerrarModalUpdate();
      peticionGet();
    });
  }

  const seleccionarCap=(capacidad,caso)=>{
    setFormularioUpdate(capacidad);

    if(caso==="Editar"){
      abrirCerrarModalUpdate();
    }else{

    }
  }

  useEffect(()=>{
    peticionGet();
    //peticionCat();
  },[])

  
  return (
    <div>
    <Navigat/>
    <div className="App background1">
      <h3>Capacidad</h3>
      <br/>
      <button className="btn-grad" onClick={()=>abrirCerrarModalInsertar()}>Agregar Capacidad</button>
      <br/><br/>
      <table className="table table-striped">
        <thead>
          <tr>
          <th>ID Capacidad</th>
          <th>Capacidad</th>
          
          
          
          <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(capacidad=>(
            
            <tr key={capacidad.cap_id}>
                <td>{capacidad.cap_id}</td>
              <td>{capacidad.cap_cantidad}{capacidad.cap_unidad}</td>
              
              <td><button className="btn-grad-edit" onClick={()=>seleccionarCap(capacidad,"Editar")}>Editar</button>{" "}<button className="btn-grad-del">Borrar</button></td>
            </tr>
            
          ))}
        </tbody>

      </table>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Agregar Capacidades</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            

            <label>Cantidad</label>
            <input
              className="input"
              type="text"
              name="cap_cantidad"
              onChange={handleChange}
            />
            <br />
            <label>Unidad</label>
            <input
              className="input"
              type="text"
              name="cap_unidad"
              onChange={handleChange}
            />
            <br />
            
          
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn-grad-edit" 
          onClick={()=>peticionPost()}>
            Aceptar
          </button>
          <button
            className="btn-grad-del"
            onClick={()=>abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Capacidades</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            

            <label>Cantidad</label>
            <input
              className="input"
              type="text"
              name="cap_cantidad"
              value={formularioUpdate && formularioUpdate.cap_cantidad}
              onChange={handleChangeUpdate}
            />
            <br />
            <label>Unidad</label>
            <input
              className="input"
              type="text"
              name="cap_unidad"
              value={formularioUpdate && formularioUpdate.cap_unidad}
              onChange={handleChangeUpdate}
            />
            <br />
            
          
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn-grad-edit" 
          onClick={()=>peticionPut()}>
            Aceptar
          </button>
          <button
            className="btn-grad-del"
            onClick={()=>abrirCerrarModalUpdate()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  </div>
  );
}

export default Capacidad;
