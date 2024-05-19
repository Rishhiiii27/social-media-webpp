import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import {axiosClient} from '../../utils/axiosClient';
// import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';

function Signup() {

    const[name,setName] = useState('')
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate()

   async function handlesubmit(e){
    e.preventDefault();
    try { 
        const result = await axiosClient.post('/auth/signup',{
            name,
            email,
            password
        });
        console.log('signup',result);

        if(result.status = 'ok'){
            navigate('/')
        }
    } catch (error) {
        console.log(error);
    }
}
  return   <div className="signup">
  <div className='signup-box'>
      <h2 className='heading'>Signup</h2>
      <form onSubmit={handlesubmit}>

      <label htmlFor='name'>Name</label>
          <input type='text' className='name' id='name' onChange={(e)=> setName(e.target.value)}/>

          <label htmlFor='email'>Email</label>
          <input type='email' className='email' id='email' onChange={(e)=> setEmail(e.target.value)}/>

          <label htmlFor='password'>Password</label>
          <input type='password' className='password' id='password' onChange={(e)=> setPassword(e.target.value)}/> 

          <input type = 'submit' className='submit'/>
      </form>
      <p className='subheading'>Aleady have an account? <Link to='/login'>Log in</Link>  </p>
  </div>
</div>
}

export default Signup