import {createContext, useState, useEffect} from 'react';
import ProductsAPI  from './api/ProductsAPI';
import UserAPI  from './api/UserAPI';
import axios from 'axios';
import CategoriesAPI from './api/CategoriesAPI';

axios.defaults.withCredentials = true 

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{

    const [token, setToken] = useState(false)
    
    
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            const refreshToken = async () => {
                try {
                    const res = await axios.get("/user/refresh_token");
                    setToken(res.data.accesstoken);
                    setTimeout(() => {
                        refreshToken();
                    }, 10 * 60 * 1000);
                } catch (err) {
                    if (err.response) {
                        console.error(`Error en la respuesta del servidor: ${err.response.status} - ${err.response.data}`);
                    } else if (err.request) {
                        console.error('No hubo respuesta del servidor:', err.request);
                    } else {
                        console.error('Error:', err.message);
                    }
                }
            };
            refreshToken();
        }
    }, []);


    ProductsAPI()
    const state={
        token: [token, setToken],
        ProductsAPI: ProductsAPI(),
        UserAPI : UserAPI(token),
        CategoriesAPI: CategoriesAPI()
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

