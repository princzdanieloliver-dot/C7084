const express = require('express')
const cors = require('cors')
require('dotenv')

const app = express()
app.use(cors())
app.use(express.json())

const telefonRouter = require('./routes/telefon')
app.use('/api/telefonok', telefonRouter)

const apiPort = process.env.API_PORT || 4000

app.listen(apiPort, () => {
    console.log(`Backend fut: http://localhost:${apiPort}`)
    console.log(`API fut: http://localhost:${apiPort}/api/telefonok`)
})