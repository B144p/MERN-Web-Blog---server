const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const blogRoute = require('./routes/blogRoute')
const authRoute = require('./routes/authRoute')

const app = express()

// connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true ,
    useUnifiedTopology:false
}).then(()=>console.log('Connect Success'))
.catch((err)=>console.log(err))

// middleware => Set ability of express
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// route
app.use('/api',blogRoute)
app.use('/api',authRoute)

const port = process.env.PORT || 8080
app.listen(port,()=>console.log(`Run server on port ${port}`))