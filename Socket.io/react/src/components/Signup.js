import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')

  async function postHandle(e) {
    setErr('')
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        password
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    // console.log(data);
    if (data.status === 'false') {
      setErr(data.message)
    } else {
      navigate('/login')
    }
  }

  return (
    <form className="product-form">
      < div className="form-control" >
        <label htmlFor='title'>Your Email</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
      </div >
      <div className="form-control">
        <label htmlFor='imageUrl'>Your Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-control">
        <label htmlFor='imageUrl'>Your Password</label>
        <input type="text" name="passwprd" onChange={(e) => setPassword(e.target.value)} />
      </div>
      {err && <p style={{ color: 'orange' }}>{err}</p>}
      <button className="btn" type='button' onClick={postHandle} >Sign Up</button>
    </form >
  )
}

export default Signup