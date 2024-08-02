import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children,authentication=true}) {
  const navigate=useNavigate()
  const [loader,setLoader]=useState(true)
  const authStatus=useSelector(state=>state.auth.status)

  useEffect(() => {
    // if(authStatus === true){
    //   navigate("/")
    // }
    // else if(authStatus === false ){
    //   navigate("/login")
    // }

    // true && false !== true
    // true && true
    if(authentication && authStatus != authentication){
      navigate("/login")
    }
    // false && true !== true
    // false && false
    else if(!authentication && authStatus !==authentication){
      navigate("/")
    }
    setLoader(false)
  }, [authStatus,navigate,authentication])
  
  return (
    loader ? <h1>Loading...</h1> : <>{children}</> 
  )
}

export default Protected