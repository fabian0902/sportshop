import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios"

axios.defaults.withCredentials = true 

function Register() {

  const [user, setUser] = useState({
    name:"", email:"", password: ""
  })

  const onChangeInput = e =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
  }

  const registerSubmit = async  e =>{
    e.preventDefault()
    try { 
      await axios.post("/user/register",{...user} ) 
      localStorage.setItem("firstLogin", true) //xD
      window.location.href = "/"
        
    } catch (err) {
        alert(err.response.data.msg)// :)
    }
  }

  return (
      <div className='login-page'>
          <form onSubmit={registerSubmit} > 
            <h2>Registro de Usuario</h2>
            <input 
                type="text" 
                name='name' 
                required 
                placeholder='Nombre' 
                value={user.name} 
                onChange={onChangeInput}

                />


            <input 
              type="email" 
              name='email' 
              required 
              placeholder='Correo' 
              value={user.email} 
              onChange={onChangeInput}

              />

              <input 
              type="password" 
              name='password' 
              required 
              autoComplete='on'
              placeholder='Contraseña' 
              value={user.password} 
              onChange={onChangeInput}

              />

              <div className='row'>
                  <button type='submit'> Registrarse </button>
                  <Link to={"/login"} >Iniciar Sesión </Link>

              </div>
          </form>
      </div>
  );
}


export default Register;
