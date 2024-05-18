import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <p>App</p>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  )
}

export default App
