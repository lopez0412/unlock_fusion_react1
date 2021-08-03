import React from 'react'
import '../cart.css'

export default function Product(props) {
    const { product, onAdd, abrirCerrarModalPrice } = props

    return (
        <div style={{ padding: 20 }}>
            <img src={product.imagen} alt={product.pro_nombre} style={{ width: 240, height: 180 }} />
            <h2>{product.pro_nombre}</h2>
            <div>
                ${product.pro_precio_venta}
                <br></br>
                Existencia {product.existencia}
            </div>
            <div>
                <button className="myButton" onClick={() => abrirCerrarModalPrice(product)}>Agregar al carrito</button>
            </div>
        </div>
    )
}
