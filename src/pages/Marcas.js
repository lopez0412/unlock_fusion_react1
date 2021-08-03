import logo from '../logo.svg';
import React, {useEffect, useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigat from "../components/Navibar"
import {Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import axios from 'axios';

function Marcas() {

  const baseURL ="https://alejandro-lopez.net/unlock_fusion/api/";
  const [data,setData] = useState([]);
  const [modalInsert,setModalInsert] = useState(false);
  const [modalUpdate,setModalUpdate] = useState(false);
  const [dataCat,setDataCat] = useState([]);

  const [formulario,setFormulario] = useState({
    marc_Nombre:''
  });

  const [formularioUpdate,setFormularioUpdate] = useState({
    marc_Nombre:''
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
    await axios.get(baseURL+"marca/read.php")
    .then(respone=>{
      setData(respone.data)
    });
  }



  const peticionPost =async()=>{
    
    const formul = { 
      marc_Nombre: formulario.marc_Nombre
      
    }
    await axios.post(baseURL+"marca/create.php",formul)
    .then(respone=>{
      //setData(data.concat(respone.data));
      abrirCerrarModalInsertar();
      peticionGet();
    });
  }

  const peticionPut =async()=>{
    
    const formul = { 
      marc_id: formularioUpdate.marc_id,
      marc_Nombre: formularioUpdate.marc_Nombre,
      
    }
    console.log(formul);
    await axios.post(baseURL+"marca/update.php",formul)
    .then(respone=>{
      //setData(data.concat(respone.data));
      abrirCerrarModalUpdate();
      peticionGet();
    });
  }

  const seleccionarMarca=(marca,caso)=>{
    setFormularioUpdate(marca);

    if(caso==="Editar"){
      abrirCerrarModalUpdate();
    }else{

    }
  }

  useEffect(()=>{
    peticionGet();
    
  },[])

  
  return (
    <div>
    <Navigat/>
    <div className="App background1">
      <h3>Marcas</h3>
      <br/>
      <button className="btn-grad" onClick={()=>abrirCerrarModalInsertar()}>Agregar Marca</button>
      <br/><br/>
      <table className="table table-striped">
        <thead>
          <tr>
          <th>ID Marca</th>
          <th>Nombre</th>
          
          
          <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(marca=>(
            
            <tr key={marca.marc_id}>
                <td>{marca.marc_id}</td>
              <td>{marca.marc_Nombre}</td>
              <td><button className="btn-grad-edit" onClick={()=>seleccionarMarca(marca,"Editar")}>Editar</button>{" "}<button className="btn-grad-del">Borrar</button></td>
            </tr>
            
          ))}
        </tbody>

      </table>

      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Agregar Marca</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            

            <label>Nombre</label>
            <input
              className="input"
              type="text"
              name="marc_Nombre"
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
            <h3>Editar Marca</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

            

            <label>Nombre</label>
            <input
              className="input"
              type="text"
              name="marc_Nombre"
              value={formularioUpdate && formularioUpdate.marc_Nombre}
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

export default Marcas;
