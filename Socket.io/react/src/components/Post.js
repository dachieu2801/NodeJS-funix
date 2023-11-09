import { useState, useEffect } from 'react';
import React, { useNavigate } from 'react-router-dom';

import io from 'socket.io-client';
const socket = io('http://localhost:5000', { transports: ['websocket'] });

function Post(props) {
  const idUser = props.user
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [image, setImage] = useState()
  const [content, setContent] = useState()
  const [title, setTitle] = useState()
  const [newPost, setNewPost] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState()
  const [load, setLoad] = useState(false)

  const disableHandle = () => {
    if (!image || !title || !content) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    async function fetApi() {
      const res = await fetch('http://localhost:5000/post')
      const data = await res.json()
      if (data.status === 'oke') {
        console.log(data.value);
        setData(data.value.reverse())
      }
    }
    fetApi()
    setLoad(false)
  }, [load])


  //tạo post
  function postHandle(e) {
    setTimeout(() => {
      socket.emit('create-post', {
        title,
        image,
        content,
        idUser
      });
    }, 200);
  }

  function deleteHandle(id) {
    const confirm = window.confirm('Are you sure you want delete this post?')
    if (confirm) {
      socket.emit('delete-post', {
        id,
        idUser,
      });
    }
  }

  async function geteditHandle(id) {
    const res = await fetch('http://localhost:5000/edit-post', {
      method: 'post',
      body: JSON.stringify({
        id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (data.status = 'false') {
    }
    if (data.status = 'oke') {
      setTitle(data.value.title)
      setImage(data.value.image)
      setContent(data.value.content)
      setIsEdit(true)
      setNewPost(false)
    }
  }

  function editHandle() {
    socket.emit('edit-post',
      {
        id,
        image,
        content,
        title
      })

  }


  useEffect(() => {
    //re-rende when has newpost
    socket.on('new-post', (newPost) => {
      setData(prev => [newPost, ...prev])
      setTitle()
      setImage()
      setContent()
      setNewPost(false)
    })
    //delete
    socket.on('deleted', (status) => {
      console.log(status);
      if (status === 'success') {
        setLoad(true)
      } else {
        alert('You can\'t delete this post!');
      }

    })
    //update
    socket.on('update', (status) => {
      console.log(status);
      if (status === 'success') {
        setLoad(true)
        setIsEdit(false)
      }
    })
    //has err
    socket.on(`${idUser}`, (err) => {
      console.log(err);
    })
    // Remove event listener on component unmount
    return () => {
      socket.off('new-post')
      socket.off('deleted')
      socket.off('update')
      socket.off(`${idUser}`)
    };
  }, [])


  return (
    <>
      <div className="grid">
        <div style={{ display: 'flex' }}>
          <p style={{ border: '1px solid #ccc', padding: '0 300px 0 5px ', marginRight: '24px' }}>I am new!</p> <p>UPDATE</p>
        </div >
        <div className='newpost'>
          <button onClick={() => {
            setNewPost(!newPost);
            setIsEdit(false);
            setTitle();
            setImage();
            setContent()
          }}>NEW POST</button>
        </div>
        {newPost &&
          <form style={{ margin: '20px 0', padding: '0 0 10px 0', border: '1px solid #000' }} >
            <h3 style={{ margin: '8px 0 10px 0', padding: '0 10px 8px  10px', borderBottom: '2px solid #000 ', color: 'blue' }}>New Post</h3>
            <div style={{ padding: '0 10px' }}>
              <label>TITLE</label><br />
              <input value={title} onChange={(e) => setTitle(e.target.value.trim())} style={{ width: '100%', height: '26px', marginBottom: '10px' }} />
            </div>
            <div style={{ padding: '0 10px' }}>
              <label>IMAGE URL</label><br />
              <input value={image} name="image" onChange={(e) => setImage(e.target.value)} type='text' style={{ width: '100%', height: '26px', marginBottom: '10px' }} />
            </div>
            <div style={{ padding: '0 10px', height: '26px', marginBottom: '100px' }}>
              <label>CONTENT</label><br />
              <textarea value={content} onChange={(e) => setContent(e.target.value.trim())} style={{ width: '100%', height: '80px' }} />
            </div>
            <div style={{ textAlign: 'end', marginRight: '10px' }}>
              <button onClick={() => setNewPost(false)} style={{ color: 'red', marginRight: '8px' }}>CANCEL</button>
              <button type="button" onClick={postHandle} disabled={disableHandle()}>ACCEPT</button>
            </div>
          </form>
        }
        {isEdit &&
          <form style={{ margin: '20px 0', padding: '0 0 10px 0', border: '1px solid #000' }} >
            <h3 style={{ margin: '8px 0 10px 0', padding: '0 10px 8px  10px', borderBottom: '2px solid #000 ', color: 'blue' }}>Edit Post</h3>
            <div style={{ padding: '0 10px' }}>
              <label>TITLE</label><br />
              <input value={title} onChange={(e) => setTitle(e.target.value.trim())} style={{ width: '100%', height: '26px', marginBottom: '10px' }} />
            </div>
            <div style={{ padding: '0 10px' }}>
              <label>IMAGE URL</label><br />
              <input value={image} name="image" onChange={(e) => setImage(e.target.value)} type='text' style={{ width: '100%', height: '26px', marginBottom: '10px' }} />
            </div>
            <div style={{ padding: '0 10px', height: '26px', marginBottom: '100px' }}>
              <label>CONTENT</label><br />
              <textarea value={content} onChange={(e) => setContent(e.target.value.trim())} style={{ width: '100%', height: '80px' }} />
            </div>
            <div style={{ textAlign: 'end', marginRight: '10px' }}>
              <button onClick={() => setIsEdit(false)} style={{ color: 'red', marginRight: '8px' }}>CANCEL</button>
              <button type="button" onClick={editHandle} disabled={disableHandle()}>ACCEPT</button>
            </div>
          </form>
        }
        <div style={{ marginTop: '20px' }}>
          {!data ? <p style={{ textAlign: 'center' }}>No posts found.</p> :
            data.map((product, i) => (
              <article className="card" key={i}>
                <div className='header'>
                  <p >Posted by on {product.updatedAt.slice(0, 10)}</p>
                  <h1 >{product.title}</h1>
                </div>
                <div className="card__actions">
                  <button className="btn" onClick={() => navigate(`/detail/${product._id}`)}>View</button>
                  <button className="btn" onClick={() => { geteditHandle(product._id); setId(product._id) }}>Edit</button>
                  <button style={{ color: 'red' }} className="btn" onClick={() => deleteHandle(product._id)}>Delete</button>
                </div>
              </article>
            ))
          }
        </div>
      </div >
    </>
  )
}


export default Post

