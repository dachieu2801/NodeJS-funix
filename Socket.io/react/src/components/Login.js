import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const setUser = props.islogin
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')


  const date = new Date(2024000001010).toUTCString();

  async function postHandle() {
    setErr('')
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    console.log(data);
    if (data.status === 'false') {
      setErr(data.message)
    } else {
      document.cookie = `idUser=${data.idUser};Expires = ${date}; path = /;`
      setUser(() => {
        let a = document.cookie
        return a.slice(7, -1)
      })
      navigate('/')
    }
  }

  return (
    <form className="product-form">
      < div className="form-control" >
        <label htmlFor='title'>Your Email</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
      </div >

      <div className="form-control">
        <label htmlFor='imageUrl'>Your Password</label>
        <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      {err && <p style={{ color: 'orange' }}>{err}</p>}
      <button className="btn" type='button' onClick={postHandle} >Login</button>
    </form >
  )
}

export default Login