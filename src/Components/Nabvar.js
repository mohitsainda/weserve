import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
 

export default function Nabvar() {
  

  const [CartView, setCartView] = useState(false);
  let data = useCart();
  const nevigate= useNavigate(); 
  const handleLogout= ()=>{
    localStorage.removeItem("authToken");
    nevigate("/login");

  }
  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/"><img src={require('../logo.png')} alt='We Serve Delicious' style={{maxWidth:"300px"}} className='img-fluid'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active fs-5 " aria-current="page" to="/myorder">My Order</Link>
      </li>
      :""
        }
        
        
      </ul>
      {!(localStorage.getItem("authToken"))?
      <div className='d-flex'>
      
          <Link className="btn bg-white text-success ms-3" to="/login">Login</Link>
        
       
          <Link className="btn bg-white text-success ms-3" to="/createuser">SignUp</Link>
          </div>
          :<div>
            <div className='btn bg-white text-success mx-3' onClick={()=>{setCartView(true)}}>
            
              My Cart {"  "}
              <Badge pill bg="danger">{data.length?(data.length===0?"":data.length):""}</Badge>
              </div>
              {CartView?<Model onClose={()=>{setCartView(false)}}><Cart/></Model>:""}
            <div className='btn bg-white text-danger ' onClick={handleLogout}>Logout</div>
            <div className='fs-5 text-white'>
              welcome {localStorage.getItem('userEmail')}
            </div>
          </div>
        }
      
    </div>
  </div>
  
</nav>

    </div>
  )
  
}
