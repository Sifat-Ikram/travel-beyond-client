import { Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <div className='w-5/6 mx-auto'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default App
