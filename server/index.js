require('dotenv').config()
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const dbConnect = require('./config/dbConnect')
const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

dbConnect.connect()

const server = express()

server.use(cors('http://localhost:5173'))
server.use(express.json())

server.use('/api/user', userRoutes.router)
server.use(notFound)
server.use(errorHandler)


const PORT = process.env.PORT || 8080
server.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})