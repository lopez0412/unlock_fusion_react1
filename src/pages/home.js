import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigat from "../components/Navibar"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import axios from 'axios';

function Home() {

  const baseURL = "http://alejandro-lopez.net/unlock_fusion/api/";
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalUpdate] = useState(false);
  const [dataCat, setDataCat] = useState([]);
  const [dataMarc, setDataMarc] = useState([]);
  const [dataCap, setDataCap] = useState([]);
  const [totalInv, setTotalInv] = useState([]);


  const [formulario, setFormulario] = useState({
    pro_nombre: '',
    pro_marca_id: '',
    pro_precio_compra: '',
    pro_precio_venta: '',
    pro_id_cap: '',
    pro_id_cat: '',
    pro_existencia: ''
  });

  const [formularioUpdate, setFormularioUpdate] = useState({
    pro_id: '',
    pro_nombre: '',
    marc_id: '',
    pro_precio_compra: '',
    pro_precio_venta: '',
    cap_id: '',
    cat_id: '',
    existencia: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(formulario);
  }

  const handleChangeUpdate = e => {
    const { name, value } = e.target;
    setFormularioUpdate((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(formularioUpdate);
  }


  const abrirCerrarModalInsertar = () => {
    setModalInsert(!modalInsert);
  }

  const abrirCerrarModalEdit = () => {
    setModalUpdate(!modalEdit);
  }
  const peticionGet = async () => {
    await axios.get(baseURL + "productos/read.php")
      .then(respone => {
        setData(respone.data)
      });
  }

  const peticionCat = async () => {
    await axios.get(baseURL + "categorias/read.php")
      .then(respone => {
        setDataCat(respone.data)
      });
  }
  const peticionMarc = async () => {
    await axios.get(baseURL + "marca/read.php")
      .then(respone => {
        setDataMarc(respone.data)
      });
  }

  const peticionCap = async () => {
    await axios.get(baseURL + "capacidad/read.php")
      .then(respone => {
        setDataCap(respone.data)
      });
  }

  const getTotalinversion = async () => {
    await axios.get(baseURL + "productos/readTotals.php")
      .then(response => {
        setTotalInv(response.data)
        //console.log(response.data);
      });
  }


  const peticionPost = async () => {

    const formul = {
      pro_nombre: formulario.pro_nombre,
      pro_marca_id: formulario.pro_marca_id,
      pro_precio_compra: formulario.pro_precio_compra,
      pro_precio_venta: formulario.pro_precio_venta,
      pro_id_cap: formulario.pro_id_cap,
      pro_id_cat: formulario.pro_id_cat,
      pro_existencia: formulario.pro_existencia
    }
    await axios.post(baseURL + "productos/create.php", formul)
      .then(respone => {
        //setData(data.concat(respone.data));
        abrirCerrarModalInsertar();
        peticionGet();
      });
  }

  const peticionPut = async () => {

    const formul = {
      pro_id: formularioUpdate.pro_id,
      pro_nombre: formularioUpdate.pro_nombre,
      pro_marca_id: formularioUpdate.marc_id,
      pro_precio_compra: formularioUpdate.pro_precio_compra,
      pro_precio_venta: formularioUpdate.pro_precio_venta,
      pro_id_cap: formularioUpdate.cap_id,
      pro_id_cat: formularioUpdate.cat_id,
      pro_existencia: formularioUpdate.existencia
    }
    console.log(formul);
    await axios.post(baseURL + "productos/update.php", formul)
      .then(respone => {
        //setData(data.concat(respone.data));
        abrirCerrarModalEdit();
        peticionGet();
      });
  }

  const seleccionarProducto = (producto, caso) => {
    setFormularioUpdate(producto);

    if (caso === "Editar") {
      abrirCerrarModalEdit();
    } else {

    }
  }

  useEffect(() => {
    peticionGet();
    peticionCat();
    peticionMarc();
    peticionCap();
    getTotalinversion();
  }, [])


  return (
    <div>
      <Navigat />
      <div className="App background1">

        <br />
        <div style={{ alignContent: 'center' }}><button className="btn-grad" onClick={() => abrirCerrarModalInsertar()}>Agregar Producto</button></div>

        <br /><br />

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Categoria</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Capacidad</th>
              <th>Precio Compra</th>
              <th>Precio Venta</th>
              <th>Existencia</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(producto => (

              <tr key={producto.pro_id}>
                <td>{producto.pro_id}</td>
                <td>{producto.cat_Nombre}</td>
                <td>{producto.pro_nombre}</td>
                <td>{producto.marc_Nombre}</td>
                <td>{producto.capacidad}</td>
                <td>${producto.pro_precio_compra}</td>
                <td>${producto.pro_precio_venta}</td>
                <td>{producto.existencia}</td>

                <td><button className="btn-grad-edit" onClick={() => seleccionarProducto(producto, "Editar")}>Editar</button>{" "}<button className="btn-grad-del">Borrar</button></td>
              </tr>

            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total Inversion: </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>${totalInv.totalInv}</th>
              <th></th>
              <th>{totalInv.existInv}</th>
            </tr>
            <th></th>
          </tfoot>

        </table>

        <Modal isOpen={modalInsert}>
          <ModalHeader>
            <div>
              <h3>Agregar Producto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">

              <label>Categoria</label>
              <br />
              <select className="select-css" id="category" name="pro_id_cat" onChange={handleChange} >
                <option value={0}>Seleccione una Categoria</option>
                {dataCat.map(categoria => (
                  <option value={categoria.cat_id}>{categoria.cat_Nombre}</option>
                ))}
              </select>

              <br />

              <label>Nombre</label>
              <input
                className="input"
                type="text"
                name="pro_nombre"
                onChange={handleChange}
              />
              <br />
              <label>Marca</label>
              <br />
              <select className="select-css" id="marca" name="pro_marca_id" onChange={handleChange}>
                <option value={0}>Seleccione una Marca</option>
                {dataMarc.map(marca => (
                  <option value={marca.marc_id}>{marca.marc_Nombre}</option>
                ))}
              </select>

              <br />
              <label>Capacidad</label>
              <br />
              <select className="select-css" id="capacidad" name="pro_id_cap" onChange={handleChange}>
                <option value={0}>Seleccione la Capacidad</option>
                {dataCap.map(capacidad => (
                  <option value={capacidad.cap_id}>{capacidad.cap_cantidad}{capacidad.cap_unidad}</option>
                ))}
              </select>

              <br />
              <label>Precio Compra</label>
              <input
                className="input"
                type="number"
                name="pro_precio_compra"
                onChange={handleChange}
              />
              <br />
              <label>Precio Venta</label>
              <input
                className="input"
                type="number"
                name="pro_precio_venta"
                onChange={handleChange}
              />
              <br />
              <label>Existencia</label>
              <input
                className="input"
                type="number"
                name="pro_existencia"
                onChange={handleChange}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-grad-edit"
              onClick={() => peticionPost()}>
              Aceptar
            </button>
            <button
              className="btn-grad-del"
              onClick={() => abrirCerrarModalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={modalEdit}>
          <ModalHeader>
            <div>
              <h3>Editar Producto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">

              <label>Categoria</label>
              <br />
              <select className="select-css" id="category" name="cat_id" onChange={handleChangeUpdate} value={formularioUpdate && formularioUpdate.cat_id} selected={formulario.pro_id_cat}>
                <option value={0} >Seleccione una Categoria</option>
                {dataCat.map(categoria => (
                  <option value={categoria.cat_id} >{categoria.cat_Nombre}</option>
                ))}
              </select>

              <br />

              <label>Nombre</label>
              <input
                className="input"
                type="text"
                name="pro_nombre"
                value={formularioUpdate && formularioUpdate.pro_nombre}
                onChange={handleChangeUpdate}
              />
              <br />
              <label>Marca</label>
              <br />
              <select className="select-css" id="marca" name="marc_id" onChange={handleChangeUpdate} value={formularioUpdate && formularioUpdate.marc_id}>
                <option value={0} >Seleccione una Marca</option>
                {dataMarc.map(marca => (
                  <option value={marca.marc_id}>{marca.marc_Nombre}</option>
                ))}
              </select>

              <br />
              <label>Capacidad</label>
              <br />
              <select className="select-css" id="capacidad" name="cap_id" onChange={handleChangeUpdate} value={formularioUpdate && formularioUpdate.cap_id}>
                <option value={0}>Seleccione la Capacidad</option>
                {dataCap.map(capacidad => (
                  <option value={capacidad.cap_id} >{capacidad.cap_cantidad}{capacidad.cap_unidad}</option>
                ))}
              </select>

              <br />
              <label>Precio Compra</label>
              <input
                className="input"
                type="number"
                name="pro_precio_compra"
                value={formularioUpdate && formularioUpdate.pro_precio_compra}
                onChange={handleChangeUpdate}
              />
              <br />
              <label>Precio Venta</label>
              <input
                className="input"
                type="number"
                name="pro_precio_venta"
                value={formularioUpdate && formularioUpdate.pro_precio_venta}
                onChange={handleChangeUpdate}
              />
              <br />
              <label>Existencia</label>
              <input
                className="input"
                type="number"
                name="existencia"
                value={formularioUpdate && formularioUpdate.existencia}
                onChange={handleChangeUpdate}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-grad-edit"
              onClick={() => peticionPut()}>
              Aceptar
            </button>
            <button
              className="btn-grad-del"
              onClick={() => abrirCerrarModalEdit()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
