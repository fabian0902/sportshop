import React, {useContext, useState,useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {GlobalState} from "../../../GlobalState"
import ProuctItem from "../utils/productItem/ProductItem"

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.ProductsAPI.products
    const addCart = state.UserAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(()=>{
       /*  console.log("re-render"); */
        if(params.id){
            products.forEach(product =>{
                if(product._id === params.id) setDetailProduct(product)//muestra los relacionados
            })
        }
    },[params.id,products])

   /*  console.log(detailProduct); */
    if(detailProduct.length === 0)return null

  return (
      <>
      <div className='detail'>
            <img src={detailProduct.images.url} alt="" className='image'/>
            <div className='box-detail'>
                <div className='row'>
                    <h2>{detailProduct.title} </h2>
                    <h6>#id:{detailProduct.product_id} </h6>
                    
                </div>
                <span>${detailProduct.price} </span>
                <p>{detailProduct.description} </p>
                <p>{detailProduct.content} </p>
                <p>Vendido: {detailProduct.sold} </p>
                <Link 
                    to={"/cart"} 
                    className='cart' 
                    onClick={()=>addCart(detailProduct)}> Agregar a carrito 
                </Link>
            </div>
        </div>
        <div>
            <h2>Productos Relacionados</h2>
                <div className='products'>
                    {
                        products.map(product=>{
                            return product.category === detailProduct.category
                                ? <ProuctItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
      </>
);
}

export default DetailProduct;
