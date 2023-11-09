const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
app.use(cors());

//link mongooseDB
const db = require('./config/db');
db.main();
app.use(db.sessionsUser)

app.set('view engine', 'ejs');
app.set('views', 'views');

//route
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use(postRoutes);
app.use(authRoutes);



const { Server } = require('socket.io');
//socket
const server = require('http').createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

server.listen(5000)

const Post = require('./models/post');

io.on('connection', async (socket) => {
  console.log("New client connected" + socket.id);

  // server lắng nghe dữ liệu từ socket
  socket.on('create-post', async (data) => {
    try {
      const post = new Post(data)
      const newpost = await post.save()
      console.log(newpost);
      io.emit('new-post', newpost)
    } catch (err) {
      io.emit(`${data.idUser}`, err.message)
    }
  });

  //delete
  socket.on('delete-post', async (data) => {
    try {
      console.log(data.id);
      const post = await Post.findById(data.id)
      if (post.idUser === data.idUser) {
        await Post.findByIdAndRemove(data.id)
        io.emit('deleted', 'success')
      } else {
        io.emit('deleted', 'fail')
      }
    } catch (err) {
      io.emit(`${data.idUser}`, err.message)
    }
  });
  //edit
  socket.on('edit-post', async (data) => {
    try {
      console.log(data);
      const post = await Post.findById(data.id)
      post.title = data.title
      post.image = data.image
      post.content = data.content
      await post.save()
      io.emit('update', 'success')
    } catch (err) {
      io.emit(`${data.idUser}`, err.message)
    }
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});