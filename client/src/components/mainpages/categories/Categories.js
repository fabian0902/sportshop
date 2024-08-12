import React,{useState, useContext} from 'react';
import {GlobalState} from '../../../GlobalState';
import axios from 'axios';


axios.defaults.withCredentials = true


function Categories() {


    const state= useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories
    const [category, setCategory] = useState("")
    const [token] = state.token
    const [callback, setCallback] = state.CategoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState("")

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`,{name: category},{
                    headers: {Authorization: token}
                })
                alert(res.data.msg);
            }else{
                const res = await axios.post("/api/category",{name: category},{
                    headers: {Authorization: token}
                })
                alert(res.data);
            }
                setOnEdit(false)
                setCategory("")
                setCallback(!callback)
            } catch (err) {
                if (err.response) {
                  console.error(`Error en la respuesta del servidor: ${err.response.status} - ${err.response.data}`);
                } else if (err.request) {
                  console.error('No hubo respuesta del servidor:', err.request);
                } else {
                  console.error('Error:', err.message);
                }
              }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const handleDelete = (categoryId) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
        if (confirmed) {
            deleteCategory(categoryId);
        }
    };


    

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`,{
                headers: {Authorization: token}
            })
            setCallback(!callback)
            alert(res.data.msg)

        } catch (err) {
            alert(err.response.data.msg)
        }

    }


  return (

    <div className='categories'>
        <form onSubmit={createCategory}>
            <label htmlFor="category">Administrar Categorias</label>
          
            <input 
            type="text" 
            name="category" 
            placeholder="Ingrese una categoria"
            value={category} 
            required 
            onChange={e => setCategory(e.target.value)}
            />
              <br /><br />
            <button  class="btn primary" type='submit'>{onEdit ? "Actualizar": "Crear"}</button>
        </form>
        <div className="col">
            {
                categories.map(category => (
                    <div className="row" key={category._id}>
                        <p>{category.name} </p>
                        <button class="btn success" onClick={()=> editCategory(category._id, category.name)}>Editar</button>
                        <button class="btn danger" onClick={() => handleDelete(category._id)}>Eliminar</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories;
