import  {useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)


    useEffect(()=>{
        const getCategories = async () =>{

            try {
                const res = await axios.get("/api/category");
                setCategories(res.data);
              } catch (err) {
                if (err.response) {
                  console.error(`Error en la respuesta del servidor:`);
                } else if (err.request) {
                  console.error('No hubo respuesta del servidor:', err.request);
                } else {
                  console.error('Error:', err.message);
                }
              }
        };
        getCategories()
    },[callback])

    return {
      categories: [categories, setCategories],
      callback: [callback, setCallback]
    }


}

export default CategoriesAPI;






