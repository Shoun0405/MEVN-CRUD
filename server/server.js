const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const dbConnect = require('./config/dbConnect')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())



dbConnect()
app.use(express.json())

app.use('/api/users', userRoutes)

const PORT = process.env.PORT
const dbUrl = process.env.MONGODB




app.listen(PORT, console.log(`Server listening on port: ${PORT}`))