import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';


function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.UserAPI.history
    const [orderDetails, setOrderDetails] = useState([])

    const params = useParams()

    useEffect(()=>{
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])

    console.log(orderDetails);

    if(orderDetails.length === 0 ) return null

    return (
        <div className='history-page'>
             <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Codigo Postal</th>
                            <th>Codigo del Pais</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>{orderDetails.address.recipient_name} </td>
                            <td>{orderDetails.address.line1 + " - " + orderDetails.address.city} </td>
                            <td>{orderDetails.address.postal_code} </td>
                            <td>{orderDetails.address.country_code} </td>
                        </tr>
                    </tbody>
                    
                </table>
                <table style={{margin: "30px 0px"}}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            orderDetails.cart.map(item =>(
                                <tr key={item._id}>
                                    <td><img src={item.images.url} alt="" /></td>
                                    <td>{item.title} </td>
                                    <td>{item.quantity} </td>
                                    <td>$ {item.price * item.quantity} </td>
                                </tr>
                            ))
                        }

                        
                    </tbody>
                    
                </table>
        </div>
    )
}

export default OrderDetails;
