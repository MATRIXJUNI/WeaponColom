import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import "./sigin.css"
import { useState } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2"


export default function ModalsSignIn({show2,handleClose2}){
    
      const[values, SetValues] = useState({
        correo:"",
        passwords:"",
      })
    
     function FunctionHandle(event){
      const {name,value}= event.target
      SetValues({
        ...values,
        [name]:value,
      })
    }
  
  const imprimir=()=>{
   
    setTimeout(() => {
      window.location.href = "/prueba";
    }, 2000); // 2000 milisegundos = 2 segundos
  }
  const otherHandle=async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    
    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values), 
    })
    
    if(response.status==200){
      Swal.fire({
        title: "Good job!",
        text: "has ingresado con exito",
        icon: "success"
      });
      const { token } = await response.json();
     localStorage.setItem('token', token);
 
       imprimir()
       
    }
   
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!, incorrect password",
      
      });
    }
   
  }

    return <Modal show={show2} onHide={handleClose2}>
        <div className='container_edit'>
    <Modal.Header className='btn_close' closeButton ></Modal.Header>
      <Modal.Title className='edit_title_Ingresar ' style={{fontSize:'30px', fontWeight:'bold' }}>INGRESAR</Modal.Title>
      
      
      <hr className='edit_hr'></hr>
      <div className='cuadro'>
      <IoPersonCircle  className='edit_log'/>
      <div className='input_2 ' >
       
      <input type="email"  name='correo'  value={values.email1}  placeholder='Número de celular o correo electrónico'className='name11' onChange={FunctionHandle}></input>
      <input  type="password"   name='passwords'  value={values.password} placeholder='Contraseña ' className='name11' onChange={FunctionHandle}  ></input>
      <a><Link to={  "/recuperarPassword"  /* "#" */    } style={{"padding-left":"60px"}}>¿olvide mi contraseña?</Link></a>
      <div className='button2'>
      <button type="button" className="btn btn-success edit_button" onClick={otherHandle} >INGRESAR</button>
      
     
      </div>
     
      </div>
      </div>
      </div>
    
    <Modal.Body>
        
    </Modal.Body>
    {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer> */}
  </Modal>
}