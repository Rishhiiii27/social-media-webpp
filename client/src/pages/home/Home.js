import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../../redux/slices/appConfigSlice'
import './Home.scss'

function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyInfo())
  }, [dispatch])
  
  return (
    <>
    <div className='home'>
    <Navbar/>
    <div className='outlet' style={{marginTop:'60px'}}>
    <Outlet />
    </div>
    </div>
    


    </>
  )
}

export default Home