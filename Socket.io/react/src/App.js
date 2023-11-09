
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import React, { useState } from 'react';

import Login from "./components/Login"
import Post from "./components/Post"
import Signup from './components/Signup'
import Detail from "./components/Detail";

export const ProdContext = React.createContext()

function App() {
  const [data, setData] = useState()
  const [user, setUser] = useState(() => {
    return getCookie('idUser')
  })

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const logout = () => {
    document.cookie = `idUser='';Expires = ${new Date(10000).toUTCString()}; path = /;`
    setUser()
  }
  console.log(user);

  return (
    <ProdContext.Provider value={[data, setData]} >
      <BrowserRouter>
        <div>
          <header className="main-header">
            <nav className="main-header__nav">
              <div>
                <NavLink to='/' className='main-header__item' > MessageNode </NavLink  >
              </div>
              <div>
                <NavLink to={user ? '/' : '/login'} className='main-header__item' > {user ? 'Feed' : 'Login'}</NavLink  >
                <NavLink to={user ? '/login' : '/signup'} onClick={logout} className='main-header__item' >{user ? 'Logout' : 'Signup'} </NavLink  >
              </div>
            </nav>
          </header>
        </div>
        <Routes>
          <Route path="/" element={<Post user={user} />} />
          <Route path="/login" element={<Login islogin={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </ProdContext.Provider>
  )
}


export default App;
