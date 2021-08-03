

import { Modal, ModalBody, ModalHeader, ModalFooter, Spinner } from 'reactstrap';
import axios from 'axios';
import HeaderCart from '../components/HeaderCart';
import MainCart from '../components/MainCart';
import Basket from '../components/Basket';
import Navigat from "../components/Navibar"
import '../cart.css';
import { useState } from 'react';
import cookie from 'react-cookies';


function Venta() {
  const [cartItems, setCartItems] = useState([]);
  const [modalPrice, setModalPrice] = useState(false);
  const [modalSpinner, setModalSpinner] = useState(false);
  const [productoSelected, setProductoSelected] = useState();

  const handleChangeUpdate = e => {
    const { name, value } = e.target;
    setProductoSelected((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(productoSelected);
  }

  const abrirCerrarModalPrice = (product) => {
    setModalPrice(!modalPrice);
    setProductoSelected(product);
  }

  const abrirCerrarModalSpinner = (abrir) => {
    setModalSpinner(abrir);
  }


  const onAdd = (product) => {

    const exist = cartItems.find(x => x.pro_id === product.pro_id);
    if (exist && exist.qty < product.existencia) {
      setCartItems(cartItems.map(x => x.pro_id === product.pro_id ? { ...exist, qty: exist.qty + 1 } : x));
      setModalPrice(!modalPrice)


    } else {
      if (!exist) {
        setCartItems([...cartItems, { ...product, qty: 1 }])
        setModalPrice(!modalPrice)
      }

    }
  };

  const onAddBasket = (product) => {

    const exist = cartItems.find(x => x.pro_id === product.pro_id);
    if (exist && exist.qty < product.existencia) {
      setCartItems(cartItems.map(x => x.pro_id === product.pro_id ? { ...exist, qty: exist.qty + 1 } : x));
      //setModalPrice(!modalPrice)


    } else {
      if (!exist) {
        setCartItems([...cartItems, { ...product, qty: 1 }])
        //setModalPrice(!modalPrice)
      }

    }
  };

  const Clear = () => {
    //setCartItems([]);
    window.location.reload(false);
  }
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.pro_id === product.pro_id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.pro_id !== product.pro_id));
    } else {
      setCartItems(cartItems.map(x => x.pro_id === product.pro_id ? { ...exist, qty: exist.qty - 1 } : x));

    }
  }
  //<HeaderCart countItems={cartItems.length}/>
  return (
    <div className="App">
      <HeaderCart />
      <div className="row"  >
        <MainCart onAdd={onAdd} abrirCerrarModalPrice={abrirCerrarModalPrice} onRemove={onRemove}></MainCart>
        <Basket onAdd={onAdd} onAddBasket={onAddBasket} onRemove={onRemove} cartItems={cartItems} abrirCerrarModalSpinner={abrirCerrarModalSpinner} Clear={Clear}></Basket>
      </div>
      <Modal isOpen={modalPrice}>
        <ModalHeader>
          <div>
            <h4>Precio de producto</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <h4>{productoSelected != null ? productoSelected.pro_nombre : "No hay producto"}</h4>
            <input
              className="input"
              type="number"
              name="pro_precio_venta"
              value={productoSelected && productoSelected.pro_precio_venta}
              onChange={handleChangeUpdate}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn-grad-blue"
            onClick={() => onAdd(productoSelected)}
          >
            Aceptar
          </button>
          <button
            className="btn-grad-del"
            onClick={() => abrirCerrarModalPrice()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalSpinner}>
        <ModalHeader>
          <div>
            <h4>Guardando</h4>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <Spinner color="primary" />
          </div>
        </ModalBody>

      </Modal>
    </div>

  )
}

export default Venta;
