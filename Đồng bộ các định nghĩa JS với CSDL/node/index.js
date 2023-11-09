const express = require('express');
const cors = require('cors');
const sequelize = require('./configs/sequelize')
const PORT = 5000;

const productRouter = require('./routes/product')
const adminRouter = require('./routes/admin')

const app = express();
app.use(express.json());
app.use(cors());


app.use(productRouter)
app.use(adminRouter)

app.use('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

sequelize.sync().then((result) => {
    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})