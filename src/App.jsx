import { Outlet, useNavigation } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import GlobalSpinner from './Components/GlobalSpinner';
import { AnimatePresence } from 'motion/react';
import 'remixicon/fonts/remixicon.css'
import { Toaster } from 'react-hot-toast';


function App() {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== 'idle';
  // console.log(isNavigating)
  return (
    <>
      <Toaster/>
      <Navbar/>
      <div className='relative'>
      <AnimatePresence>
      {isNavigating && <GlobalSpinner />}
      </AnimatePresence>
      </div>
      <Outlet/>
    </>
  )
}

export default App
