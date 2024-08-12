import React,{useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import {useNavigate, useParams} from 'react-router-dom';


axios.defaults.withCredentials = true

const initialState = {
    product_id: "",
    title: "",
    price: 0,
    description: "",
    content: "",
    category: "",
    _id:"",
}

function Createproduct() {

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.CategoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin]= state.UserAPI.isAdmin
    const [token]= state.token


    const navigate = useNavigate()
    const param = useParams()


    const [products]= state.ProductsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.ProductsAPI.callback

    useEffect(()=>{
        if(param.id){
            setOnEdit(true)

            products.forEach(product=>{
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[param.id,products])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Debes ser administrador")
            const file  = e.target.files[0]
            if(!file) return alert("Archivo no existe")
            if(file.size > 1024 *1024)//1mb
            return alert("Archivo demasiado grande! no debe ser mayor a 1MB")
            if(file.type !== "image/jpeg" && file.type !== "image/png")//1mb
                return alert("Formato de archivo incorrecto, debe ser JPG o PNG")


            let formData = new FormData()
            formData.append("file", file)   
            
            setLoading(true)

            const res = await axios.post("/api/upload", formData, {
                headers: {"content-type": "multipart/form-data", Authorization:token}
            })
            setLoading(false)
            setImages(res.data);


        } catch (err) {
            alert(err.response.data.msg)
        }

    }
    const handleDestroy = async () =>{
        try {   
            setLoading(true)
            await axios.post("/api/destroy",{public_id: images.public_id},{
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Debes ser Administrador!")
            if(!images) return alert("Sin imagenes")
            if(onEdit) {
                await axios.put(`/api/products/${product._id}`, {...product, images},{
                    headers: {Authorization: token}
                })
            }else{
                await axios.post("/api/products", {...product, images},{
                    headers: {Authorization: token}
                })
            }
            
            setCallback(!callback)
            navigate({pathname:"/"})
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

  
    
    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className='create_product'>
    
            <div className="upload">
             
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                <br /> <br />
                <p>Subir imagenes para el producto (max 1MB, formato jpg/png)</p>
                {
                    loading 
                    ? <div id="file_img"><Loading/></div>
                    :<div id="file_img" style={styleUpload}>
                        { <span onClick={handleDestroy}> X </span> }
                        <img src={images ? images.url : ""} alt="" />
                     
                    </div>
                    
                }
                  
            </div>
           
            <form onSubmit={handleSubmit}>
            <p>FORMULARIO - PRODUCTO</p>
                <div className="row">
                    <label htmlFor="product_id">ID DEL PRODUCTO</label>
                    <input 
                    type="text" 
                    name="product_id" 
                    id="product_id" 
                    required
                    value={product.product_id}
                    onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="title">TITULO</label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    required
                    value={product.title}
                    onChange={handleChangeInput}

                    />
                </div>
                <div className="row">
                    <label htmlFor="price">PRECIO</label>
                    <input 
                    type="number" 
                    name="price" 
                    id="price" 
                    required
                    value={product.price}
                    onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="description">DESCRIPCION</label>
                    <textarea 
                    type="text" 
                    name="description" 
                    id="description" 
                    required
                    value={product.description}
                    rows={5}
                    onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="content">DETALLES</label>
                    <textarea 
                    type="text" 
                    name="content" 
                    id="content" 
                    required
                    value={product.content}
                    rows={5}
                    onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="categories">CATEGORIAS  </label>
                    <select name="category" value={product.category} onChange={handleChangeInput}>
                        <option value=""> FAVOR SELECCIONAR UNA CATEGORIA </option>
                        {
                            categories.map(category=>(
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit'>{ onEdit ? "Actualizar" : "Crear Producto" } </button>
            </form>
        </div>
    )
}

export default Createproduct;
