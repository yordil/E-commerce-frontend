import React, { useEffect , useContext } from 'react'
import {Type} from './Utility/actiontype'
import {DataContext} from './Components/DataProvider/DataProvider'
import Routing from './Router';
import {auth} from './Utility/firebase'

const App = () => {

  const [{user} , dispatch] = useContext(DataContext)

  useEffect(() => { 
    auth.onAuthStateChanged(authUser => {
      if(authUser){  
        dispatch({
          type: Type.SET_USER,
          user: authUser
        })
      }else{
        dispatch({
          type: Type.SET_USER,
          user: null
        })
      }
    })
  } , [])

  return  <Routing/>


}

export default App
