import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import useAuthContext from './Hooks/useAuthContext';
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'

function App() {
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    storedUser && setUser(JSON.parse(storedUser));
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
