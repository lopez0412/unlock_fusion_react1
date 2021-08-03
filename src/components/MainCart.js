import React, {useEffect, useState}  from 'react';
import '../cart.css'
import axios from 'axios';
import Product from './Product';

export default function MainCart(props){

  const {onAdd,abrirCerrarModalPrice} = props

    const baseURL ="http://alejandro-lopez.net/unlock_fusion/api/";
    const [data,setData] = useState([]);

    const peticionGet =async()=>{
        await axios.get(baseURL+"productos/read.php")
        .then(respone=>{
          setData(respone.data)
          console.log(data);
        });
      }


  useEffect(()=>{
    peticionGet();
  },[])
    return  <main className="block col-8">
    <h2>Productos</h2>
    <div className="row">
      {data.map((product) => (
        <Product key={product.id} product={product} abrirCerrarModalPrice={abrirCerrarModalPrice} onAdd={onAdd}></Product>
      ))}
    </div>
  </main>
}