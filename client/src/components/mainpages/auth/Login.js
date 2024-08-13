import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


axios.defaults.withCredentials = true 
const apiUrl = process.env.REACT_APP_API_URL || '';

function Login() {

  const [user, setUser] = useState({
    email:"", password: ""
  })

  const onChangeInput = e =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const loginSubmit = async  e =>{
    e.preventDefault()
    try { 
      await axios.post(`${apiUrl}/user/login`,{...user} ) //post
      console.log(user)
      localStorage.setItem("firstLogin", true) //xD
     console.log("aca pasa")
     window.location.href = "/"
     console.log("windows.location.href", window.location.href)

    } catch (err) {
        alert("error al enviar datos de usuario")// :)
    }
  }

  

  return (
      <div className='login-page'>
          <form onSubmit={loginSubmit} > 
            <h2>INICIO DE SESIÓN - LOGIN</h2>
            <input 
              type="email" 
              name='email' 
              required 
              placeholder='Email' 
              value={user.email} 
              onChange={onChangeInput}

              />

              <input 
              type="password" 
              name='password' 
              required 
              autoComplete='on'
              placeholder='Password' 
              value={user.password} 
              onChange={onChangeInput}

              />

              <div className='row'>
                  <button type='submit'> Ingresar </button>
                  <Link to={"/register"} >Registrarse </Link>

              </div>
          </form>
      </div>
  );
}

export default Login;
