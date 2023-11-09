
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function Detail() {
  const { id } = useParams()

  const [data, setData] = useState()

  console.log(data);
  useEffect(() => {
    const api = async () => {
      const res = await fetch(`http://localhost:5000/detail/${id}`)
      const data = await res.json()
      setData(data.value)
    }
    api()
  }, [])
  if (data)
    return (
      <div className="detail">
        <h2>{data.title}</h2>
        <p style={{borderBottom:'2px solid #000',paddingBottom:'7px',marginBottom:'40px'}}>Created by on {data.updatedAt.slice(0, 10)}</p>
        <div>
          <img src={data.image} />
        </div>
        <p >{data.content}</p>
      </div >
    )
}

export default Detail