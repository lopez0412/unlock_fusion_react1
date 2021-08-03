import { map } from 'jquery';
import React, { useState } from 'react';
import '../cart.css'
import axios from 'axios';


export default function Basket(props) {
    const { cartItems, onAddBasket, onRemove, abrirCerrarModalSpinner, Clear } = props;
    const [idVen, setIdVen] = useState(0)
    const itemsPrice = cartItems.reduce((a, c) => a + c.pro_precio_venta * c.qty, 0);
    const taxPrice = itemsPrice * 0.13;
    const total = itemsPrice;
    var idVenta = 0;

    const baseURL = "http://alejandro-lopez.net/unlock_fusion/api/";

    const peticionPostVenta = async () => {
        abrirCerrarModalSpinner(true);
        const formul = {
            ven_subtotal: itemsPrice,
            ven_total: itemsPrice,
            ven_usu_id: 1
        }

        await axios.post(baseURL + "venta/create.php", formul)
            .then(respone => {
                console.log(respone.data.message);
                idVenta = respone.data.message;

                subirVenta();


            });

    }

    const peticionPostDetalle = async (props) => {

        const formul = {
            det_id_ven: idVenta,
            det_pro_id: props.pro_id,
            det_qty: props.qty,
            det_subtotal: props.pro_precio_venta * props.qty,
            det_total: props.pro_precio_venta * props.qty
        }

        await axios.post(baseURL + "detalle_venta/create.php", formul)
            .then(respone => {
                console.log(respone.data.message);
                //setIdVen(respone.data.message);

            });
    }

    const subirVenta = (props) => {

        cartItems.map((items) => {
            console.log("item: ", { items });
            peticionPostDetalle(items);
        })
        console.log(idVenta);


        setTimeout(() => {
            abrirCerrarModalSpinner(false);
            Clear();
        }, 6000)

    }

    return <aside className="block col-4">
        <h2>Items del carrito</h2>
        <div >
            {cartItems.length === 0 && <div>No hay productos</div>}
        </div>
        {cartItems.map(item =>
            <div key={item.pro_id} className="row">
                <div className="col-4">{item.pro_nombre}</div>
                <div className="col-3">
                    <button onClick={() => onAddBasket(item)} className="add">+</button>
                    <button onClick={() => onRemove(item)} className="remove">-</button>
                </div>
                <div className="col-3 text-right">
                    {item.qty} x ${item.pro_precio_venta}
                </div>
            </div>
        )}
        {cartItems.length !== 0 && (
            <>
                <hr></hr>

                <div className="row-header">
                    <div className="col-4"><strong>Total</strong></div>
                    <div className="col-2 text-right"><strong>${itemsPrice}</strong></div>
                </div>
                <hr />
                <div className="row">
                    <button className="btn-grad-green1" onClick={() => peticionPostVenta()}>
                        Ingresar Venta
                    </button>
                </div>
            </>
        )}


    </aside>
}