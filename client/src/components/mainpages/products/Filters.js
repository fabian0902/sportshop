import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {

    const state = useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories
    const [category, setCategory] = state.ProductsAPI.category
    const [sort, setSort] = state.ProductsAPI.sort
    const [search, setSearch] = state.ProductsAPI.search


    const handleCategory= e =>{
        setCategory(e.target.value)
        setSearch("")
    }


  return (
    <div className='filter_menu'>
        <div className="row">
            <span> FILTRO : </span>
            <select name="category" value={category} onChange={handleCategory}>
                <option value="">TODOS LOS PRODUCTOS</option>
                {
                    categories.map(category=>(
                        <option value={"category=" + category._id}  key={category._id}>
                            {category.name}
                        </option>
                    ))

                }
            </select>
        </div>


        <input 
        type="text" 
        value={search} 
        placeholder="Buscar producto" 
        onChange={e => setSearch(e.target.value.toLowerCase())}

        />
        <div className="row sort">
            <span> Ordenar por: </span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value=""> Nuevos </option>
                <option value="sort=oldest">Viejos </option>
                <option value="sort=-sold">Los mas vendidos </option>
                <option value="sort=-price">Precio: Mayor-Menor </option>
                <option value="sort=price">Precio: Menor-Mayor </option>
            </select>
        </div>
    </div>
  )
}

export default Filters